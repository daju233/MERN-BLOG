import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userslice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("请填写所有信息"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
              gradientDuoTone="tealToLime"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading......</span>
                </>
              ) : (
                "登陆"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            {/* <span>Have an account?</span>
            <Link
              className="hover:underline hover:text-blue-800"
              to="/sign-in"
              target="_blank"
            >
              Sign in
            </Link> */}
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
