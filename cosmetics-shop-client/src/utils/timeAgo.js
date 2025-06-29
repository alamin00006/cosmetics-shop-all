import { formatDistanceToNow } from "date-fns";

export const timeAgo = (timestamp) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true });
