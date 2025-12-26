import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { useContext, useEffect } from "react";
import { ApplicationContext } from "./context";
import darkCrossIcon from "../assets/images/dark-close.svg";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  handleButtonClick,
}) {
  const {
    state: { selectedTheme },
  } = useContext(ApplicationContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full">
      <div className="absolute inset-0 bg-black/40 z-50 dark:bg-[#131313b3]"></div>
      <div className="w-107.5 shadow-lg bg-white flex  flex-col  z-100  p-4 space-y-4 rounded-lg dark:bg-neutral-dark-800 dark:border-[#004241]">
        <div className="flex items-center justify-between  px-4 py-2">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            {title}
          </h1>
          <button
            onClick={onClose}
            className="outline-0 border border-[#DDE9E7] rounded-lg p-2 cursor-pointer dark:bg-neutral-dark-800 dark:border-[#004241] "
          >
            {selectedTheme === "dark" ? (
              <img src={darkCrossIcon} className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4 text-black" />
            )}
          </button>
        </div>

        <div>{children}</div>

        <div className="flex justify-end items-center gap-3">
          <button
            className="outline-0 shadow-xs min-w-fit rounded-lg bg-transparent font-medium text-neutral-900 text-xs p-2  flex items-center justify-center border border-[#DDE9E7] px-3 cursor-pointer dark:border-neutral-dark-400 dark:bg-neutral-dark-800 dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={cn(
              "outline-0 bg-teal-700 shadow-xs min-w-fit rounded-lg  font-medium text-white text-xs p-2 flex items-center justify-center border border-[#DDE9E7] px-3 cursor-pointer  ",
              buttonText === "Delete Permanently" && "bg-[#CB0A04]"
            )}
            onClick={handleButtonClick}
            type="submit"
            form="bookmark-form"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
