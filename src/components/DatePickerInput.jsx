import { useState, useRef, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePickerInput = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const defaultClassNames = getDefaultClassNames();

  // cerrar cuando haces click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* INPUT */}
      <input
        type="text"
        readOnly
        value={value ? new Date(value).toLocaleDateString() : ""}
        placeholder="Selecciona una fecha"
        onClick={() => setOpen(true)}
        className="w-full h-[44px] flex items-center gap-[6.5px] px-[16px] py-[10px] bg-[#F0F4F7] text-[#24667F] outline-none rounded-[16px]"
      />

      {/* CALENDARIO */}
      {open && (
        <div className="absolute left-0 z-10 bottom-full mb-2 md:top-full md:bottom-auto rounded-[16px] bg-white">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(selected) => {
              onChange(selected);
              setOpen(false);
            }}
            classNames={{
              root: `${defaultClassNames.root} shadow-lg p-5 rounded-[16px]`,
              day: "rounded-lg hover:bg-[#24667F]/10 hover:text-[#24667F]",
              day_selected: "bg-[#24667F] text-white rounded-lg",
              chevron: ` fill-[#24667F]`,
              selected: `bg-[#24667F] border-amber-500 text-white`,
              today: "text-[#24667F]",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
