"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

export default function FilterCategories() {
  const { data, isLoading, error } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/products-category`
  );

  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [collapsedSubcategories, setCollapsedSubcategories] = useState<
    string[]
  >([]);

  // Toggle main category collapse
  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((item) => item !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle subcategory collapse
  const toggleSubcategory = (subcategoryId: string) => {
    setCollapsedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((item) => item !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const renderSubcategory = (subcategories: any[], parentId: string) => {
    return (
      <ul className="pl-4 transition-all duration-500 ease-in-out overflow-hidden">
        {subcategories.map((subcategory) => {
          const isCollapsed = collapsedSubcategories.includes(
            `${parentId}-${subcategory.id}`
          );
          return (
            <li key={subcategory.id} className="py-1">
              {/* Subcategory Toggle */}
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() =>
                  toggleSubcategory(`${parentId}-${subcategory.id}`)
                }
              >
                <span className="text-sm text-gray-600 capitalize">
                  {subcategory.name}
                </span>
                {subcategory.children.length > 0 ? (
                  isCollapsed ? (
                    <MdKeyboardArrowRight className="text-gray-500 text-xl" />
                  ) : (
                    <MdKeyboardArrowDown className="text-gray-500 text-xl" />
                  )
                ) : (
                  <MdKeyboardArrowRight className="text-gray-400" />
                )}
              </div>

              {/* Render Children */}
              {subcategory.children.length > 0 && (
                <ul
                  className={`pl-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
                    isCollapsed ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {renderSubcategory(
                    subcategory.children,
                    `${parentId}-${subcategory.id}`
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="mt-2">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      {data?.map((category: any) => {
        const isCollapsed = collapsedCategories.includes(category.id);

        return (
          <div key={category.id} className="mb-3">
            {/* Category Toggle */}
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() => toggleCategory(category.id)}
            >
              <h4 className="text-sm font-medium capitalize">
                {category.name}
              </h4>
              {isCollapsed ? (
                <MdKeyboardArrowDown className="text-xl" />
              ) : (
                <MdKeyboardArrowRight className="text-xl" />
              )}
            </div>

            {/* Subcategories List */}
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                isCollapsed ? "max-h-screen" : "max-h-0"
              }`}
            >
              {renderSubcategory(category.children, category.id)}
            </div>
          </div>
        );
      })}
      <div className="mt-5"></div>
    </div>
  );
}
