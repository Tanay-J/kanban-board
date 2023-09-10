import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, content: string) => void;
}
function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isEditMode) {
    return (
      <div
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl 
    hover:ring-2 hover:ring-inset hover: ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          autoFocus
          onBlur={toggleEditMode}
          value={task.content}
          placeholder="Task content"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) return;

            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      key={task.id}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl 
      hover:ring-2 hover:ring-inset hover: ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={() => setIsEditMode(true)}
    >
      <p className="my-auto h-[90%] w-full overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          className="stroke-white absolute right-4 top-1/2-translate-y-1/2 bg-columnBackgroundColor p-2 rounded
        opacity-60 hover::opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon></TrashIcon>
        </button>
      )}
    </div>
  );
}

export { TaskCard };
