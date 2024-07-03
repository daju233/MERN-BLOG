import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsBackpack } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-red-300 via-purple-300 to-blue-300 rounded-lg text-white">
                Lorange&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="联系我" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/daju233"
                  target="_blank"
                  rel="noopner noreferer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="/" rel="noopner noreferer">
                  Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Lorange' blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://github.com/daju233"
              icon={BsGithub}
            ></Footer.Icon>
          </div>
        </div>
      </div>
    </Footer>
  );
}
