import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
export const distanceToNow = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id   })
}