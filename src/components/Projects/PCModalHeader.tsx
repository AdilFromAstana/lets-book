import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

interface PCModalHeaderProps {
  number?: number | string; // Сделал опциональным и добавил string для случая "—"
  onClose: () => void;
}

const PCModalHeader: React.FC<PCModalHeaderProps> = ({ number, onClose }) => (
  <div
    style={{
      backgroundColor: "#38b000",
      color: "white",
      padding: "10px 16px",
      fontSize: "18px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span>КОМПЬЮТЕР №{number ?? "—"}</span>
    <Button
      type="text"
      icon={<CloseOutlined style={{ color: "white" }} />}
      onClick={onClose}
    />
  </div>
);

export default PCModalHeader;
