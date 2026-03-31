export const truncateText = (value, maxLength) => {
  if (!value) {
    return "";
  }

  const normalized = value.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
};
