import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_PENDING
} from "../constants/taskStatus";
import { DASHBOARD_SPOTLIGHT_STAT_CONFIG } from "../constants/taskView";

export const buildSafeTaskSummary = (summary) => {
  return {
    total: summary?.total ?? 0,
    [TASK_STATUS_PENDING]: summary?.[TASK_STATUS_PENDING] ?? 0,
    [TASK_STATUS_IN_PROGRESS]: summary?.[TASK_STATUS_IN_PROGRESS] ?? 0,
    [TASK_STATUS_COMPLETED]: summary?.[TASK_STATUS_COMPLETED] ?? 0
  };
};

export const getTaskCompletionRate = (summary) => {
  const { total } = summary;
  const completed = summary[TASK_STATUS_COMPLETED];

  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
};

export const buildDashboardSpotlightStats = (summary) => {
  const completionRate = getTaskCompletionRate(summary);

  return DASHBOARD_SPOTLIGHT_STAT_CONFIG.map(({ key, suffix, ...stat }) => ({
    ...stat,
    key,
    suffix,
    value: key ? `${summary[key]}${suffix}` : `${completionRate}${suffix}`
  }));
};
