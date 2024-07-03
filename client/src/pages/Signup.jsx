import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("请填写所有信息");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log("aping....");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        navigate("/sign-in");
      }
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage("已使用的用户名或邮箱");
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className=" font-bold text-4xl dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-red-300 via-purple-300 to-blue-300 rounded-lg text-white">
              Lorange&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">这是我的个人博客，您可以在此畅所欲言！</p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <form action="" className="flex flex-col gap-4">
            <Label value="昵称" className="font-semibold" />
            <TextInput
              type="text"
              placeholder="Username"
              className="w-full"
              id="username"
              onChange={handleChange}
            ></TextInput>
            <Label value="邮箱" className="font-semibold" />
            <TextInput
              type="email"
              placeholder="Example@gmail.com"
              className="w-full"
              id="email"
              onChange={handleChange}
            ></TextInput>
            <Label value="密码" className="font-semibold" />
            <TextInput
              type="password"
              placeholder="Password"
              className="w-full"
              id="password"
              onChange={handleChange}
            ></TextInput>
            <Button
              className=""
              type="submit"
              gradientDuoTone="pinkToOrange"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading......</span>
                </>
              ) : (
                "注册"
              )}
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link
              className="hover:underline hover:text-blue-800"
              to="/sign-in"
              // target="_blank"
            >
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 flex-0" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
