import { List, Card, Tag, Typography, Button, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface Customer {
  name: string;
  phone: string;
}

type OrderStatus = "paid" | "cancelled" | "active";

interface Order {
  id: string | number;
  customer: Customer;
  selectedTime: string;
  totalPrice: number;
  status: OrderStatus;
}

const OrdersPageMobile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const saved = localStorage.getItem("orders");
      const savedOrders: Order[] = saved ? JSON.parse(saved) : [];
      setOrders(savedOrders);
      setLoading(false);
    }, 500);
  };

  const getStatusTag = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      paid: { color: "green", text: "Оплачен" },
      cancelled: { color: "red", text: "Отменен" },
      active: { color: "blue", text: "Активен" },
    };

    const config = statusConfig[status];

    if (!config) {
      return <Tag color="default">Неизвестно</Tag>;
    }

    return <Tag color={config.color}>{config.text}</Tag>;
  };

  return (
    <div style={{ padding: "16px" }}>
      <Title level={4} style={{ marginBottom: "24px" }}>
        Мои заказы
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "24px" }}>
          <Spin size="large" />
        </div>
      ) : orders.length === 0 ? (
        <Empty description="Нет заказов" />
      ) : (
        <List
          dataSource={orders}
          renderItem={(order) => (
            <Card
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              style={{
                marginBottom: "16px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <Text strong>Заказ #{order.id.toString().slice(-4)}</Text>
                {getStatusTag(order.status)}
              </div>

              <div style={{ marginBottom: "8px" }}>
                <UserOutlined style={{ marginRight: "8px" }} />
                <Text>
                  {order.customer.name} ({order.customer.phone})
                </Text>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <CalendarOutlined style={{ marginRight: "8px" }} />
                <Text>{dayjs(order.selectedTime).format("D MMMM, HH:mm")}</Text>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <DollarOutlined style={{ marginRight: "8px" }} />
                <Text strong>{order.totalPrice.toLocaleString()}₸</Text>
              </div>

              <div style={{ textAlign: "right" }}>
                <Button
                  type="text"
                  icon={<ArrowRightOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/orders/${order.id}`);
                  }}
                />
              </div>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default OrdersPageMobile;
