import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
        <h1 className="text-5xl text-bold ml-1">Contact</h1>
            <div className="">
              <Socials />
            </div>
          </div>
        </div>
      <h1 className="text-sm text-bold laptop:mt-10 p-2 laptop:p-0">
        Built with {" "}
        <Link href="https://nextjs.org/">
          <a className="underline underline-offset-1">NextJS</a>
        </Link>
        <br/>
        Source? {" "}
        <Link href="https://github.com/kanghengliu/scholarshipProj">
          <a className="underline underline-offset-1">Github Repo</a>
        </Link>
      </h1>
    </>
  );
};

export default Footer;
