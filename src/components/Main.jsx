import React, { useEffect, useState } from "react";

export default function Main() {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        setPost(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  if (isLoading) {
    return <div>Loading please wait ...</div>;
  }

  if (error) {
    return <div>Something went wrong please refresh the page ...</div>;
  }

  return (
    <ul>
      {post.map((data) => {
        return <li key={data.id}>{data.title}</li>;
      })}
    </ul>
  );
}
