import { Card, Typography, List, Divider, Button } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const features = [
  "Изолированные VIP‑кабины (1–6 игроков)",
  "Консольная зона с PlayStation 5",
  "380 Hz мониторы и RTX 4070+ видеокарты",
  "Премиум гарнитура и кресла DXRacer",
  "Турниры, стримы и зона отдыха",
];

const tariffs = [
  { name: "1 час solo", time: "09:00–24:00", price: "1 800 ₸" },
  { name: "3 часа duo", time: "09:00–17:00", price: "5 000 ₸" },
  { name: "Пакет Night", time: "22:00–08:00", price: "от 8 000 ₸" },
];

const Home = () => {
  const nav = useNavigate();
  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 24,
        }}
      >
        <img
          width="200"
          src="https://sun9-46.userapi.com/s/v1/ig2/r_UmBsmbIfbUMAmacHKgIILfhUZiifru5DK7Hq_xhzzTA20Ah7L3V3AnoCNHwmVVmhXqbEJ7xYV7sPoaPcjhMZ2r.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,280x280&from=bu&cs=280x0"
          alt="banner"
          style={{
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 0 25px 10px rgba(255, 215, 0, 0.7)",
          }}
        />
      </div>

      <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
        <Title level={2} style={{ color: "#fff" }}>
          🎮 CYBER CLUB — компьютерный клуб нового поколения
        </Title>

        <Paragraph style={{ color: "#ccc" }}>
          Комфортные VIP‑кабины, мощнейшие ПК и круглосуточная доступность.
          Создано для геймеров, команд, стримеров и всех, кто ценит качество и
          атмосферу.
        </Paragraph>

        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#fadb14",
            borderColor: "#fadb14",
            color: "#000",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#ffe58f";
            e.currentTarget.style.borderColor = "#ffe58f";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#fadb14";
            e.currentTarget.style.borderColor = "#fadb14";
          }}
          onClick={() => nav("/book")}
        >
          Забронировать
        </Button>

        <Divider style={{ borderColor: "#333" }} />

        <Title level={4} style={{ color: "#fff" }}>
          💡 Наши преимущества
        </Title>
        <List
          dataSource={features}
          renderItem={(item) => (
            <List.Item style={{ color: "#ddd" }}>
              <CheckCircleOutlined
                style={{ color: "#fadb14", marginRight: 8 }}
              />
              {item}
            </List.Item>
          )}
        />

        <Divider style={{ borderColor: "#333" }} />

        <Title level={4} style={{ color: "#fff" }}>
          📅 Тарифы
        </Title>
        <List
          bordered
          dataSource={tariffs}
          renderItem={({ name, time, price }) => (
            <List.Item
              style={{
                backgroundColor: "#141414",
                color: "#eee",
                borderColor: "#333",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{name}</span>
              <span style={{ opacity: 0.7 }}>{time}</span>
              <strong>{price}</strong>
            </List.Item>
          )}
        />

        <Divider style={{ borderColor: "#333" }} />

        <Title level={4} style={{ color: "#fff" }}>
          📍 Где мы находимся
        </Title>
        <Paragraph style={{ color: "#ccc" }}>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          Астана, пр. Кабанбай Батыра, 56
        </Paragraph>
        <Paragraph style={{ color: "#ccc" }}>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Работаем 24/7 — без выходных
        </Paragraph>
        <Paragraph style={{ color: "#ccc" }}>📞 +7 775 260 85 59</Paragraph>

        <Divider style={{ borderColor: "#333" }} />

        <Card
          style={{
            background: "#2a2a2a",
            border: "1px solid #ffd666",
            borderRadius: 12,
            textAlign: "center",
            color: "white",
          }}
        >
          <Title level={4} style={{ color: "white" }}>
            Готовы к игре?
          </Title>
          <Paragraph style={{ color: "#ccc" }}>
            Забронируйте кабину онлайн и наслаждайтесь игрой без ожидания.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#fadb14",
              borderColor: "#fadb14",
              color: "#000",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
            onClick={() => nav("/book")}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ffe58f";
              e.currentTarget.style.borderColor = "#ffe58f";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#fadb14";
              e.currentTarget.style.borderColor = "#fadb14";
            }}
          >
            Забронировать
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Home;
