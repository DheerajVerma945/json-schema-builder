import type React from "react";
import { Typography } from "antd";
const { Text } = Typography;

interface JsonRendererProps {
  data: any;
  indent?: number;
  isLast?: boolean;
}

const JsonRenderer: React.FC<JsonRendererProps> = ({
  data,
  indent = 0,
  isLast = true,
}) => {
  //spacing in the left for nested feilds
  const spacing = { paddingLeft: indent * 10 };

  //checks for array and recursively calls for inline element with comma
  if (Array.isArray(data)) {
    return (
      <span style={spacing}>
        <Text>[</Text>
        {data.map((item, index) => (
          <span key={index}>
            <JsonRenderer data={item} isLast={index === data.length - 1} />
            {!isLast && index !== data.length - 1 && <Text>,</Text>}
          </span>
        ))}
        <Text>]{!isLast && ","}</Text>
      </span>
    );
  }

  //checks for object and recursively calls with proper nesting and commas
  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data);
    return (
      <div style={spacing}>
        <Text>{"{"}</Text>
        {entries.map(([key, value], index) => (
          <div key={index} style={{ paddingLeft: (indent + 1) * 15 }}>
            <Text>"{key}":</Text>
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
  const formattedData = typeof data === "string" ? "data" : String(data);

  return (
    <Text>
      {formattedData}
      {isLast && ","}
    </Text>
  );
};

export default JsonRenderer