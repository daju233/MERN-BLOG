import { Card, Spinner, Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { BsMinecartLoaded } from "react-icons/bs";

export default function Home() {
  useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [recentPost, setRecentPost] = useState([]);
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
  // console.log(recentLoading);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-5xl">
          妙手神医——主治医师李大华的个人博客🤔
        </h1>
        <img src="" alt="" />
        <p className="text-gray-500 text-lg">
          欢迎来到我的博客，我想要在没人认识的地方做我自己，因此无聊的文章居多。也许你能找到一些有用的技术博客——我不保证。
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          点击以浏览
        </Link>
      </div>
      <div className="h-full w-screen mx-auto p-3 flex flex-col gap-8 py-7">
        <div className="flex flex-col gap-6 ">
          {recentLoading ? (
            <div className="flex flex-col justify-center mx-auto">
              <BsMinecartLoaded className=" w-20 h-20" />
              <p className=" font-extrabold text-3xl">少女加载中……</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-center">最新一期！</h2>
              <div className="flex flex-row flex-wrap gap-28 justify-center">
                {recentPost.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
        <Link
          to={"/search"}
          className="text-lg font-mono font-semibold text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
