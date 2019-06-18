import React from "react";
import { useAppQueryQuery } from "./generated-types";
import TodoApp from "./components/TodoApp";

export const App: React.FC<{}> = () => {
  const { data, error } = useAppQueryQuery({
    variables: {
      userId: "me"
    }
  });

  if (data && data.user) {
    return <TodoApp user={data.user} />;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return <div>Loading</div>;
};
