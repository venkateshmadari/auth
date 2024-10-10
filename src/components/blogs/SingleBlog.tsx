"use client";
import React, { useEffect, useState } from "react";
import { data } from "../Data";
import { useParams } from "next/navigation";
const SingleBlog = () => {
  const [blog, setBlog] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    const singleBlog = () => {
      const blog = data.find((list: any) => list.id == id);
      //   console.log(blog);
      setBlog(blog);
    };
    singleBlog();
  }, [id]);
  return (
    <div>
      <h1 className="text-red-600">SingleBlog</h1>
      <h1>{blog?.id}</h1>
      <h1>{blog?.name}</h1>
      <h1>{blog?.age}</h1>
    </div>
  );
};

export default SingleBlog;
