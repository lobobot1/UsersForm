"use client";
import { fetch } from "@lib/fetch";
import useSWR from "swr";

const AnswerList = () => {
  const { data, error, isLoading } = useSWR("/api/answers", fetch);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return <ul>{JSON.stringify(data, null, 2)}</ul>;
};

export default AnswerList;
