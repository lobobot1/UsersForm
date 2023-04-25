"use client";

import useTopics from "@/app/hooks/useTopics";

const TopicList = () => {
  const { data: { data } = {}, error, isLoading } = useTopics();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {data.map((topic) => (
        <li key={topic.id}>{topic.name}</li>
      ))}
    </ul>
  );
};

export default TopicList;
