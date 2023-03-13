"use client";

import { signIn } from "next-auth/react";

import React from "react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="text-sm bg-white text-gray-custom py-2 px-3 rounded-xl disabled:opacity-25"
      >
        Sign In
      </button>
    </li>
  );
}
