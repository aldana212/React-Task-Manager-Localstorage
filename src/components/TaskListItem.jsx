import React, { useState } from "react";
import { formatTaskDate } from "../Utils/formatTaskDate";
import ModalDeleteTask from "./ModalDeleteTask";
import CustomModal from "./CustomModal";

const TaskListItem = ({ item, toggleTask, setTaskItem, deleteTask }) => {
  const [isDelete, setIsDelete] = useState(false);

  const { id, title, description, date, priority, status, category } = item;

  return (
    <div
      className={`w-full h-auto flex sm:flex-row flex-col -center sm:items-center items-start gap-[12px] p-[20px] bg-[#FFFFFF] rounded-[16px] ${status === "completed" && "opacity-60"}`}
    >
      <div className="w-full flex flex-col items-start gap-[4px]">
        <div className="w-full flex items-center gap-[16px]">
          <label
            htmlFor={`task-${id}`}
            className="flex flex-row items-center gap-2.5"
          >
            <input
              id={`task-${id}`}
              type="checkbox"
              className="peer hidden"
              checked={status === "completed"}
              onChange={() => toggleTask(item)}
            />
            <div
              htmlFor="hr"
              className={`min-w-[24px] h-[24px] border-2 border-[#ACB3B7] flex justify-center items-center rounded-[8px]
            ${status === "completed" && "bg-[#24667F]/10 border-[#24667F]/20"}
              transition`}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className={`w-[15px] h-[15px] stroke-[#24667F] transition
        ${status === "completed" ? "opacity-100" : "opacity-0"}
      `}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </label>

          <h3
            className={`sm:text-[18px] text-[16px] text-[#2C3437] sm:leading-[22.5px] leading-[18px] font-medium ${status === "completed" && "line-through"}`}
          >
            {title}
          </h3>
        </div>
        {description && (
          <p className="pl-[40px]  sm:text-[14px] text-[12px] text-[#526170] sm:leading-[20px] leading-[16px] font-normal">
            {description}
          </p>
        )}
        <div className="w-full pl-[40px] flex items-center gap-[16px]">
          {date && (
            <div className="max-w-max flex items-center gap-[4px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="8.5"
                      stroke="#222222"
                    ></circle>{" "}
                    <path
                      d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5"
                      stroke="#222222"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <p className="text-[14px] text-[] leading-[20px] font-medium">
                {date ? formatTaskDate(new Date(date)) : ""}
              </p>
            </div>
          )}
          <div className="max-w-max flex items-center gap-[4px]">
            <div
              className={`w-[10px] h-[10px]
                ${priority === "low" && "bg-[#34D399]"}
                ${priority === "medium" && "bg-[#FBBF24]"}
                ${priority === "high" && "bg-[#FB7185]"}
                rounded-full transition-all duration-300 cursor-pointer`}
            />
            <p className="text-[10px] text-[#596064] leading-[15px] font-bold">
              {priority?.toUpperCase()}
            </p>
          </div>
          {category && (
            <div className="min-w-[63px] min-h-[23px] flex justify-center items-center px-[10px] py-[4px] rounded-full bg-[#24667F]/5">
              <span className="text-[10px] text-[#24667F] leading-[15px] font-bold">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-[73.99px] h-[34px] sm:pl-0 pl-[40px] flex items-center gap-[7.99px]">
        <button
          onClick={() => setTaskItem(item)}
          className="min-w-[32px] h-[32px] p-[8px] rounded-[8px]  border border-[#34D399] hover:bg-[#34D399] group transition-all duration-300 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#34D399] group-hover:stroke-[#FFFFFF] transition-all duration-300"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button
          onClick={() => setIsDelete(true)}
          className="min-w-[32px] h-[32px] p-[8px] rounded-[8px] border border-[#FB7185] hover:bg-[#FB7185] group transition-all duration-300 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#FB7185] group-hover:stroke-[#FFFFFF] transition-all duration-300"
          >
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M14 12V17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M4 7H20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
      <CustomModal isOpen={isDelete}>
        <ModalDeleteTask
          isOpen={isDelete}
          onCancel={() => setIsDelete(false)}
          onDelete={() => {
            deleteTask(id);
            setIsDelete(false);
          }}
        />
      </CustomModal>
    </div>
  );
};

export default TaskListItem;
