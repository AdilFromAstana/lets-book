import { Card, Typography, Divider, Button, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

// Определяем типы для данных заказа
type Computer = {
  number: string;
  price: number;
  time: string;
};

type OrderStatus = "paid" | "cancelled" | "active";

type Order = {
  id: number;
  status: OrderStatus;
  selectedTime: string | Date;
  totalPrice: number;
  computers: Computer[];
};

const statusText: Record<OrderStatus, string> = {
  paid: "Оплачен",
  cancelled: "Отменен",
  active: "Активен",
};

const statusColor: Record<OrderStatus, string> = {
  paid: "green",
  cancelled: "red",
  active: "blue",
};

const isOrderArray = (data: unknown): data is Order[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === "number" &&
        ["paid", "cancelled", "active"].includes(item.status) &&
        typeof item.totalPrice === "number" &&
        Array.isArray(item.computers)
    )
  );
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadOrder = () => {
    setLoading(true);
    try {
      const ordersData = localStorage.getItem("orders");
      const parsedData = ordersData ? JSON.parse(ordersData) : [];
      const savedOrders: Order[] = isOrderArray(parsedData) ? parsedData : [];
      const foundOrder = savedOrders.find((o) => o.id.toString() === id);

      setTimeout(() => {
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          navigate("/orders");
        }
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error("Failed to load order", error);
      setLoading(false);
      navigate("/orders");
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/orders");
      return;
    }
    loadOrder();
  }, [id]);

  if (!order) return <div>Загрузка...</div>;

  return (
    <div
      style={{
        padding: 16,
        margin: "0 auto",
        width: "95vw",
      }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/orders")}
        style={{ marginBottom: 16 }}
      >
        Назад
      </Button>

      <Card
        loading={loading}
        title={`Заказ #${id.toString().slice(-4)}`}
        style={{ borderRadius: 8 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text strong>Статус:</Text>
          <Tag color={statusColor[order.status]}>
            {statusText[order.status]}
          </Tag>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text strong>Дата:</Text>
          <Text>{dayjs(order.selectedTime)?.format("D MMMM, HH:mm")}</Text>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text strong>Сумма:</Text>
          <Text strong>{order.totalPrice.toLocaleString()}₸</Text>
        </div>

        <Divider orientation="left" style={{ marginTop: 24 }}>
          Компьютеры
        </Divider>

        {order.computers.map((pc, index) => (
          <Card
            key={index}
            size="small"
            style={{
              marginBottom: 12,
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>№{pc.number}</Text>
              <Text>{pc.price}₸</Text>
            </div>
            <Text type="secondary">{pc.time}</Text>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default OrderDetailPage;
