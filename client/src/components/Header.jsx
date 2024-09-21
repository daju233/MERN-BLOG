import React, { useEffect, useState } from "react";
import {
  Navbar,
  TextInput,
  Dropdown,
  Button,
  NavbarCollapse,
  Avatar,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from "../redux/user/userslice";

export default function Header() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signoutFailure(data.message));
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-red-300 via-purple-300 to-blue-300 rounded-lg text-white">
          Lorange&apos;s
        </span>
        Blog
      </Link>
      <form action="" onSubmit={handleSubmit} className="flex">
        <TextInput
          type="text"
          placeholder="Search..."
          className="lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-12 h-10" color="gray" pill>
          <AiOutlineSearch className="" />
        </Button>
      </form>

      {currentUser ? (
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 sm:inline"
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme == "dark" ? <FaMoon /> : <FaSun />}
          </Button>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profileImage}
                rounded
              ></Avatar>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>资料</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                handleSignout();
              }}
            >
              注销
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme == "dark" ? <FaMoon /> : <FaSun />}
          </Button>
          <Link to="/sign-in">
            <Button outline gradientDuoTone="tealToLime">
              登入
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button outline gradientDuoTone="pinkToOrange">
              注册
            </Button>
          </Link>
        </div>
      )}
      <Navbar.Toggle />
      <Navbar.Collapse className="">
        <Navbar.Link className="" active={path === "/"} as={"div"}>
          <Link to="/">主页</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">关于</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/links"} as={"div"}>
          <Link to="/links">友链</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/games"} as={"div"}>
          <Link to="/games">游戏</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
