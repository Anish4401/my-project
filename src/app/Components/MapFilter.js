"use client";

import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
//import { useCallback } from "react/cjs/react.production.min";

export default function MapFilter() {
  const searchParams = useSearchParams();
  const Search = searchParams.get("filter");
  console.log(Search);
//   const router = useRouter();
//   const pathname = router.pathname;
  const finditinUrl = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return `?${params.toString()}`}
    // return `filter=${value}`;
    , []);

 

  return (
    <div className=" flex gap-x-10 mt-5 w-full px-0 mx-0 overflow-auto no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={`?${ finditinUrl("filter", item.name)}`}
          className={cn(
            Search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "flex flex-col gap-y-3 items-center"
          )}
        >
          <div className=" relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="Category image"
              className=" w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className=" text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
