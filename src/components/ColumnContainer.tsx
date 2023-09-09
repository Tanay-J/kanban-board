import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "../icons/TrashIcon";
import { Column } from "../types";
import { useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
}
const ColumnContainer = ({ column, deleteColumn, updateColumn }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
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
      hover: stroke-white
      hover:bg-columnBackgroundColor
      rounded
      px-1
      py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon></TrashIcon>
        </button>
      </div>

      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};
export { ColumnContainer };
