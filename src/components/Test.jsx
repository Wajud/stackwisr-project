import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query {
    books {
      title
      author
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  console.log("loading: ", loading);
  if (error) {
    console.log("There was an error: ", error);
  }
  useEffect(() => console.log(data), [data]);
  //   console.log(data);
  return (
    <div>
      <h1>Hello World Here</h1>
    </div>
  );
};

export default Test;
