import { useState } from "react";
import { Input, Modal, Collapse, Button } from "antd";
import dayjs from "dayjs";

const { Panel } = Collapse;

interface TimeSelectorProps {
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const generateMinutes = (
  hour: number,
  isCurrentHour: boolean = false
): string[] => {
  // Для текущего часа начинаем с ближайших 10-минутных интервалов
  if (isCurrentHour) {
    const now = dayjs();
    const currentMinutes = now.minute();
    const startFrom = Math.ceil(currentMinutes / 10) * 10; // Округляем вверх до 10 минут

    return Array.from({ length: 6 - Math.floor(startFrom / 10) }, (_, i) => {
      const minutes = startFrom + i * 10;
      if (minutes >= 60) return null; // Пропускаем, если вышли за границы часа
      return `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }).filter((time): time is string => time !== null); // Фильтруем null значения
  }

  // Для остальных часов генерируем все 10-минутные интервалы
  return Array.from({ length: 6 }, (_, i) => {
    const minutes = i * 10;
    return `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  });
};

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  setSelectedTime,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const now = dayjs();
  const currentHour = now.hour(); // Всегда берем текущий час

  // Генерируем часы, начиная с текущего
  const hours = Array.from(
    { length: 24 - currentHour },
    (_, i) => currentHour + i
  );

  const handleSelect = (timeStr: string) => {
    const selectedDate = dayjs(selectedTime || new Date());
    const [h, m] = timeStr.split(":");
    const updated = selectedDate.hour(Number(h)).minute(Number(m)).second(0);
    setSelectedTime(updated.toISOString());
    setModalOpen(false);
  };

  const formattedTime = selectedTime ? dayjs(selectedTime).format("HH:mm") : "";

  return (
    <>
      <Input
        size="large"
        value={formattedTime}
        onClick={() => setModalOpen(true)}
        placeholder="Выберите время"
        readOnly
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title="Выберите время"
        style={{ top: 24 }}
        styles={{
          body: {
            maxHeight: "70svh",
            overflowY: "auto",
          },
        }}
        maskClosable={false}
        footer={null}
      >
        <Collapse accordion>
          {hours.map((hour, index) => (
            <Panel header={`${hour.toString().padStart(2, "0")}:00`} key={hour}>
              <div
                style={{
                  display: "grid",
                  flexWrap: "wrap",
                  gap: 8,
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                {generateMinutes(hour, index === 0).map((time) => (
                  <Button
                    key={time}
                    onClick={() => handleSelect(time)}
                    size="small"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      </Modal>
    </>
  );
};

export default TimeSelector;
