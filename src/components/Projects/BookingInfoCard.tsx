import { useMemo } from "react";
import { Card, Select, Typography } from "antd";
import { generateTimeDropdown, services } from "../../common/pcList";
import { getAvailableService } from "../../common/functions";

const { Title } = Typography;

interface PC {
  number: number;
  // добавьте другие свойства ПК, если они есть
}

// interface Service {
//   id: string | number;
//   title: string;
//   price: string;
//   isAlwaysAvailable: boolean;
//   availableStartTime?: string;
//   availableEndTime?: string;
// }

interface BookingInfoCardProps {
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  selectedServiceId: string | number | null;
  setSelectedServiceId: (id: string | number | null) => void;
  selectedPCs: PC[];
}

const BookingInfoCard: React.FC<BookingInfoCardProps> = ({
  selectedTime,
  setSelectedTime,
  selectedServiceId,
  setSelectedServiceId,
  selectedPCs,
}) => {
  const serviceOptions = useMemo(() => {
    if (!selectedTime) return [];

    return services
      .filter(
        (service) =>
          service.isAlwaysAvailable ||
          (service.availableStartTime &&
            service.availableEndTime &&
            getAvailableService(selectedTime, service))
      )
      .map((service) => ({
        label: `${service.title} - ${service.price}`,
        value: service.id,
      }));
  }, [selectedTime]);

  const selectService = (serviceId: string | number | null) => {
    setSelectedServiceId(serviceId);
  };

  return (
    <Card id="infoCard">
      <Title level={2}>Информация о бронировании</Title>
      <div>
        <Title level={4}>Дата бронирования</Title>
        <Select
          size="large"
          onChange={setSelectedTime}
          onClear={() => setSelectedTime(null)}
          value={selectedTime}
          allowClear
          style={{ width: "100%" }}
          options={generateTimeDropdown()}
          placeholder="Выберите время"
        />
      </div>
      <div>
        <Title level={4}>Доступные пакеты</Title>
        <Select
          disabled={!selectedTime}
          size="large"
          value={selectedServiceId}
          onChange={selectService}
          options={serviceOptions}
          style={{ width: "100%" }}
          allowClear
          placeholder="Выберите пакет"
        />
      </div>
      <div>
        <Title level={4}>Выбранные ПК</Title>
        <div>
          {selectedPCs.length === 0 ? (
            <div>Пусто</div>
          ) : (
            selectedPCs.map((pc) => (
              <div key={pc.number}>Номер: {pc.number}</div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookingInfoCard;
