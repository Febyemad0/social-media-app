import React, { useReducer, useRef, useEffect } from "react";
import axios from "axios";
import {
  faHeart,
  faTrash,
  faShareAlt,
  faSmile,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      return {
        ...state,
        posts: Array.isArray(action.payload) ? action.payload : [],
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default function MainPostSection() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loading, error } = state;
  const [postContent, setPostContent] = React.useState("");
  const [feeling, setFeeling] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [updated, setUpdated] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const videoRef = useRef(null);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleLikePost = async (postId) => {
    console.log(postId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/like`,
        { postId }, // Use the FormData object as the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!postContent || !user) return;

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("feeling", feeling);

    if (file) {
      formData.append("media", file);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUpdated(!updated);
      setPostContent("");
      setFeeling("");
      setFile(null);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    const fetchPosts = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/timeLine`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({ type: "SET_POSTS", payload: response.data.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchUser();
    fetchPosts();
  }, [updated]);

  return (
    <div className="main-section p-6">
      {/* Display User Info */}
      {user && (
        <div className="active-user flex items-center mb-4">
          <img
            src={user.profileImage}
            alt={`${user.username}'s avatar`}
            className="rounded-full w-12 h-12 border-2 border-blue-500 mr-4"
          />
        </div>
      )}

      {/* Post Form */}
      <form
        onSubmit={handleSubmitPost}
        className="flex mb-4 bg-light-bg p-4 rounded-lg shadow "
      >
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
          accept="image/*"
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
      {/* Timeline Feed */}
      <div className="flex-1 p-4 overflow-y-auto h-screen">
        <h1 className="text-2xl mb-4">Timeline Feed</h1>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start">
                  <img
                    src={post.profilePicture}
                    alt={post.username}
                    className="rounded-full w-10 h-10 mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{post.username}</h2>
                    <p className="text-gray-700">{post.content}</p>
                    {post.media.length > 0 && (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${post.media[0]}`}
                        alt="Post media"
                        className="w-full mt-2 rounded-lg"
                      />
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      {post.feeling && (
                        <p className="text-sm text-gray-500 flex items-center">
                          <FontAwesomeIcon icon={faSmile} className="mr-1" />
                          Feeling {post.feeling}
                        </p>
                      )}
                      {post.isLive && (
                        <p className="text-sm text-red-500 flex items-center">
                          <FontAwesomeIcon icon={faVideo} className="mr-1" />
                          Live now!
                        </p>
                      )}
                      <button
                        className="text-sm text-blue-500 flex items-center"
                        onClick={() => handleLikePost(post._id)}
                      >
                        <FontAwesomeIcon icon={faHeart} className="mr-1" />
                        {post.likes.length}
                      </button>
                      <button className="text-sm text-blue-500 flex items-center">
                        <FontAwesomeIcon icon={faShareAlt} className="mr-1" />
                        Share
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className="posts mt-4">
        {posts.length === 0 && !loading && <p>No posts available.</p>}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div> */}
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
          src={`${import.meta.env.VITE_API_URL}/${post.media[0]}`}
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
