import { fetch } from "@lib/fetch";
import useSWR from "swr";

export default function useAnswers() {
  const swr = useSWR("/api/answers", fetch);
  return { ...swr };
}
