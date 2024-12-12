"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";

interface path {
  title: string;
  href: string;
}

interface Props {
  isHideLast: boolean;
}

const Breadcrumbs = ({ isHideLast }: Props) => {
  const pathname = usePathname();

  const [listPath, setListPath] = useState<path[]>([]);

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);

    const list = [{ title: "Home", href: "/" }];

    const temp = segments
      .map((item, i) => {
        if (isHideLast) {
          if (i !== segments.length - 1) {
            return {
              title: item,
              href: i == segments.length - 2 ? pathname : item,
            };
          } else {
            return {
              title: "",
              href: "",
            };
          }
        } else {
          return {
            title: item,
            href: i == segments.length - 1 ? pathname : item,
          };
        }
      })
      .filter((item) => item.title && item.href);

    list.push(...temp);

    setListPath(list);
  }, [pathname]);

  return (
    <Breadcrumb className="py-5 text-base" separator=">" items={listPath} />
  );
};

export default Breadcrumbs;
