import { TextInput, Select, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsMinecartLoaded } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sortDirection: "desc",
    category: "随记",
  });
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sortDirection");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sortDirection: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const onhandleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sortDirection: order });
    }
    if (e.target.id === "category") {
      setSidebarData({ ...sidebarData, category: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sortDirection", sidebarData.sortDirection);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    console.log(numberOfPosts, startIndex, urlParams, searchQuery);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form action="" className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-semibold">
              关键词：
            </label>
            <TextInput
              placeholder="Search……"
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={onhandleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              排序:
            </label>
            <Select
              onChange={onhandleChange}
              value={sidebarData.sortDirection}
              id="sort"
            >
              <option value="desc">时间倒序</option>
              <option value="asc">时间顺序</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              类别:
            </label>
            <Select
              onChange={onhandleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="随笔">随笔</option>
              <option value="杂谈">杂谈</option>
              <option value="知识">知识</option>
            </Select>
          </div>
          <Button
            type="'submit"
            outline
            gradientDuoTone={"purpleToPink"}
            className=""
          >
            搜索
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          搜索结果：
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">无搜索结果</p>
          )}
          {loading && (
            <div className="flex flex-col justify-center mx-auto">
              <BsMinecartLoaded className=" w-20 h-20" />
              <p className=" font-extrabold text-3xl">少女加载中……</p>
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
