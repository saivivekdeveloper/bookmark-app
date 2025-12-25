import React, { useEffect, useRef } from "react";

function Dropdown({ onClose, isOpen, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 top-9 w-56 rounded-lg bg-white  border border-[#e8f0ef] z-50 p-2 shadow-[0 6px 14px 0 rgba(34, 38, 39, 0.1)]"
      ref={ref}
    >
      {" "}
      {children}
    </div>
  );
}

export default Dropdown;
