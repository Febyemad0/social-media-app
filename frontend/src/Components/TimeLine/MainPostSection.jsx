import React, { useReducer, useRef, useEffect } from "react";
import axios from "axios";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "SET_POSTS":
      return { ...state, posts: Array.isArray(action.payload) ? action.payload : [] };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default function MainPostSection({ activeUser }) {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loading, error } = state;
  const [postContent, setPostContent] = React.useState("");
  const [feeling, setFeeling] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isLive, setIsLive] = React.useState(false);
  const videoRef = useRef(null);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!postContent) return;

    dispatch({ type: "SET_LOADING", payload: true });

    let imageUrl = "";
    if (file) {
      imageUrl = await submitImage(file);
    }

    const newPost = {
      content: postContent,
      feeling,
      media: imageUrl ? [imageUrl] : [],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/timeLine`,
        newPost,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch({ type: "ADD_POST", payload: response.data.data });
      setPostContent("");
      setFeeling("");
      setFile(null);
      setIsLive(false);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const submitImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post("/upload", formData);
      return response.data.imageUrl;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/timeLine`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        dispatch({ type: "SET_POSTS", payload: response.data.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="main-section p-6">
      {/* Display User Info */}
      <div className="active-user flex items-center mb-4">
        <img
          src={activeUser.profilePicture}
          alt={`${activeUser.username}'s avatar`}
          className="rounded-full w-12 h-12 border-2 border-blue-500 mr-4"
        />
        <div>
          <h2 className="font-semibold text-lg">{activeUser.username}</h2>
          <p className="text-gray-500">Online</p>
        </div>
      </div>

      {/* Post Form */}
      <form onSubmit={handleSubmitPost} className="flex mb-4 bg-white p-4 rounded-lg shadow">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="border p-2 flex-1 mr-2 rounded-lg"
          required
        />
        <input
          type="file"
          onChange={handleUpload}
          className="border p-2 mr-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Share Post
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* Loading Spinner */}
      {loading && <p>Loading posts...</p>}

      {/* Posts Section */}
      <div className="posts mt-4">
        {posts.length === 0 && !loading && <p>No posts available.</p>}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="post-card bg-white border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-center mb-2">
        <img
          src={post.userId.profileImage}
          alt={`${post.userId.username}'s avatar`}
          className="rounded-full w-10 h-10 border-2 mr-2"
        />
        <span className="font-semibold text-lg">{post.userId.username}</span>
      </div>
      <p>{post.content}</p>
      {post.feeling && <p>Feeling: {post.feeling}</p>}
      {post.media.length > 0 && (
        <img
          src={post.media[0]}
          alt="Post media"
          className="w-full mt-2 rounded-lg"
        />
      )}
      <p className="text-gray-500 text-sm mt-1">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
