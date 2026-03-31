import { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskToolbar from "../components/TaskToolbar";
import { STATUS_ALL } from "../constants/taskStatus";
import {
  DEFAULT_TASK_LAYOUT,
  DEFAULT_TASK_SORT_ORDER,
  TASK_EMPTY_STATE_MESSAGE,
  TASK_MODE_ALL,
  TASK_MODE_COMPLETED,
  TASK_PAGE_CONFIG,
  TASK_LAYOUT_GRID
} from "../constants/taskView";
import { getDueDateSorter, shouldShowTaskInFilter } from "../utils/taskList";

const TaskPage = ({ mode, tasks, onEdit, onDelete }) => {
  const [filterStatus, setFilterStatus] = useState(STATUS_ALL);
  const [sortOrder, setSortOrder] = useState(DEFAULT_TASK_SORT_ORDER);
  const [layout, setLayout] = useState(DEFAULT_TASK_LAYOUT);

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => shouldShowTaskInFilter({ task, mode, filterStatus }))
      .sort(getDueDateSorter(sortOrder));
  }, [mode, tasks, filterStatus, sortOrder]);

  const currentPage = TASK_PAGE_CONFIG[mode] || TASK_PAGE_CONFIG[TASK_MODE_ALL];

  return (
    <section>
      <header className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{currentPage.title}</h2>
          <p className="mt-1 text-slate-600">{currentPage.subtitle}</p>
        </div>
        <div className="w-full xl:w-auto">
          <TaskToolbar
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            layout={layout}
            onLayoutChange={setLayout}
            showStatusFilter={mode !== TASK_MODE_COMPLETED}
          />
        </div>
      </header>

      {visibleTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-slate-500">
          {TASK_EMPTY_STATE_MESSAGE}
        </p>
      ) : (
        <div
          className={`grid gap-6 ${layout === TASK_LAYOUT_GRID ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            }`}
        >
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              layout={layout}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskPage;
