import { Button, Divider, Space } from "antd";
import React from "react";

interface Package {
  time: string;
  price: number;
  durationHours?: number;
  availableFrom?: string;
  availableTo?: string;
  // Добавьте другие свойства пакета, если они используются
}

interface PCModalPackagesProps {
  packages: Package[];
  onBack: () => void;
  selectPc: (kit: Package) => void;
}

const PCModalPackages: React.FC<PCModalPackagesProps> = ({
  packages,
  onBack,
  selectPc,
}) => {
  return (
    <div
      style={{
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ fontSize: "20px", marginBottom: "1rem" }}>
        <b>Выберите пакет</b>
      </div>

      <Space direction="vertical" style={{ width: "100%" }}>
        {packages.map((kit) => (
          <Button
            block
            key={kit.time}
            onClick={() => selectPc(kit)}
            style={{ height: "auto", whiteSpace: "normal" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{kit.time}</span>
              <span>
                <b>{kit.price}₸</b>
              </span>
            </div>
          </Button>
        ))}
      </Space>

      <Divider />
      <Button type="default" block onClick={onBack}>
        Назад
      </Button>
    </div>
  );
};

export default PCModalPackages;
