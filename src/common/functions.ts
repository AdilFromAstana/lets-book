const has = Object.prototype.hasOwnProperty;

/**
 * Проверяет, является ли значение "пустым" (null, пустая строка, пустой объект и т.д.)
 */
export function isEmpty(val: unknown): boolean {
  if (val === undefined || val === null) return true;

  if (typeof val === "boolean") return false;

  if (typeof val === "string" || Array.isArray(val)) return val.length === 0;

  if (typeof val === "function") return val.length === 0;

  if (val instanceof Error) return val.message === "";

  if (typeof val === "object") {
    const tag = Object.prototype.toString.call(val);

    switch (tag) {
      case "[object File]":
      case "[object Map]":
      case "[object Set]":
        return (val as Map<any, any> | Set<any>).size === 0;

      case "[object Object]":
        for (const key in val) {
          if (has.call(val, key)) return false;
        }
        return true;

      default:
        return true;
    }
  }

  return false;
}

interface Service {
  isAlwaysAvailable: boolean;
  availableStartTime?: string; // "HH:MM"
  availableEndTime?: string; // "HH:MM"
  [key: string]: any; // другие поля
}

/**
 * Проверяет, доступна ли услуга в выбранное время
 */
export const getAvailableService = (
  selectedTime: string | Date,
  service: Service
): Service | null => {
  if (service.isAlwaysAvailable) return service;
  if (!service.availableStartTime || !service.availableEndTime) return null;

  const selectedDate = new Date(selectedTime);
  const selectedMinutes =
    selectedDate.getHours() * 60 + selectedDate.getMinutes();

  const [startH, startM] = service.availableStartTime.split(":").map(Number);
  const [endH, endM] = service.availableEndTime.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (startMinutes <= endMinutes) {
    return selectedMinutes >= startMinutes && selectedMinutes <= endMinutes
      ? service
      : null;
  } else {
    // ночной интервал
    return selectedMinutes >= startMinutes || selectedMinutes <= endMinutes
      ? service
      : null;
  }
};
