import { Card, Typography, Divider, Button, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = () => {
    setLoading(true);
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = savedOrders.find((o) => o.id.toString() === id);

    setTimeout(() => {
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate("/orders");
      }
      setLoading(false);
    }, 300);
  };

  if (!order) return <div>Загрузка...</div>;

  const statusText = {
    paid: "Оплачен",
    cancelled: "Отменен",
    active: "Активен",
  };

  const statusColor = {
    paid: "green",
    cancelled: "red",
    active: "blue",
  };

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
