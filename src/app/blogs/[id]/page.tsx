import SingleBlog from "@/components/blogs/SingleBlog";
import React from "react";
import { data } from "@/components/Data";

export const generateMetadata = async ({params}: {params: { id: string };}) => {
  const blog = data.find((item) => item.id === parseInt(params.id));

  return {
    title: blog ? `Blogs - ${blog.name}` : "Blog",
  };
};

const Page = () => {
  return (
    <div>
      <SingleBlog />
    </div>
  );
};

export default Page;
