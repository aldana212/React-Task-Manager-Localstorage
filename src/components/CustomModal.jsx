import React from "react";

const CustomModal = ({ isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-[#00000066]/50 fixed 2xl:px-0 xl:px-0 lg:px-0 tablet:px-0 mobile:px-2 inset-0 z-50 flex justify-center items-center overflow-hidden">
          {children}
        </div>
      )}
    </>
  );
};

export default CustomModal;
