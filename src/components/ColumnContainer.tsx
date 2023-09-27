import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "../icons/TrashIcon";
import { Column, Task } from "../types";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { TaskCard } from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
  createTask: (columnId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, content: string) => void;
  tasks: Task[];
}
const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const taskId = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: isEditing,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
bg-columnBackgroundColor
opacity-40
border-2
border-rose-500
w-[350px]
h-[500px]
max-h-[500px]
rounded-md
flex
flex-col"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-columnBackgroundColor
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none 
      p-3
      font-bold
      border-columnBackgroundColor
      border-4 
      flex
      items-center
      justify-between"
        onClick={() => setIsEditing(true)}
      >
        <div
          className="
        flex
        justify-center
        items-center
        bg-columnBackgroudColor
        px-2
        py-1
        text-sm
        rounded-full"
        >
          0
        </div>
        {!isEditing && column.title}
        {isEditing && (
          <input
            value={column.title}
            autoFocus
            onChange={(e) => updateColumn(column.id, e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setIsEditing(false);
            }}
            className="bg-black focus:border-rose-500 border rounded outline-none px-2"
          />
        )}
        <button
          className="
      stroke-gray-400
      hover:stroke-white
      hover:bg-columnBackgroundColor
      rounded
      px-1
      py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon></TrashIcon>
        </button>
      </div>

      {/* Column content */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskId}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            ></TaskCard>
          ))}
        </SortableContext>
      </div>

      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor 
      hover: text-rose-500 active:bg-black"
        onClick={() => createTask(column.id)}
      >
        <PlusIcon></PlusIcon>Add Task
      </button>
    </div>
  );
};
export { ColumnContainer };
