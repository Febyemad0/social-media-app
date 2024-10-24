import React, { useState } from "react";

export default function PostManagement({ setPosts }) {
    const [newPost, setNewPost] = useState({ username: "", content: "" });

    // Add a new post
    const handleAddPost = (e) => {
        e.preventDefault();
        if (!newPost.content) return; // Prevent adding empty posts

        const newPostData = {
            id: Date.now(), // Use timestamp as a unique ID
            username: newPost.username || "New User",
            profilePicture: "https://via.placeholder.com/40", // Placeholder image
            content: newPost.content,
            timestamp: new Date().toISOString(), // Add timestamp for sorting
        };

        setPosts((prevPosts) => [newPostData, ...prevPosts]); // Add new post to the beginning of the posts array
        setNewPost({ username: "", content: "" }); // Reset form
    };

    return (
        <></>
    );
}
