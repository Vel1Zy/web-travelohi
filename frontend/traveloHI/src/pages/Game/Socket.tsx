import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = function (event) {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = function (event) {
      console.log("Received message from server:", event.data);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    socket.onclose = function (event) {
      console.log("WebSocket connection closed");
    };

    return () => {
      console.log("Component unmounted, closing WebSocket connection");
      socket.close();
    };
  }, []);

  return <div>{/* Your component JSX */}</div>;
};

export default MyComponent;
