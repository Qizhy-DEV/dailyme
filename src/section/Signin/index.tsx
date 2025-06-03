import Image from "next/image";
import React from "react";
import SignInForm from "./components/SignInForm";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen gap-5">
      <div className="w-md aspect-square relative">
        <Image
          className="object-cover"
          fill
          alt="Authentication Image"
          src="/authentication.png"
        />
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
