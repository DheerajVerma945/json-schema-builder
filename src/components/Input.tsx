import React, { useState, useEffect } from "react";
import { Input, Select, Button, Space, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

type FieldType = "String" | "Number" | "Nested";

interface Field {
  key: string;
  type: FieldType;
  children?: Field[];
}

interface Props {
  data: Field[];
  onChange: (fields: Field[]) => void;
}

const StructureBuilder: React.FC<Props> = ({ data, onChange }) => {
  const [fields, setFields] = useState<Field[]>(data);

  useEffect(() => {
    setFields(data);
  }, [data]);

  const update = (updatedFields: Field[]) => {
    setFields(updatedFields);
    onChange(updatedFields);
  };

  const handleFieldChange = (
    path: number[],
    key: keyof Field,
    value: any
  ) => {
    const newFields = JSON.parse(JSON.stringify(fields)); // Deep clone
    let current: any = newFields;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }

    const field = current[path[path.length - 1]];
    field[key] = value;

    // handle nested type switch
    if (key === "type") {
      if (value === "Nested") {
        field.children = field.children || [];
      } else {
        delete field.children;
      }
    }

    update(newFields);
  };

  const handleAddField = (path: number[]) => {
    const newFields = JSON.parse(JSON.stringify(fields));
    let current: any = newFields;
    for (const idx of path) {
      current = current[idx].children;
    }

    current.push({ key: "", type: "String" });
    update(newFields);
  };

  const handleDelete = (path: number[]) => {
    const newFields = JSON.parse(JSON.stringify(fields));
    if (path.length === 1) {
      newFields.splice(path[0], 1);
    } else {
      let current: any = newFields;
      for (let i = 0; i < path.length - 2; i++) {
        current = current[path[i]].children;
      }
      const parent = current[path[path.length - 2]];
      parent.children.splice(path[path.length - 1], 1);
    }
    update(newFields);
  };

  const renderFields = (list: Field[], path: number[] = []) =>
    list.map((field, idx) => {
      const currentPath = [...path, idx];
      return (
        <Card
          key={currentPath.join("-")}
          size="small"
          style={{ marginBottom: 12, marginLeft: path.length * 20 }}
        >
          <Space>
            <Input
              placeholder="Key"
              value={field.key}
              onChange={(e) =>
                handleFieldChange(currentPath, "key", e.target.value)
              }
              style={{ width: 150 }}
            />
            <Select
              value={field.type}
              onChange={(val) => handleFieldChange(currentPath, "type", val)}
              style={{ width: 120 }}
            >
              <Option value="String">String</Option>
              <Option value="Number">Number</Option>
              <Option value="Nested">Nested</Option>
            </Select>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(currentPath)}
            />
          </Space>

          {field.type === "Nested" && (
            <div style={{ marginTop: 12 }}>
              {renderFields(field.children || [], currentPath)}
              <Button
                icon={<PlusOutlined />}
                size="small"
                onClick={() => handleAddField(currentPath)}
                style={{ marginTop: 8 }}
              >
                Add Nested Field
              </Button>
            </div>
          )}
        </Card>
      );
    });

  return (
    <div>
      {renderFields(fields)}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => update([...fields, { key: "", type: "String" }])}
        style={{ marginTop: 12 }}
      >
        Add Field
      </Button>
    </div>
  );
};

export default StructureBuilder;
