import React, { useEffect, useState } from "react";
import { getPosts , deletePost , updatePost } from "../services/postService";
import PostForm from "./PostForm";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [editingPost , setEditingPost] = useState(null);



  useEffect(() => {
    getPosts()
      .then((results) => {
        console.log(results.data);
        setPosts(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleDelete = (id) => {
    deletePost(id)
      .then((results) => {
        console.log(results.data);
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
      })
      .catch((error) => {
        console.log(error);
        });
    };

    const startEditing = (post) => {
        setEditingPost(post);
    };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} ></PostForm>

      {posts.map((post) => (
        <div>
            <p>Post ID: {post.id}</p>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={(e) => handleDelete(post.id)}>Delete</button>
          <button onClick={(e) => startEditing(post)}>Edit</button>

        </div>
      ))}
    </div>
  );
}
