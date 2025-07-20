//using JSON.strringify

import type React from "react";
import { Card } from "antd";

interface JsonRendererProps {
  data: any;
  indent?: number;
  isLast?: boolean;
}

const JsonRenderer: React.FC<JsonRendererProps> = ({ data }) => {
  return (
    <Card title="Generated Structure" style={{ marginTop: 20 }}>
      <pre>{JSON.stringify(data,null,2)}</pre>
    </Card>
  );
};

export default JsonRenderer;

/*

##Using recursion


import type React from "react";
import { Typography } from "antd";
const { Text } = Typography;

interface JsonRendererProps {
  data: any;
  indent?: number;
  isLast?: boolean;
}

const JsonRenderer: React.FC<JsonRendererProps> = ({ data, isLast = true }) => {
  //checks for array and recursively calls with inline element with comma
  if (Array.isArray(data)) {
    return (
      <div>
        <Text>[</Text>
        {data.map((item, index) => (
          <div key={index} style={{ paddingLeft: 20 }}>
            <JsonRenderer data={item} isLast={index === data.length - 1} />
            {!isLast && index !== data.length - 1 && <Text>,</Text>}
          </div>
        ))}
        <Text>]{!isLast && ","}</Text>
      </div>
    );
  }

  //checks for object and recursively calls with proper nesting and commas
  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data);
    return (
      <div>
        <Text>{"{"}</Text>
        {entries.map(([key, value], index) => (
          <div key={index} style={{ paddingLeft: 20 }}>
            <Text>{key}: </Text>
            <JsonRenderer data={value} isLast={index === entries.length - 1} />
          </div>
        ))}
        <Text>
          {"}"}
          {!isLast && ","}
        </Text>
      </div>
    );
  }

  //formatted data for the string and other primitive data types
  const formattedData = typeof data === "string" ? `"${data}"` : String(data);

  return (
    <Text>
      {formattedData}
      {!isLast && ", "}
    </Text>
  );
};

export default JsonRenderer;
*/
