import { Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_TASK_ROUTE, TASK_ROUTES } from "../constants/Routes";
import TaskPage from "../pages/TaskPage";

const AppRoutes = ({ taskPageProps }) => {
  return (
    <Routes>
      {TASK_ROUTES.map(({ path, mode }) => (
        <Route key={path} path={path} element={<TaskPage {...taskPageProps} mode={mode} />} />
      ))}
      <Route path="*" element={<Navigate to={DEFAULT_TASK_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRoutes;
