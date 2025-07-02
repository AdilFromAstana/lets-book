import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SelectedPCList = ({ selectedPCs = [] }: { selectedPCs: any[] }) => {
  return (
    <div
      className="space-class"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Text style={{ fontSize: "1.25rem" }}>Выбранные ПК</Text>
      <div style={{ overflowX: "auto", display: "flex", gap: 20 }}>
        {selectedPCs.map((selectedPC) => (
          <div
            key={selectedPC.number} // Добавлен ключ для оптимизации
            style={{
              borderRadius: 8,
              background: "#F3F5F6",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              minWidth: "200px", // Минимальная ширина карточки
              flexShrink: 0, // Запрет сжатия
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Компьютер №{selectedPC.number}
              </div>
              <Button
                icon={<CloseOutlined />}
                type="text"
                style={{ flexShrink: 0 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {selectedPC.time}
              </div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {selectedPC.price}₸
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedPCList;
