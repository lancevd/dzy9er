"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const params = useSearchParams();
  const projectId = params.get("project");
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 p-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/`} className="text-lg font-bold">
          <div className="w-4 h-4 rounded-full bg-white"></div>
        </Link>
        {/* {!hasCanvas ||
          (!hasStyleGuide && (
            <div className="hidden lg:inline-block rounded-full text-primary/60 border border-white/[0.12] backdrop-blur-xl bg-white/[0.88] px-4 py-2 text-sm saturate-150">
              Project / {projectId?.name}
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default Navbar;
