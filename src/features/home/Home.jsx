import React from "react";
import ProductList from "../product/ProductList.jsx";
import TopProducts from "../product/TopProducts.jsx";

export default function Home() {
  return (
    <div className="  pb-12">
      <div className="space-y-10">
        <TopProducts />
        <ProductList />
      </div>
    </div>
  );
}
