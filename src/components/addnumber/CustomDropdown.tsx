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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Gọi hàm onSelect để xử lý lựa chọn
  };

  // Thêm logic để xử lý di chuyển lên/xuống
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, options.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.max(prev - 1, 0)
      );
    } else if (event.key === "Enter" && highlightedIndex !== null) {
      handleSelectOption(options[highlightedIndex]);
    }
  };

  // Đóng dropdown nếu nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="custom-dropdown"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="dropdown-header" onClick={handleToggleDropdown}>
        {selectedOption || placeholder}{" "}
        {/* Display 'Chọn dịch vụ' when no option is selected */}
        <span
          className="dropdown-arrow open"
          style={{ backgroundImage: "url(/img/Vector.png)" }}
        ></span>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-list-item ${
                highlightedIndex === index ? "highlighted" : ""
              }`}
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
