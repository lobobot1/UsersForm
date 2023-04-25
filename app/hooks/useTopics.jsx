import { fetch } from "@lib/fetch";
import useSWR from "swr";

export default function useTopics() {
  const swr = useSWR("/api/topics", fetch);
  return { ...swr };
}
