import React, { useState } from "react";
import { Input, Select, Button, Space, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

type FieldType = "String" | "Number" | "Nested";
type SchemaValue = FieldType | SchemaObject;
type SchemaObject = { [key: string]: SchemaValue };

interface StructureBuilderProps {
  data: SchemaObject;
  onChange: (data: SchemaObject) => void;
}

const getType = (val: SchemaValue): FieldType =>
  typeof val === "object" && val !== null ? "Nested" : (val as FieldType);

const StructureBuilder: React.FC<StructureBuilderProps> = ({ data, onChange }) => {
  const [editingKeys, setEditingKeys] = useState<{ [path: string]: string }>({});

  function renameField(path: string[], newKey: string) {
    const pathKey = path.join(".");
    setEditingKeys(prev => ({ ...prev, [pathKey]: newKey }));

    const oldKey = path[path.length - 1];
    if (newKey === oldKey || !newKey) return;

    const cloned = JSON.parse(JSON.stringify(data));
    let obj = cloned;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];

    const val = obj[oldKey];
    delete obj[oldKey];
    obj[newKey] = val;

    setEditingKeys(prev => {
      const updated = { ...prev };
      delete updated[pathKey];
      return updated;
    });

    onChange(cloned);
  }

  function changeType(path: string[], newType: FieldType) {
    const cloned = JSON.parse(JSON.stringify(data));
    let obj = cloned;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    const key = path[path.length - 1];
    obj[key] = newType === "Nested" ? {} : newType;
    onChange(cloned);
  }

  function addField(path: string[]) {
    const cloned = JSON.parse(JSON.stringify(data));
    let obj = cloned;
    for (let i = 0; i < path.length; i++) obj = obj[path[i]];
    obj[``] = "String";
    onChange(cloned);
  }

  function removeField(path: string[]) {
    const cloned = JSON.parse(JSON.stringify(data));
    let obj = cloned;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    delete obj[path[path.length - 1]];
    onChange(cloned);
  }

  function render(obj: SchemaObject, path: string[] = []) {
    return Object.entries(obj).map(([key, val]) => {
      const t = getType(val);
      const curPath = [...path, key];
      const pathKey = curPath.join(".");

      return (
        <Card
          size="small"
          key={pathKey}
          style={{ marginBottom: 10, marginLeft: path.length * 20 }}
        >
          <Space>
            <Input
              value={editingKeys[pathKey] ?? key}
              onChange={(e) =>
                setEditingKeys(prev => ({ ...prev, [pathKey]: e.target.value }))
              }
              onBlur={() => renameField(curPath, editingKeys[pathKey] ?? key)}
              style={{ width: 150 }}
            />
            <Select
              value={t}
              onChange={(v) => changeType(curPath, v as FieldType)}
              style={{ width: 110 }}
            >
              <Option value="String">String</Option>
              <Option value="Number">Number</Option>
              <Option value="Nested">Nested</Option>
            </Select>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeField(curPath)}
            />
          </Space>
          {t === "Nested" && (
            <div style={{ marginTop: 10 }}>
              {render(val as SchemaObject, curPath)}
              <Button
                icon={<PlusOutlined />}
                size="small"
                style={{ marginTop: 8 }}
                onClick={() => addField(curPath)}
              >
                Add Nested Field
              </Button>
            </div>
          )}
        </Card>
      );
    });
  }

  function addRoot() {
    const cloned = { ...data, [``]: "String" };
    onChange(cloned);
  }

  return (
    <div>
      {render(data)}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addRoot}
        style={{ marginTop: 12 }}
      >
        Add Field
      </Button>
    </div>
  );
};

export default StructureBuilder;
