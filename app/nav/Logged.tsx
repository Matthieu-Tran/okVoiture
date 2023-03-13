"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

import React from "react";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li onClick={() => signOut()} className="flex gap-8 items-center">
      <button className="text-sm bg-white text-gray-custom py-2 px-3 rounded-xl disabled:opacity-25">
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          src={image}
          alt="userImage"
          className="w-14 rounded-full"
        />
      </Link>
    </li>
  );
}
