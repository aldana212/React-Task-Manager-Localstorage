import React, { useState } from "react";
import TaskListItem from "./TaskListItem";
import TaskFilter from "./TaskFilter";

const TaskList = ({ taskItems, toggleTask, setTaskItem, deleteTask }) => {
  const [filters, setFilters] = useState({
    status: "all", // "all" | "pending" | "completed" | "in_progress"
    sort: "newest", // "newest" | "oldest"
  });

  const filterList = [
    { name: "All", value: "all" },
    { name: "Completed", value: "completed" },
    { name: "In Progress", value: "in_progress" },
    { name: "Pending", value: "pending" },
  ];

  const filtersWithCount = filterList?.map((filter) => {
    if (filter.value === "all") {
      return {
        ...filter,
        count: taskItems?.length,
      };
    }

    const count = taskItems?.filter(
      (task) => task.status === filter.value,
    )?.length;

    return {
      ...filter,
      count,
    };
  });

  // 🔹 helper para fechas (maneja null)
  const getTime = (date) => (date ? new Date(date).getTime() : Infinity);

  // 🔹 filtrado + orden
  const filteredTasks = [...taskItems]
    ?.filter((task) => {
      if (filters.status === "all") return true;
      return task.status === filters.status;
    })
    ?.sort((a, b) => {
      if (filters.sort === "newest") {
        return getTime(b.date) - getTime(a.date);
      }
      if (filters.sort === "oldest") {
        return getTime(a.date) - getTime(b.date);
      }
      return 0;
    });

  return (
    <div className="sm:w-[559.33px] w-full h-[577px] flex flex-col gap-[16px]">
      <div className="w-full flex flex-col gap-[16px]">
        <div className="w-full min-h-[28px] flex justify-between items-center px-[8px]">
          <h3 className="sm:text-[20px] text-[16px] text-[#2C3437] sm:leading-[28px] leading-[20px] font-bold">
            Focus List
          </h3>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                sort: prev.sort === "newest" ? "oldest" : "newest",
              }))
            }
            className="max-w-max flex items-center gap-[3.99px] cursor-pointer"
          >
            <div className="w-[18px] h-[18px] flex justify-center items-center">
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
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                    fill="#24667F"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <span className="sm:text-[14px] text-[12px] text-[#24667F] leading-[20px] font-semibold">
              {filters.sort === "newest" ? "Newest ↓" : "Oldest ↑"}
            </span>
          </button>
        </div>
        <TaskFilter
          filters={filters}
          setFilters={setFilters}
          filterList={filtersWithCount}
        />
      </div>
      {filteredTasks.length > 0 && (
        <div className="w-full h-full flex flex-col gap-[16px] overflow-auto">
          {filteredTasks.map((item, key) => (
            <TaskListItem
              key={key}
              item={item}
              toggleTask={toggleTask}
              setTaskItem={setTaskItem}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      )}
      {filteredTasks.length === 0 && (
        <div className="w-full h-[400px] bg-[#FFFFFF]/50 border border-[#ACB3B7]/30 flex flex-col justify-center items-center gap-[8px] rounded-[16px]">
          <div className="w-[64px] h-[64px] p-4 flex justify-center items-center bg-[#E3E9ED] rounded-full">
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
                <path
                  d="M21 5.4A2.4 2.4 0 0 0 18.6 3H5.4A2.4 2.4 0 0 0 3 5.4v15.2A2.4 2.4 0 0 0 5.4 23h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4Z"
                  fill="#ACB3B7"
                  fillOpacity=".16"
                  stroke="#ACB3B7"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M15.2 1H8.8a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h6.4a.8.8 0 0 0 .8-.8V1.8a.8.8 0 0 0-.8-.8Z"
                  fill="#ffffff"
                  stroke="#ACB3B7"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                ></path>
                <path
                  d="m8 14 3 3 5-7"
                  stroke="#ACB3B7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
          <h3 className="sm:text-[20px] text-[18px] text-[#2C3437] text-center sm:leading-[28px] leading-[20px] font-bold">
            No hay tareas
          </h3>
          <p className="w-[254px] sm:text-[16px] text-[14px] text-[#596064] text-center sm:leading-[24px] leading-[18px] font-normal">
            Prueba cambiar el filtro o crea una nueva tarea
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
