"use client";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function SignIn() {
  return (
    <div className=" flex justify-center flex-col items-center flex-1">
      <h1 className="text-4xl font-bold">
        Log in to <span className="text-orange10">Questlog</span>
      </h1>
      <ul className="mt-10 space-y-3">
        <li>
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="border px-4 py-2 text-2xl bg-mauve3 border-mauve4 rounded-md"
          >
            <FontAwesomeIcon icon={faGithub} /> Continue with GitHub
          </button>
        </li>
      </ul>
      <Link className="mt-4 text-orange12 group" href={"/sign-in/email"}>
        <span className="group-hover:underline">Continue with email</span>{" "}
        <FontAwesomeIcon
          className="group-hover:translate-x-1 duration-150"
          icon={faArrowRight}
        />
      </Link>
    </div>
  );
}

export default SignIn;
