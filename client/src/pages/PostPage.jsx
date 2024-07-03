import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [recentPost, setRecentPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?limit=3&sortDirection=desc`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setRecentLoading(false);
          return;
        }
        if (res.ok) {
          setRecentPost(data.posts);
          setRecentLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setRecentLoading(false);
      }
    };
    fetchRecentPost();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"}></Spinner>
      </div>
    );
  }
  console.log(recentPost);
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen ">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-contain"
      />
      <div className=" text-center flex justify-center p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
        <span className=" italic">
          {post &&
            new Date(post.createdAt).toLocaleString("chinese", {
              hour12: false,
            })}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content post-content mb-80"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      />
      <div className=" border-t-2 border-black flex flex-col justify-center items-center">
        <h1 className="text-xl mt-5">最近文章</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center w-screen ">
          {!recentLoading &&
            recentPost &&
            recentPost.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
