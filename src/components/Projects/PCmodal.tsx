import { Modal } from "antd";
import { useEffect, useState } from "react";
import { packages, isTimeInRange } from "../../common/pcList";
import PCModalHeader from "./PCModalHeader";
import PCModalInfo from "./PCModalInfo";
import PCModalPackages from "./PCModalPackages";
import dayjs from "dayjs";
import "dayjs/locale/ru";

interface PC {
  pcId: string;
  number: number;
  price: string | number;
  time?: string;
}

interface Session {
  startTime: string;
  endTime: string;
  // добавьте другие свойства сессии, если они есть
}

interface SelectedKit {
  // определите структуру selectedKit в зависимости от того, что добавляется к currentPC
  [key: string]: any;
}

interface PCmodalProps {
  selectedTime: string | null;
  currentPC: PC | null;
  isSeatModalOpen: boolean;
  setIsSeatModalOpen: (isOpen: boolean) => void;
  relevantSession: Session | null;
  selectedPCsessions: Session[];
  setSelectedPCs: React.Dispatch<React.SetStateAction<PC[]>>;
  selectedPCs: PC[];
}

const PCmodal: React.FC<PCmodalProps> = ({
  selectedTime,
  currentPC,
  isSeatModalOpen,
  setIsSeatModalOpen,
  relevantSession,
  selectedPCsessions,
  setSelectedPCs,
  selectedPCs,
}) => {
  const [step, setStep] = useState<number>(1);
  const selected = dayjs(selectedTime);
  const unavailable = relevantSession
    ? new Date() >= new Date(relevantSession.startTime)
    : false;

  const availablePackages = packages.filter((pkg) =>
    selectedTime
      ? isTimeInRange(selectedTime, pkg.availableFrom, pkg.availableTo)
      : true
  );

  const selectPc = (selectedKit: SelectedKit) => {
    if (!currentPC) return;

    setSelectedPCs((selectePCs) => [
      ...selectePCs,
      { ...currentPC, ...selectedKit },
    ]);
    setIsSeatModalOpen(false);
    setStep(1);
  };

  const closeModal = () => {
    setIsSeatModalOpen(false);
    setStep(1);
  };

  useEffect(() => {
    document.body.style.overflow = isSeatModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSeatModalOpen]);

  return (
    <Modal
      style={{ top: 24 }}
      styles={{
        content: { padding: 0 },
        body: {
          maxHeight: "90svh",
          padding: 0,
          backgroundColor: "#e6fff0",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        },
      }}
      closeIcon={null}
      maskClosable={false}
      open={isSeatModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <PCModalHeader number={currentPC?.number} onClose={closeModal} />
      {selectedTime && (
        <div
          style={{
            backgroundColor: "#d9fcd6",
            border: "1px solid #b2e6a6",
            borderRadius: "8px",
            padding: "10px 14px",
            margin: 10,
            fontSize: "14px",
            color: "#333",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "4px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Выбранное время:</div>
            <div>{selected.format("D MMMM, HH:mm")}</div>
          </div>
        </div>
      )}
      {step === 1 ? (
        <PCModalInfo
          currentPC={currentPC}
          relevantSession={relevantSession}
          unavailable={unavailable}
          onNext={() => setStep(2)}
        />
      ) : (
        <PCModalPackages
          selectPc={selectPc}
          packages={availablePackages}
          onBack={() => setStep(1)}
        />
      )}
    </Modal>
  );
};

export default PCmodal;
