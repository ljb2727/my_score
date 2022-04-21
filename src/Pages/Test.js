import React, { useState, useEffect } from "react";
function Test() {
  const [count, setCount] = useState(
    () => JSON.parse(window.localStorage.getItem("count")) || 0
  );

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(Number(count) + 1)}>{count}</button>
    </>
  );
}

export default Test;
