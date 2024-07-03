import { Card, Dropdown } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const turn = () => navigate("/");
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Card
        onClick={turn}
        className="cursor-pointer mx-auto aboutcard hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center pb-10 gap-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mern-blog-54470.appspot.com/o/1716028915071107750790_p0.jpg?alt=media&token=e8ddd199-785b-4e24-a81b-04ca04a5e371"
            className=" rounded-full size-48 "
            alt="头像"
          />
          <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
            主治医师李大华
          </h5>

          <ul className="flex flex-col gap-3 break-all list-disc text-xl text-gray-500 dark:text-gray-400">
            <li>暂时是学生</li>
            <li>Algo/web开发/系统类课程爱好者</li>
            <li>洛谷板子/CSAPP/CS61C进行中</li>
            <li>MHW 双刀黑龙无限制13台</li>
            <li>OverWatch四年牢玩家</li>
            <li>最近买了rimworld</li>
            <li className="">
              <strong>对很多事情都有兴趣但都做不好</strong>
            </li>
            <div className="flex justify-center">
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href="https://github.com/daju233"
                  className=" inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Github
                </a>
                <a
                  href="/"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Blog
                </a>
              </div>
            </div>
          </ul>
        </div>
      </Card>
    </div>
  );
}
