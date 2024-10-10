import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "next/navigation";
const MainLayout = ({ children }: any) => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
