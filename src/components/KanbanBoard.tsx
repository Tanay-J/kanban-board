import { useState } from "react";
import { v4 as uuid } from "uuid";
import PlusIcon from "../icons/PlusIcon";
import { Column } from "../types";
import { ColumnContainer } from "./ColumnContainer";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const createColumn = () => {
    const newColumn: Column = {
      id: uuid(),
      title: `Column-${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: string) => {
    const updatedColumns = columns.filter((col) => col.id !== id);
    setColumns(updatedColumns);
  };

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              column={col}
              deleteColumn={deleteColumn}
            ></ColumnContainer>
          ))}
        </div>
        <button
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2
      border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
          onClick={createColumn}
        >
          <PlusIcon></PlusIcon>Add Column
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;
