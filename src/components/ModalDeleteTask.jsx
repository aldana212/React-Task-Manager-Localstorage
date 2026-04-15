import React from "react";

const ModalDeleteTask = ({ onCancel, onDelete }) => {
  return (
    <div className="sm:relative absolute bottom-0 sm:w-[448px] w-full sm:h-[430px] h-auto flex flex-col justify-center items-center gap-[12px] bg-[#FFFFFF] sm:rounded-[48px] rounded-t-[48px] p-[40px]">
      <div className="w-[64px] h-[64px] p-4 flex justify-center items-center bg-[#FA746F]/20 rounded-full">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M10 12V17"
              stroke="#A83836"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M14 12V17"
              stroke="#A83836"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M4 7H20"
              stroke="#A83836"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
              stroke="#A83836"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="#A83836"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <h3 className="pt-[12px] text-[24px] text-[#2C3437] text-center leading-[32px] font-bold">
        Delete Task?
      </h3>
      <p className="text-[16px] text-[#596064] text-center leading-[20px] font-normal">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="w-full sm:pt-[28px] pt-[10px] flex flex-col gap-[12px]">
        <button
          className="w-full sm:h-[56px] h-[40px] bg-[#24667F] sm:py-[16px] py-0 rounded-full"
          onClick={onDelete}
        >
          <span className="sm:text-[16px] text-[14px] text-[#F3FAFF] leading-[24px] font-normal">
            Delete
          </span>
        </button>
        <button
          className="w-full sm:h-[56px] h-[40px] border border-transparent hover:border-[#24667F] sm:py-[16px] py-0 rounded-full transition-all duration-300 cursor-pointer"
          onClick={onCancel}
        >
          <span className="sm:text-[16px] text-[14px] text-[#24667F] leading-[24px] font-normal">
            Cancel
          </span>
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteTask;
