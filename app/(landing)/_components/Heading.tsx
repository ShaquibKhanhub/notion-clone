"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl">
        {" "}
        Your Ideas💡, Documents📕, & Plans🚀. Welcome to{" "}
        <span className="underline">Zotion</span>{" "}
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Zotion is the conneted workspace where <br /> better , faster work
        happens{" "}
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"md"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter Zotion <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" >
          <Button >
            Get Zotion free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
