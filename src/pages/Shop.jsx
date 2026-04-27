import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout/Home";
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from "../services/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Pagination from "../components/ui/Pagination";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const { addToCart } = useCart();
  const [limit, setLimit] = useState(30);
  const [pageNum, setPageNum ] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPageNum(newPage);
  };

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const skip = limit * (pageNum - 1);

  const {
    data: allProductsData,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetProductsQuery(
    { limit, skip },
    { skip: !!categoryParam }
  );

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetProductsByCategoryQuery(
    { category: categoryParam, limit, skip },
    { skip: !categoryParam }
  );

  const { data: categoriesData } = useGetCategoriesQuery();

  const data = categoryParam ? categoryData : allProductsData;
  const isLoading = categoryParam ? categoryLoading : allProductsLoading;
  const error = categoryParam ? categoryError : allProductsError;

  useEffect(() => {
    if (data?.total) {
      setTotalPage(Math.ceil(data?.total / limit));
    }
  }, [data?.total, limit]);

  useEffect(() => {
    setPageNum(1);
  }, [categoryParam]);

  const sortOptions = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "30",
      label: "30",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "80",
      label: "80",
    },
  ];

  const categories = categoriesData || [];

  return (
    <Layout>
      <main className="py-12">
        <div className="container grid grid-cols-12 gap-14">
          <div className="col-span-3 bg-white py-6 px-5 h-fit sticky top-0 left-0">
            <h3 className="text-lg font-medium text-primary">
              Related Categories
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const displayName = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    key={cat}
                    className="block text-base text-secondary"
                  >
                    {displayName}
                  </Link>
                );
              })}
            </div>
          <div className="py-6 my-6 border-y-2 border-y-secondary/10">
            <h3 className="text-lg font-medium text-primary">
              Filter by Price
            </h3>
            <input type="range" name="" id="" className="w-full my-6" />
            <Button size="sm" variant="ghost">Apply Filter</Button>
            <p>Price: ৳1000 - ৳2500 </p>
          </div>
          </div>
          <div className="col-span-9">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-[#424241]/50">
                Showing{" "}
                <span className="text-secondary">
                  {limit * (pageNum - 1) + 1} - {data?.total > limit * pageNum ? limit * pageNum : data?.total}
                </span>{" "}
                of <span className="text-secondary">{data?.total}</span> product
              </p>
            <div className="w-fit flex items-center gap-7">
              <p>Display:</p>
              <Input
                type="number"
                className="max-w-20"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                min="10"
                max="80"
              />
            </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
              {isLoading ? (
                <p>Loading products...</p>
              ) : (
                data?.products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            <Pagination
              currentPage={pageNum}
              totalPages={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Shop;

