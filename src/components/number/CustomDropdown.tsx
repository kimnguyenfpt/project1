import React, { useState, useRef, useEffect } from "react";
import "./CustomDropdown.css";

interface CustomDropdownProps {
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Gọi hàm onSelect để xử lý lựa chọn
  };

  // Đóng dropdown nếu nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="number-dropdown-header" onClick={handleToggleDropdown}>
        {selectedOption || placeholder}
        <span className={`number-dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="number-dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="number-dropdown-list-item"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
