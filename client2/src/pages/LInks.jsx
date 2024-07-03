import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <div className="flex flex-col mx-20 my-20 min-h-screen">
      <div className="flex gap-20 flex-wrap">
        <Card
          href="https://rhxie.top/"
          target="_blank"
          className="w-full max-w-sm cursor-pointer "
          imgSrc="https://firebasestorage.googleapis.com/v0/b/mern-blog-54470.appspot.com/o/Vqhxe7gfnswpFTO.jpg?alt=media&token=ccaf9bee-cc72-4df5-b87f-e7f7f9700ddb"
          horizontal
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rhxie
          </h5>
          <p className="font-normal break-all text-gray-700 dark:text-gray-400">
            前端爱好者 轻度ACG
          </p>
        </Card>
        <Card
          href="https://greyishsong.ink/"
          target="_blank"
          className="w-full max-w-sm cursor-pointer "
          imgSrc="https://firebasestorage.googleapis.com/v0/b/mern-blog-54470.appspot.com/o/2491_2.png?alt=media&token=d151376c-ccb1-4003-866a-2c776c6addb8"
          horizontal
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            greyishsong
          </h5>
          <p className="font-normal break-all text-gray-700 dark:text-gray-400">
            XJTU计院研究生，现任图形学助教。
          </p>
        </Card>
      </div>
    </div>
  );
}
