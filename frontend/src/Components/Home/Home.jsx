import React, { useState } from 'react';
import MainPostSection from '../TimeLine/MainPostSection';
import PostManagement from '../TimeLine/PostManagement';

export default function Home({ activeUser }) {

    const [posts, setPosts] = useState([]);

    return (
        <div className="home-container">
            <PostManagement posts={posts} setPosts={setPosts} />
            <MainPostSection activeUser={activeUser} posts={posts} />
        </div>
    );
}
