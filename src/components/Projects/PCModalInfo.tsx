import { Button, Collapse } from "antd";
import { formatTimeToText, getTimeLeftText } from "../../common/pcList";
import React from "react";

const { Panel } = Collapse;

interface PC {
  pcId: string;
  number: number;
  price: string | number;
  time?: string;
}

interface Session {
  startTime: string;
  endTime: string;
}

interface PCModalInfoProps {
  currentPC?: PC | null;
  relevantSession?: Session | null;
  unavailable: boolean;
  onNext: () => void;
}

const PCModalInfo: React.FC<PCModalInfoProps> = ({
  currentPC,
  relevantSession,
  unavailable,
  onNext,
}) => (
  <div style={{ overflowY: "auto", height: "100%", flex: 1 }}>
    <img
      src="https://www.restoplace.ws/organizations/cyberarena/963954e4651c722ada61/item/83864-0f4edf48388f62c32969.jpg"
      alt="ПК"
      style={{ width: "100%", height: "180px", objectFit: "cover" }}
    />

    <div
      style={{
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ fontSize: "16px" }}>
        {!relevantSession ? (
          <span style={{ color: "#38b000" }}>Свободно</span>
        ) : unavailable ? (
          <>
            <b>Занято до:</b> {formatTimeToText(relevantSession.endTime)}
          </>
        ) : (
          <>
            <b>Свободно до:</b> {formatTimeToText(relevantSession.startTime)} (
            {getTimeLeftText(relevantSession.startTime)})
          </>
        )}
      </div>

      {relevantSession && (
        <div style={{ fontSize: "14px", color: "#555" }}>
          Занят: {formatTimeToText(relevantSession.startTime)} —{" "}
          {formatTimeToText(relevantSession.endTime)}
        </div>
      )}

      <Collapse ghost defaultActiveKey={["1"]}>
        <Panel header="Характеристики ПК" key="1">
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Процессор: Intel Core i5-10400F</li>
            <li>Видеокарта: NVIDIA GeForce RTX 3060 12 Gb</li>
            <li>ОЗУ: 16 Gb DDR4</li>
            <li>Диск: SSD + HDD</li>
            <li>Клавиатура / мышь: ASUS</li>
            <li>Гарнитура: ASUS</li>
            <li>Кресло: Cougar</li>
            <li>Монитор: ASUS 27" 165Гц</li>
            <li>Интернет: &gt;100 Мбит</li>
          </ul>
        </Panel>
      </Collapse>

      <Button
        type="primary"
        block
        size="large"
        onClick={onNext}
        disabled={unavailable}
      >
        Забронировать →
      </Button>
    </div>
  </div>
);

export default PCModalInfo;
