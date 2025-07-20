import { useState } from "react";
import { Card } from "antd";
import StructureBuilder from "./components/Input";
import JsonRenderer from "./components/Json";

const App = () => {
  const [data, setData] = useState({});


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 20,
        width: "90vw",
        padding: 20,
      }}
    >
      <Card style={{ flex: 1 }}>
        <StructureBuilder data={data} onChange={setData} />
      </Card>
      <Card style={{ flex: 1 }}>
        <JsonRenderer data={data} />
      </Card>
    </div>
  );
};

export default App;
