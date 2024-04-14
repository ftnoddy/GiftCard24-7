import React from "react";

const ModalLayout = ({ children }) => {
  return (
    <>
      <div className="w-full h-full left-0 top-0 z-50 fixed bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-2">
        <div className="w-full md:w-8/12 lg:w-7/12 xl:w-4/12 bg-white rounded-md">{children}</div>
      </div>
    </>
  );
};

export default ModalLayout;
