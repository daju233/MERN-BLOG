import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className=" min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar></DashSidebar>
      </div>
      {/* profile */}
      {tab === "profile" ? <DashProfile /> : null}
      {/* post */}
      {tab === "posts" ? <DashPosts /> : null}
      {/* post */}
      {tab === "users" ? <DashUsers /> : null}
    </div>
  );
}
