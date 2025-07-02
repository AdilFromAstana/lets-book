import { Button, Space } from "antd";

interface BookingButtonProps {
  selectedPCs: any[]; // замените `any` на конкретный тип, если известна структура
  setIsModalOpen: (open: boolean) => void;
}

const BookingButton = ({
  selectedPCs = [],
  setIsModalOpen,
}: BookingButtonProps) => (
  <Space
    direction="vertical"
    style={{
      width: "100%",
      paddingTop: "0.5rem",
      marginTop: "0.5rem",
      borderTop: "1px solid black",
    }}
  >
    <Button
      block
      type="primary"
      size="large"
      disabled={selectedPCs.length === 0}
      onClick={() => setIsModalOpen(true)}
    >
      Забронировать
    </Button>
  </Space>
);

export default BookingButton;
