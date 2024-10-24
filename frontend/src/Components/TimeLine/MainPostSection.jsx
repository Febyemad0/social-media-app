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
            return { ...state, posts: action.payload };
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
            username: activeUser.username,
            profilePicture: activeUser.profilePicture,
            content: postContent,
            feeling,
            imageUrl,
            isLive,
            timestamp: new Date().toISOString(),
        };

        try {
            await addPostToDatabase(newPost);
            dispatch({ type: "ADD_POST", payload: newPost });
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

    const addPostToDatabase = async (post) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/post`, post);
            if (!response.data) {
                throw new Error("Failed to add post");
            }
        } catch (error) {
            throw new Error(error.response?.data?.error || "Failed to add post");
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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/post`);
                dispatch({ type: "SET_POSTS", payload: response.data });
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: error.message });
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };
        fetchPosts();
    }, []);

    const handleGoLive = () => {
        setIsLive(true);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
    };

    const handleStopLive = () => {
        setIsLive(false);
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };


    return (
        <div className="main-section p-6">
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

            {isLive && (
                <div className="video-section mb-4">
                    <video
                        ref={videoRef}
                        className="w-full h-64 rounded-lg shadow-md"
                        autoPlay
                        muted
                    />
                    <button
                        onClick={handleStopLive}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                    >
                        Stop Live
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmitPost} className="flex mb-4 bg-white p-4 rounded-lg shadow">
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="border p-2 flex-1 mr-2 rounded-lg"
                    required
                />
                <input type="file" onChange={handleUpload} className="border p-2 mr-2 rounded-lg" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Share Post
                </button>
            </form>

            <div className="flex justify-between mb-4">
                <div className="feeling-section flex items-center">
                    <label htmlFor="feeling" className="mr-2">Feeling:</label>
                    <select id="feeling" value={feeling} onChange={(e) => setFeeling(e.target.value)} className="border p-2 rounded-lg">
                        <option value="">Select your feeling</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="excited">Excited</option>
                        <option value="angry">Angry</option>
                    </select>
                </div>
                <div className="live-section flex items-center">
                    <input type="checkbox" id="live" checked={isLive} onChange={(e) => (e.target.checked ? handleGoLive() : handleStopLive())} className="mr-2" />
                    <label htmlFor="live">Go Live</label>
                </div>
            </div>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className="posts mt-4">
                {loading ? <p>Loading posts...</p> : posts.map((post) => <PostCard key={post.timestamp} post={post} />)}
            </div>
        </div>
    );
}

function PostCard({ post }) {
    return (
        <div className="post-card bg-white border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-2">
                <img src={post.profilePicture} alt={`${post.username}'s avatar`} className="rounded-full w-10 h-10 border-2 mr-2" />
                <span className="font-semibold text-lg">{post.username}</span>
            </div>
            <p>{post.content}</p>
            {post.feeling && <p>Feeling: {post.feeling}</p>}
            {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full mt-2 rounded-lg" />}
            <p className="text-gray-500 text-sm mt-1">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
    );
}
