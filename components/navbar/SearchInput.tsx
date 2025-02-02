import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Typography, Empty } from "antd";
import { StarFilled, DollarOutlined } from "@ant-design/icons";
import { CiBoxList } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

import { configUrl } from "@/config/configUrl";
import axiosRequest from "@/hooks/useAxios";

type SearchInputProps = {
  setIsHideMenu: (p: boolean) => void;
  isHideMenu: boolean;
};

function SearchInput({ setIsHideMenu, isHideMenu }: SearchInputProps) {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setSearchInput(key);
    if (key.length >= 3) {
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlProductService}/product-public?size=4&name=${key}`,
        method: "GET",
      });

      if (response) {
        setSearchResults(response?.data?.content || []);
        setTotalProduct(response.data?.totalElements);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleShowAllProduct = () => {
    router.push(`/product/list-product/all?name=${searchInput}`);
  };

  const handleDetailProduct = (id: string, title: string) => {
    setCookie(null, "productId", id, { path: "/" });
    router.push(`/product/product-detail/${title}`);
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center border rounded-full bg-slate-100 transition-all duration-300 ease-in-out ${
          isHideMenu ? "w-full" : "w-96"
        }`}
      >
        <CiSearch className="w-6 h-6 text-black ml-3" />
        <input
          type="text"
          placeholder="Search for products..."
          className="hidden md:block rounded-full px-4 py-2 text-sm focus:outline-none text-black bg-slate-100 w-full"
          onFocus={() => setIsHideMenu(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsHideMenu(false);
              setSearchResults([]);
              setSearchInput("");
            }, 200);
          }}
          value={searchInput}
          onChange={handleSearch}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 z-50 shadow-lg bg-white p-4 rounded-lg">
          {totalProduct > 4 && (
            <button
              onClick={handleShowAllProduct}
              className="text-black text-sm border mr-10 min-w-fit p-2 rounded flex align-middle items-center hover:bg-gray-100"
            >
              <CiBoxList className="text-lg mr-2" /> Show All Result
            </button>
          )}
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((product) => (
              <div
                key={product.id}
                // onMouseDown={() => {
                //   setSearchInput(product.name);
                // }}
                className="hover:bg-gray-50 cursor-pointer p-3 rounded-lg flex gap-4"
                onClick={() => handleDetailProduct(product?.id, product?.name)}
              >
                <div className="flex-shrink-0 w-1/3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-34 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-grow w-2/3 justify-start">
                  <Typography.Title
                    level={5}
                    className="!mb-2 !text-lg font-semibold justify-self-start"
                  >
                    {product.name}
                  </Typography.Title>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <DollarOutlined className="text-green-600 mr-2 text-base" />
                      <Typography.Text strong className="text-gray-800">
                        Rp {product.price.toLocaleString("id-ID")}
                      </Typography.Text>
                    </div>

                    <div className="flex items-center">
                      <StarFilled className="text-yellow-500 mr-2 text-base" />
                      <Typography.Text className="text-gray-600">
                        {product.rating || "Not rated yet"}
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchInput.length >= 3 && searchResults.length === 0 && (
        <div className="absolute top-full left-0 w-full mt-2 z-50 shadow-lg bg-white">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Typography.Text className="text-gray-500">
                No products found
              </Typography.Text>
            }
          />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
