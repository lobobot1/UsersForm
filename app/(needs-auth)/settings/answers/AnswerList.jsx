"use client";

import useAnswers from "@/app/hooks/useAnswers";

const AnswerList = () => {
  const { data: { data } = {}, error, isLoading } = useAnswers();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {data.map((answer) => (
        <li key={answer.id}>{answer.answer}</li>
      ))}
    </ul>
  );
};

export default AnswerList;
