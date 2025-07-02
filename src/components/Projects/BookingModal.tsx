import { Button, Modal, Typography, Form, Input, Steps, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Text } = Typography;
const { Step } = Steps;

interface PC {
  pcId: string;
  number: number;
  price: string | number;
  time?: string;
}

interface OrderData {
  id: number;
  customer: {
    name: string;
    phone: string;
  };
  selectedTime: string;
  computers: PC[];
  totalPrice: number;
  date: string;
  status: string;
}

interface BookingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedPCs: PC[];
  selectedTime: string | null; // Изменено на string | null
  setSelectedServiceId?: (id: string | number | null) => void; // Добавлено, так как вы передаете этот проп
  setSelectedTime?: (time: string | null) => void; // Добавлено, так как вы передаете этот проп
  selectedServiceId?: string | number | null; // Добавлено, так как вы передаете этот проп
}

const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedPCs,
  selectedTime,
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const totalPrice = selectedPCs.reduce((sum, pc) => sum + Number(pc.price), 0);

  const handleNext = () => {
    setCurrentStep(1);
  };

  const saveOrderToLocalStorage = (orderData: OrderData) => {
    const existingOrders: OrderData[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    const updatedOrders = [...existingOrders, orderData];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Формируем данные заказа
      const orderData: OrderData = {
        id: Date.now(),
        customer: {
          name: values.name,
          phone: values.phone,
        },
        selectedTime: selectedTime || "", // или какое-то значение по умолчанию
        computers: selectedPCs,
        totalPrice,
        date: new Date().toISOString(),
        status: "active",
      };

      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Сохраняем в localStorage
      saveOrderToLocalStorage(orderData);

      // Показываем уведомление об успехе
      message.success("Бронирование успешно завершено!");

      // Закрываем модалку и сбрасываем состояние
      setIsModalOpen(false);
      setCurrentStep(0);
      form.resetFields();
      navigator(`/orders/${orderData.id}`);
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Произошла ошибка при бронировании");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Детали брони",
      content: (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: "16px" }}>Время сеанса:</div>
            <div style={{ fontSize: "16px" }}>
              {dayjs(selectedTime)?.format("D MMMM, HH:mm")}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "16px" }}>Ваши места:</div>
            <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
              {selectedPCs.map((selectedPC) => (
                <div
                  key={selectedPC.number}
                  style={{
                    borderRadius: 8,
                    background: "#F3F5F6",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "200px",
                    flexShrink: 0,
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
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
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
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                      {selectedPC.time}
                    </div>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                      {selectedPC.price}₸
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            <Text strong>Итого:</Text>
            <Text strong>{totalPrice.toLocaleString()}₸</Text>
          </div>

          <Button type="primary" onClick={handleNext} block>
            К оплате
          </Button>
        </>
      ),
    },
    {
      title: "Контактные данные",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Ваше имя"
            rules={[
              { required: true, message: "Пожалуйста, введите ваше имя" },
            ]}
          >
            <Input placeholder="Иван Иванов" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              { required: true, message: "Пожалуйста, введите номер телефона" },
              {
                pattern: /^(\+7|8)[0-9]{10}$/,
                message:
                  "Введите казахстанский номер (+7XXXXXXXXXX или 8XXXXXXXXXX)",
              },
            ]}
          >
            <Input placeholder="+7XXXXXXXXXX" />
          </Form.Item>

          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={() => setCurrentStep(0)} style={{ flex: 1 }}>
              Назад
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{ flex: 1 }}
            >
              Подтвердить
            </Button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      maskClosable={false}
      open={isModalOpen}
      title="Информация о бронировании"
      onCancel={() => {
        setIsModalOpen(false);
        setCurrentStep(0);
        form.resetFields();
      }}
      style={{ top: 24 }}
      styles={{
        body: {
          maxHeight: "90svh",
          padding: 0,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        },
      }}
      footer={null}
    >
      <Steps current={currentStep} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div>{steps[currentStep].content}</div>
    </Modal>
  );
};

export default BookingModal;
