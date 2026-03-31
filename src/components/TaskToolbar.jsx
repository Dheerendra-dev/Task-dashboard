import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";
import {
  TASK_LAYOUT_GRID,
  TASK_LAYOUT_LIST,
  TASK_SORT_OPTIONS
} from "../constants/taskView";
import { buildStatusFilterOptions } from "../utils/taskList";

const STATUS_FILTER_OPTIONS = buildStatusFilterOptions();

const TaskToolbar = ({
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortOrderChange,
  layout,
  onLayoutChange,
  showStatusFilter = true
}) => {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <CustomSelect
            id="sort-order"
            value={sortOrder}
            onChange={onSortOrderChange}
            ariaLabel="Sort by due date"
            leftIcon="sort"
            options={TASK_SORT_OPTIONS}
            className="min-w-[170px]"
            buttonClassName="h-10 rounded-lg bg-white pr-8 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
          />
        </div>

        {showStatusFilter && (
          <div className="relative">
            <CustomSelect
              id="filter-status"
              value={filterStatus}
              onChange={onFilterChange}
              leftIcon="filter_list"
              options={STATUS_FILTER_OPTIONS}
              className="min-w-[140px]"
              buttonClassName="h-10 rounded-lg bg-white pr-8 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
            />
          </div>
        )}
      </div>

      <div
        className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        aria-label="Task layout"
      >
        <Button
          className={`px-3 py-2 text-sm font-semibold transition ${layout === TASK_LAYOUT_GRID ? "bg-blue-700 text-white" : "bg-transparent text-slate-600"
            }`}
          onClick={() => onLayoutChange(TASK_LAYOUT_GRID)}
        >
          <span className="material-symbols-outlined mr-1 text-base">grid_view</span>
          Grid
        </Button>
        <Button
          className={`px-3 py-2 text-sm font-semibold transition ${layout === TASK_LAYOUT_LIST ? "bg-blue-700 text-white" : "bg-transparent text-slate-600"
            }`}
          onClick={() => onLayoutChange(TASK_LAYOUT_LIST)}
        >
          <span className="material-symbols-outlined mr-1 text-base">view_list</span>
          List
        </Button>
      </div>
    </section>
  );
};

export default TaskToolbar;
