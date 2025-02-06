"use client";
import React, { useState } from "react";
import {
  FiChevronRight,
  FiChevronDown,
  FiFolder,
  FiFile,
} from "react-icons/fi";
import { Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

type FilterProductProps = {
  handleFilterCategory: (id: string, name: string) => void;
  listFilter: any;
};

export default function FilterCategories({
  handleFilterCategory,
  listFilter,
}: FilterProductProps) {
  const { data, isLoading, error } = useHookSwr(
    `${configUrl.apiUrlProductService}/product-public/products-category`
  );

  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [collapsedSubcategories, setCollapsedSubcategories] = useState<
    string[]
  >([]);

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((item) => item !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setCollapsedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((item) => item !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const renderSubcategory = (subcategories: any[], parentId: string) => {
    return (
      <ul className="ml-4 border-l-2 border-gray-100 pl-3">
        {subcategories.map((subcategory) => {
          const isCollapsed = collapsedSubcategories.includes(
            `${parentId}-${subcategory.id}`
          );

          const isInclude = listFilter.find((f: any) => f.id == subcategory.id);

          return (
            <li key={subcategory.id} className="my-1">
              <div
                className={`flex items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50 ${
                  isInclude ? "bg-gray-100" : ""
                }`}
              >
                <button
                  className="flex flex-1 items-center gap-2 text-left"
                  onClick={() =>
                    handleFilterCategory(subcategory.id, subcategory.name)
                  }
                >
                  {subcategory.children.length > 0 ? (
                    <FiFolder className="h-4 w-4 text-blue-500" />
                  ) : (
                    <FiFile className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700 capitalize">
                    {subcategory.name}
                  </span>
                </button>

                {subcategory.children.length > 0 && (
                  <button
                    className="rounded-md p-1 hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubcategory(`${parentId}-${subcategory.id}`);
                    }}
                  >
                    {isCollapsed ? (
                      <FiChevronRight className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FiChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                )}
              </div>

              {subcategory.children.length > 0 && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isCollapsed
                      ? "max-h-0 opacity-0"
                      : "max-h-screen opacity-100"
                  }`}
                >
                  {renderSubcategory(
                    subcategory.children,
                    `${parentId}-${subcategory.id}`
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (isLoading) {
    return (
      <div className="mt-4">
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Failed to load categories"
        description="Please try again later"
        type="error"
        showIcon
        className="mt-4"
      />
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <div className="space-y-2">
        {data?.map((category: any) => {
          const isCollapsed = collapsedCategories.includes(category.id);
          const isInclude = listFilter.find((f: any) => f.id == category.id);

          return (
            <div key={category.id} className="rounded-lg bg-white">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                  handleFilterCategory(category.id, category.name);
                }}
                className={`flex items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50} ${
                  isInclude ? "bg-gray-100" : ""
                } `}
              >
                <button className="flex flex-1 items-center gap-2 text-left">
                  <FiFolder className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {category.name}
                  </span>
                </button>

                <button className="rounded-md p-1 hover:bg-gray-200">
                  {isCollapsed ? (
                    <FiChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <FiChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {renderSubcategory(category.children, category.id)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
