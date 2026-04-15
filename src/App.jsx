import { useEffect, useState } from "react";
import TaskCreator from "./components/TaskCreator";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import CustomModal from "./components/CustomModal";
import { useMobile } from "./hooks/useMobile";
import { useTablet } from "./hooks/useTablet";

function App() {
  const [taskItem, setTaskItem] = useState(null);
  const [taskItems, setTaskItems] = useState([]);

  const [isCreate, setIsCreate] = useState(false);
  const { isMobile } = useMobile();
  const isTablet = useTablet();

  useEffect(() => {
    const data = localStorage.getItem("tasks");

    if (!data) return;

    try {
      setTaskItems(JSON.parse(data));
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setIsCreate(false);
    } else if ((isMobile || isTablet) && taskItem) {
      setIsCreate(true);
    }
  }, [isMobile, isTablet, taskItem]);

  const createNewTask = (newTask) => {
    if (taskItems.find((t) => t?.title === newTask?.title)) {
      throw new Error("Task already exists");
    }

    if (!taskItems.find((t) => t?.id === newTask?.id)) {
      localStorage.setItem("tasks", JSON.stringify([...taskItems, newTask]));
      setTaskItems([...taskItems, newTask]);
      setIsCreate(false);
    }
  };

  const updateTask = (newTask) => {
    if (taskItems.find((t) => t?.id === newTask?.id)) {
      let UpdateNewTask = taskItems.map((item) => {
        if (item?.id === newTask?.id) {
          return {
            ...item,
            title: newTask.title,
            description: newTask.description,
            date: newTask.date,
            priority: newTask.priority,
            status: newTask.status,
            previousStatus: newTask.previousStatus,
            category: newTask.category,
          };
        }

        return item;
      });

      localStorage.setItem("tasks", JSON.stringify([...UpdateNewTask]));
      setTaskItems([...UpdateNewTask]);
      setIsCreate(false);
    }
  };

  const toggleTask = (task) => {
    const updateTask = taskItems.map((t) =>
      t.id === task.id
        ? {
            ...t,
            status: t.status === "completed" ? t.previousStatus : "completed",
          }
        : t,
    );
    setTaskItems(updateTask);
    localStorage.setItem("tasks", JSON.stringify(updateTask));
  };

  const deleteTask = (id) => {
    const modifyTaskItem = [...taskItems];

    const index = modifyTaskItem.findIndex((item) => item.id === id);
    if (index !== -1) {
      modifyTaskItem.splice(index, 1); // Elimina 1 elemento en el índice encontrado
    }

    localStorage.setItem("tasks", JSON.stringify([...modifyTaskItem]));
    setTaskItems([...modifyTaskItem]);
  };

  return (
    <main className="w-screen h-[100vh] flex flex-col sm:justify-center justify-start items-center gap-[32px] sm:py-0 py-[20px] lg:px-[128px] sm:px-[56px] px-[20px]">
      <section className="lg:w-[976px] w-full sm:h-[76px] flex flex-col gap-[8px] ">
        <h1 className="sm:text-[36px] text-[24px] text-[#2C3437] sm:leading-[40px] leading-[24px] font-extrabold">
          Good Morning, Elena.
        </h1>
        <p className="sm:text-[18px] text-[16px] text-[#596064] leading-normal">
          You have <span className="text-[#24667F] font-medium">4 tasks</span>{" "}
          left for today.
        </p>
      </section>
      <section className="lg:w-[976px] w-full h-auto flex items-start justify-center gap-[24px]">
        <div className="w-[392.67px] h-auto lg:flex hidden flex-col gap-[24px] ">
          <TaskCreator
            createNewTask={createNewTask}
            updateTask={updateTask}
            taskItem={taskItem}
            setTaskItem={setTaskItem}
          />
        </div>
        <TaskList
          taskItems={taskItems}
          toggleTask={toggleTask}
          setTaskItem={setTaskItem}
          deleteTask={deleteTask}
        />
      </section>

      <CustomModal isOpen={isCreate}>
        <TaskCreator
          createNewTask={createNewTask}
          updateTask={updateTask}
          taskItem={taskItem}
          setTaskItem={setTaskItem}
          onClose={() => {
            setIsCreate(false);
            setTaskItem(null);
          }}
        />
      </CustomModal>

      <button
        onClick={() => setIsCreate(true)}
        className="fixed bottom-5 right-5 w-[40px] h-[40px] bg-[#24667F] backdrop-blur-xl p-3 rounded-full lg:hidden flex"
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
            <g id="Edit / Add_Plus">
              {" "}
              <path
                id="Vector"
                d="M6 12H12M12 12H18M12 12V18M12 12V6"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </button>

      <ToastContainer />
    </main>
  );
}

export default App;
