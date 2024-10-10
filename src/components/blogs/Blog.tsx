"use client";
import Link from "next/link";
import { data } from "../Data";
export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      {data.map((list) => (
        <Link href={`/blogs/${list.id}`}  key={list.id}>
          <button
            className="flex items-center justify-center gap-8  border border-emerald-600 p-5"
           
          >
            <p>{list.name}</p>
          </button>
        </Link>
      ))}
    </div>
  );
}
