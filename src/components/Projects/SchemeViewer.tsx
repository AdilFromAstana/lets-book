import React, { useCallback, useEffect, useRef } from "react";
import { Card, Typography, Button } from "antd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { isMobile } from "react-device-detect";
import { newScheme, bookings } from "../../common/pcList";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface PC {
  pcId: string;
  number: number;
  price: string | number;
  time?: string;
}

interface Session {
  startTime: string;
  endTime: string;
  id?: string;
}

interface Booking {
  pcId: string | number;
  sessions?: Session[];
}

interface SchemeViewerProps {
  selectedTime: string | null;
  selectedPCs: PC[];
  selectPc: (pc: PC) => void;
}

const SchemeViewer: React.FC<SchemeViewerProps> = ({
  selectedTime,
  selectedPCs,
  selectPc,
}) => {
  const svgRef = useRef<HTMLDivElement>(null);

  const updatePcHtmlElement = useCallback(
    (element: HTMLElement) => {
      const pcNumber = element.getAttribute("pc-number");
      const pcId = element.getAttribute("pc-id");

      if (!pcNumber || !pcId) return;

      const isSelected = selectedPCs.find(
        (pc) => String(pc.number) === pcNumber
      );

      const iconPath = element.querySelector<SVGPathElement>(
        'path[pathtype="icon"]'
      );
      const isInverted =
        iconPath?.getAttribute("pathicontype") === "inverted-seat";

      const selectedFillValue = isInverted
        ? "url(#selectedInverted)"
        : "url(#selected)";

      if (isSelected && iconPath) {
        iconPath.setAttribute("fill", selectedFillValue);
      }

      if (selectedTime) {
        const pcBooking = bookings.find(
          (pc: Booking) => String(pc.pcId) === pcId
        );
        const isUnavailable = pcBooking?.sessions?.some((session: Session) => {
          try {
            const sessionStart = new Date(session.startTime);
            const sessionEnd = new Date(session.endTime);
            const selected = new Date(selectedTime);
            return selected < sessionEnd && selected > sessionStart;
          } catch {
            return false;
          }
        });

        if (!isMobile && !isUnavailable) {
          element.style.cursor = "pointer";
          element.onclick = () =>
            selectPc({
              number: Number(pcNumber),
              pcId: pcId,
              price: isSelected?.price || 0,
            });
        } else {
          element.onclick = null;
        }

        if (isUnavailable && iconPath) {
          const fillValue = isInverted ? "url(#takenInverted)" : "url(#taken)";
          iconPath.setAttribute("fill", fillValue);
        }
      }
    },
    [selectedPCs, selectedTime, selectPc]
  );

  const getScheme = useCallback(() => {
    if (!svgRef.current) return;

    // Clear existing content
    svgRef.current.innerHTML = "";

    try {
      const parsedScheme = new DOMParser().parseFromString(
        newScheme,
        "text/html"
      );
      const svgElement = parsedScheme
        .querySelector("svg")
        ?.cloneNode(true) as SVGElement | null;

      if (svgElement) {
        svgElement
          .querySelectorAll<HTMLElement>("[type='pc']")
          .forEach(updatePcHtmlElement);

        svgElement.style.width = "100%";
        svgElement.style.height = isMobile ? "max-content" : "500px";
        svgRef.current.appendChild(svgElement);
      }
    } catch (error) {
      console.error("Error parsing scheme:", error);
    }
  }, [updatePcHtmlElement]);

  useEffect(() => {
    getScheme();
  }, [getScheme]);

  return (
    <div className="space-class" style={{ height: "100%" }}>
      <Text style={{ fontSize: "1.25rem" }}>Схема зала</Text>
      <Card id="SelectSectorCompoment">
        {!selectedTime && (
          <div id="disableScheme">
            <h3 style={{ textAlign: "center" }}>
              Пожалуйста, выберите время для бронирования
            </h3>
          </div>
        )}
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <div className="SvgTools">
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => zoomIn()}
                  aria-label="Увеличить"
                />
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => zoomOut()}
                  aria-label="Уменьшить"
                />
              </div>
              <TransformComponent wrapperClass="SvgWrapper">
                <div ref={svgRef} className="svg-container" />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </Card>
    </div>
  );
};

export default React.memo(SchemeViewer);
