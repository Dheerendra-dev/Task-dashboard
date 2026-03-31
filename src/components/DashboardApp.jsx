import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";

import {
  selectTaskSummary,
  selectTasks
} from "../store/tasksSlice";
import AppRoutes from "./AppRoutes";
import CreateTaskFab from "./CreateTaskFab";
import DashboardLayout from "./DashboardLayout";
import { DEFAULT_TASK_ROUTE } from "../constants/Routes";
import { addTaskAsync, deleteTaskAsync, fetchTasks, updateTaskAsync } from "../store/tasksActions";

const TaskFormModal = lazy(() => import("./TaskFormModal"));

const DashboardApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const summary = useSelector(selectTaskSummary);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      dispatch(updateTaskAsync({ id: editingTask.id, updates: taskData }));
    } else {
      dispatch(addTaskAsync(taskData));
    }

    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskAsync({ id: taskId }));
  };

  const isTaskView = location.pathname.startsWith(DEFAULT_TASK_ROUTE);
  const taskPageProps = {
    tasks,
    onEdit: openEditModal,
    onDelete: handleDeleteTask
  };

  return (
    <>
      <DashboardLayout summary={summary} onCreateProject={openCreateModal}>
        <AppRoutes taskPageProps={taskPageProps} />
      </DashboardLayout>

      <Suspense fallback={null}>
        <TaskFormModal
          isOpen={isModalOpen}
          task={editingTask}
          onSave={handleSaveTask}
          onClose={closeModal}
        />
      </Suspense>

      <CreateTaskFab show={isTaskView} onClick={openCreateModal} />
    </>
  );
};

export default DashboardApp;
