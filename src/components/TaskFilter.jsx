import React from "react";

const TaskFilter = ({ filters, setFilters, filterList }) => {
  return (
    <div className="w-full sm:min-h-[37.5px] h-auto  flex sm:gap-[4px] gap-[12px] px-[8px] rounded-[48px]">
      {filterList.map((item, key) => (
        <button
          key={key}
          className={`max-w-max sm:h-[36px] h-[20px ]  border-b sm:border-b-transparent ${filters.status === item.value ? "sm:bg-[#24667F] border-b-[#24667F]" : "bg-transparent border-b-transparent"}  
          sm:hover:bg-[#24667F] group sm:py-[16px] sm:px-[16px] flex 
          items-center justify-center gap-[8px] sm:rounded-full transition-all duration-300 cursor-pointer`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, status: item.value }))
          }
        >
          <span
            className={`text-[12px] ${filters.status === item.value ? "sm:text-[#F3FAFF] text-[#24667F] font-bold" : "text-[#596064] font-normal"} group-hover:text-[#F3FAFF] leading-[16px]`}
          >
            {item.name}
          </span>
          <div
            className={`w-[25.2px] min-h-[11.57px] px-[8px] py-[2px] sm:flex hidden justify-center items-center
          ${filters.status === item.value ? "bg-[#F3FAFF]/20" : "bg-transparent"} group-hover:bg-[#F3FAFF]/20 rounded-full`}
          >
            <span
              className={`text-[11px] ${filters.status === item.value ? "text-[#F3FAFF] font-bold" : "text-[#596064] font-normal"} group-hover:text-[#F3FAFF]  leading-[14px] `}
            >
              {item.count}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
