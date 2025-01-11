"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

import { filterList } from "@/data/filters";

export default function FilterCategories() {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [collapsedSubcategories, setCollapsedSubcategories] = useState<
    string[]
  >([]);

  // Toggle main category collapse
  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Toggle subcategory collapse
  const toggleSubcategory = (subcategory: string) => {
    setCollapsedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const renderSubcategory = (items: any, parentKey: string) => {
    return (
      <ul className="pl-4 transition-all duration-500 ease-in-out overflow-hidden">
        {Object.entries(items).map(([key, value]) => {
          const isCollapsed = collapsedSubcategories.includes(
            `${parentKey}-${key}`
          );

          const hasChildren = true;

          return (
            <li key={key} className="py-1">
              {/* Subcategory Toggle */}
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() =>
                  hasChildren && toggleSubcategory(`${parentKey}-${key}`)
                }
              >
                <span className="text-sm text-gray-600 capitalize">{key}</span>
                {hasChildren ? (
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
              {hasChildren && (
                <ul
                  className={`pl-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
                    isCollapsed ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {Array.isArray(value)
                    ? value.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-gray-500 capitalize py-1 cursor-pointer hover:bg-gray-100 rounded-md"
                        >
                          {item}
                        </li>
                      ))
                    : renderSubcategory(value, `${parentKey}-${key}`)}
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
      {Object.entries(filterList.categories).map(([gender, types]) => {
        const isCollapsed = collapsedCategories.includes(gender);

        return (
          <div key={gender} className="mb-3 ">
            {/* Gender Toggle */}
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-md "
              onClick={() => toggleCategory(gender)}
            >
              <h4 className="text-sm font-medium capitalize">{gender}</h4>
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
              {renderSubcategory(types, gender)}
            </div>
          </div>
        );
      })}
      <div className="border mt-5"></div>
    </div>
  );
}
