import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimension";
import TimeSelector from "./TimeSelector";
import SchemeViewer from "./SchemeViewer";
import BookingInfoCard from "./BookingInfoCard";
import BookingButton from "./BookingButton";
import BookingModal from "./BookingModal";
import PCmodal from "./PCmodal";
import { bookings, getRelevantSession } from "../../common/pcList";
import "./Projects.scss";
import SelectedPCList from "./SelectedPCList";

interface Session {
  sessionId: string;
  startTime: string; // ISO
  endTime: string; // ISO
  // добавьте другие свойства сессии, если они есть
}

interface PC {
  pcId: string;
  number: number;
  price: string | number;
  time?: string;
}

const MainPage = () => {
  const { isDesktop } = useWindowDimensions();

  const [currentPC, setCurrentPC] = useState<PC | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPCs, setSelectedPCs] = useState<PC[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | number | null
  >(null);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState<boolean>(false);
  const [selectedPCsessions, setSelectedPCsessions] = useState<Session[]>([]);
  const [relevantSession, setRelevantSession] = useState<Session | null>(null);

  const getPCsessions = (pcId: string | number): Session[] => {
    const pc = bookings.find((p) => p.pcId === pcId);
    return pc?.sessions || [];
  };

  const selectPc = (pc: PC): void => {
    const isSelected = selectedPCs.some((p) => p.number === pc.number);

    if (isSelected) {
      setSelectedPCs((pcs) => pcs.filter((p) => p.number !== pc.number));
      return;
    }

    if (selectedPCs.length >= 5) {
      alert("Нельзя купить больше 5 билетов");
      return;
    }

    const sessions = getPCsessions(pc.pcId);
    setRelevantSession(getRelevantSession(sessions));
    setSelectedPCsessions(sessions);
    setCurrentPC(pc);
    setIsSeatModalOpen(true);
  };

  return (
    <div className="projects-page">
      <h3 style={{ margin: 0 }}>Бронирование</h3>
      <div id="cardsWrapper">
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />

        <SchemeViewer
          selectedTime={selectedTime}
          selectedPCs={selectedPCs}
          selectPc={selectPc}
        />

        {isDesktop && (
          <BookingInfoCard
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            selectedPCs={selectedPCs}
          />
        )}
      </div>

      <SelectedPCList selectedPCs={selectedPCs} />

      <BookingButton
        selectedPCs={selectedPCs}
        setIsModalOpen={setIsModalOpen}
      />

      <BookingModal
        selectedPCs={selectedPCs}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedServiceId={setSelectedServiceId}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
        selectedServiceId={selectedServiceId}
      />

      <PCmodal
        selectedTime={selectedTime}
        setSelectedPCs={setSelectedPCs}
        currentPC={currentPC}
        selectedPCs={selectedPCs}
        isSeatModalOpen={isSeatModalOpen}
        setIsSeatModalOpen={setIsSeatModalOpen}
        relevantSession={relevantSession}
        selectedPCsessions={selectedPCsessions}
      />
    </div>
  );
};

export default MainPage;
