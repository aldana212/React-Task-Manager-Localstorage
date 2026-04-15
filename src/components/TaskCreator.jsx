import { useEffect, useState } from "react";

import DatePickerInput from "./DatePickerInput";
import CustomSelect from "./CustomSelect";

import { ToastContainer, toast } from "react-toastify";
import { useMobile } from "../hooks/useMobile";

const generateId = () =>
  Date.now().toString(35) + Math.random().toString(36).slice(2); // "q6d241evh6777uneuz"

const TaskCreator = ({
  createNewTask,
  updateTask,
  taskItem,
  setTaskItem,
  onClose,
}) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: null,
    priority: "medium", // low, medium, high
    status: { value: "in_progress", label: "In Progress" },
    previousStatus: "in_progress",
    category: null,
  });

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const categoryOptions = [
    { value: "work", label: "Work" },
    { value: "study", label: "Study" },
    { value: "personal", label: "Personal" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    if (taskItem) {
      let findStatus = statusOptions.find(
        (item) => item.status?.value === taskItem.status?.value,
      );

      let findCategory = categoryOptions.find(
        (item) => item.category?.value === taskItem.category?.value,
      );

      setTask((prev) => ({
        ...prev,
        title: taskItem?.title,
        description: taskItem?.description,
        date: taskItem?.date,
        priority: taskItem?.priority, // low, medium, high
        status: findStatus,
        previousStatus: taskItem?.previousStatus,
        category: findCategory,
      }));
    }
  }, [taskItem]);

  // handler general
  const handleChange = (field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (task.title.trim() === "" || !task.title) {
        throw new Error("El titulo es Obligatorio");
      }

      if (task.description && task.description.trim().length < 10) {
        throw new Error("Escribe una descripción más útil");
      }

      const formattedTask = {
        title: task?.title,
        description: task?.description,
        date: task?.date,
        priority: task.priority,
        status: task.status?.value,
        previousStatus:
          task.status?.value === "completed"
            ? "in_progress"
            : task.status?.value,
        category: task.category?.value,
      };

      if (taskItem?.id) {
        formattedTask.id = taskItem?.id;
        updateTask(formattedTask);
      } else {
        formattedTask.id = generateId();
        createNewTask(formattedTask);
      }

      handleClean();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error.message);
    }
  };

  // Clean
  const handleClean = () => {
    setTask((prev) => ({
      ...prev,
      title: "",
      description: "",
      date: null,
      priority: "medium", // low, medium, high
      status: { value: "in_progress", label: "In Progress" },
      previousStatus: "in_progress",
      category: null,
    }));
    setTaskItem(null);
  };

  return (
    <div className="sm:relative absolute bottom-0  w-[392.67px] h-auto  flex flex-col gap-[16px] p-[24px] bg-[#FFFFFF] lg:rounded-[48px] sm:rounded-[35px] rounded-t-[32px] transition-all duration-300">
      <button
        onClick={onClose}
        className="absolute right-7 top-4 lg:hidden flex w-[20px] h-[20px] border border-[#125A72] rounded-full flex justify-center items-center p-[4px]"
      >
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
              d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
              fill="#125A72"
            ></path>{" "}
          </g>
        </svg>
      </button>

      <h3 className="text-[14px] text-[#526170] leading-[20px] font-semibold ">
        NEW INTENT *
      </h3>
      <div className="w-full flex flex-col gap-[16px]">
        <input
          type="text"
          value={task.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="What needs focus?"
          className="w-full h-[52px] bg-[#F0F4F7] px-[24px] py-[17px] rounded-[16px] text-[16px] text-[#747C80] outline-none"
        />

        <textarea
          name="description"
          id="description"
          value={task.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add more context (optional)..."
          className="w-full h-[80px] bg-[#F0F4F7] resize-none px-[24px] py-[10px] rounded-[16px] text-[16px] text-[#747C80] outline-none"
        ></textarea>

        <div className="w-full flex items-center gap-[16px]">
          <div className="w-full min-h-[67px] flex flex-col gap-[9px]">
            <label
              htmlFor="status"
              className="text-[10px] text-[#596064] leading-[15px] font-bold"
            >
              Fecha límite
            </label>
            <DatePickerInput
              value={task.date}
              onChange={(date) => handleChange("date", date)}
            />
          </div>
          <div className="w-full min-h-[67px] flex flex-col gap-[9px]">
            <label
              htmlFor="status"
              className="text-[10px] text-[#596064] leading-[15px] font-bold"
            >
              Prioridad
            </label>
            <div className="w-full h-[44px] flex items-center gap-[6.5px] px-[16px] py-[10px] bg-[#F0F4F7] rounded-[16px]">
              <button
                onClick={() => handleChange("priority", "low")}
                className={`w-[20px] h-[20px] border border-[#34D399] rounded-full ${task.priority === "low" ? "p-[2px]" : "p-0"} hover:p-[2px]  transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full h-full bg-[#34D399] rounded-full " />
              </button>
              <button
                onClick={() => handleChange("priority", "medium")}
                className={`w-[20px] h-[20px] border border-[#FBBF24] rounded-full ${task.priority === "medium" ? "p-[2px]" : "p-0"} hover:p-[2px]  transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full h-full bg-[#FBBF24] rounded-full " />
              </button>
              <button
                onClick={() => handleChange("priority", "high")}
                className={`w-[20px] h-[20px] border border-[#FB7185] rounded-full ${task.priority === "high" ? "p-[2px]" : "p-0"} hover:p-[2px]  transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full h-full bg-[#FB7185] rounded-full " />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center gap-[16px]">
          <div className="w-full min-h-[67px] flex flex-col gap-[9px]">
            <label
              htmlFor="status"
              className="text-[10px] text-[#596064] leading-[15px] font-bold"
            >
              Status
            </label>
            <CustomSelect
              options={statusOptions}
              value={task.status}
              onChange={(option) => handleChange("status", option)}
            />
          </div>
          <div className="w-full min-h-[67px] flex flex-col gap-[9px]">
            <label
              htmlFor="status"
              className="text-[10px] text-[#596064] leading-[15px] font-bold"
            >
              Categoría
            </label>
            <CustomSelect
              options={categoryOptions}
              value={task.category}
              onChange={(option) => handleChange("category", option)}
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-[8px]">
          <button
            className="w-full sm:h-[56px] h-[40px] bg-[#125A72] py-[16px] flex items-center justify-center gap-[7.99px] rounded-full"
            onClick={handleSubmit}
          >
            <span className="sm:text-[16px] text-[14px] text-[#F3FAFF] leading-[24px] font-bold">
              {taskItem?.id ? "Update Task" : "Add Task"}
            </span>
          </button>
          <button
            className="w-full sm:h-[56px] h-[40px] border border-[#125A72] py-[16px] flex items-center justify-center gap-[7.99px] rounded-full cursor-pointer"
            onClick={handleClean}
          >
            <span className="sm:text-[16px] text-[14px] text-[#125A72] leading-[24px] font-bold">
              Cancel
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;
