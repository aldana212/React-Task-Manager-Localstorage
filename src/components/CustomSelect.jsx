import Select, { components } from "react-select";
import { useMobile } from "../hooks/useMobile";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props} className="w-[35px] h-[35px]">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M6 9L12 15L18 9"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </components.DropdownIndicator>
  );
};

const customStyles = {
  // 🔹 Input principal
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    border: "none",
    // borderColor: state.isFocused ? "#3b82f6" : "#64748b", // azul focus / gris normal
    boxShadow: "none",
    borderRadius: "16px",
    height: "44px",
    padding: "1px",
    backgroundColor: "#F0F4F7",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),

  // 🔹 Menú desplegable
  menu: (provided) => ({
    ...provided,
    border: "none",
    borderRadius: "16px",
    backgroundColor: "#F0F4F7",
    padding: "5px",
  }),

  // 🔹 Opciones
  option: (provided, state) => ({
    ...provided,
    borderRadius: "16px",
    backgroundColor: state.isSelected
      ? "#FFFFFF"
      : state.isFocused
        ? "#FFFFFF"
        : "transparent",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    color: state.isSelected ? "#526170" : "#526170",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: state.isSelected ? "600" : "400",
  }),

  // 🔹 Texto seleccionado
  singleValue: (provided) => ({
    ...provided,
    color: "#526170",
    fontSize: "14px", // tamaño
    fontWeight: "500",
  }),

  // 🔹 Placeholder
  placeholder: (provided) => ({
    ...provided,
    color: "#526170",
    fontSize: "14px", // tamaño
    fontWeight: "500",
  }),

  // 🔹 Input de búsqueda
  input: (provided) => ({
    ...provided,
    color: "#526170",
    fontSize: "14px", // tamaño
    fontWeight: "500",
  }),
};

const CustomSelect = ({ options, value, onChange }) => {
  const { isMobile } = useMobile();

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      styles={customStyles}
      placeholder="Select..."
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      menuPlacement={isMobile ? "top" : "bottom"}
    />
  );
};

export default CustomSelect;
