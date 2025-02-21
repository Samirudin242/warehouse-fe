"use client";

import { useAppContext } from "@/contexts/useContext";

const LoadingOverlay = () => {
  const { loading, loadingAnimation } = useAppContext();

  if (!loading && !loadingAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-white text-xl font-semibold">
        <img src="/loading.gif" alt="Loading..." height={200} width={300} />
        <p className="text-center -mt-10 text-grey-500">Loading ...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
