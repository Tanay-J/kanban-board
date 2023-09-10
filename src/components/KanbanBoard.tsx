import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import PlusIcon from "../icons/PlusIcon";
import { Column, Task } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((c) => c.id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

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

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over?.id;

    if (activeColumnId === overColumnId) return;

    setColumns((cols) => {
      const activeColumnIndex = cols.findIndex((c) => c.id === activeColumnId);
      const overColumnIndex = cols.findIndex((c) => c.id === overColumnId);

      return arrayMove(cols, activeColumnIndex, overColumnIndex);
    });
  };

  const updateColumn = (id: string, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const createTask = (columnId: string) => {
    const newTask = {
      id: uuid(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const updateTask = (taskId: string, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, content };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
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
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                ></ColumnContainer>
              ))}
            </SortableContext>
          </div>
          <button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2
      border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
            onClick={createColumn}
          >
            <PlusIcon></PlusIcon>Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              ></ColumnContainer>
            )}
          </DragOverlay>,
          document.body
        )}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
