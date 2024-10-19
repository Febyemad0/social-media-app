import React from 'react';
const posts = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    username: `User ${index + 1}`,
    profilePicture: 'https://via.placeholder.com/40',
    content: `This is the content of post number ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
}));

export default function MainPage() {
    return (
        <div className="flex">
            <div className="flex-1 ml-30 p-4 overflow-y-auto h-screen">
                <h1 className="text-2xl mb-4">Timeline Feed</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 flex">
                            <img
                                src={post.profilePicture}
                                alt={`${post.username} profile`}
                                className="rounded-full w-10 h-10 mr-4"
                            />
                            <div>
                                <h2 className="font-semibold">{post.username}</h2>
                                <p className="text-gray-700">{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
