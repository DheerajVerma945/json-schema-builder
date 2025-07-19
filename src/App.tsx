import React from "react";
import JsonRenderer from "./components/Json";
import { Card } from "antd";

const data = {
  name: "Dheeraj",
  age: 21,
  address: {
    city: "Delhi",
    country: {
      code: "+91",
      name:"India"
    },
    pincode: 110001,
  },
  hobbies: ["music", ["CCSU", "Undergraduate", ["12th", "10th"]]],
};

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        alignItems: "center",
        gap: 20,
        width: "50vw",
        padding: 20,
      }}
    >
      {/* JSON Builder is yet to create */}
      <Card style={{ flex: 1 }}>Hii</Card>
      <Card style={{ flex: 2 }}>
        <JsonRenderer data={data} />
      </Card>
    </div>
  );
};

export default App;
