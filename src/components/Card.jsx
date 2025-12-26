import React, { useContext, useState } from "react";
import HamburgerIcon from "../assets/images/icon-menu-hamburger.svg";
import PinIcon from "../assets/images/icon-pin.svg";
import visitCountIcon from "../assets/images/icon-visit-count.svg";
import createdIcon from "../assets/images/icon-created.svg";
import lastVistedIcon from "../assets/images/icon-last-visited.svg";
import { ApplicationContext } from "./context";
import IconVisit from "../assets/images/icon-visit.svg";
import CopyIcon from "../assets/images/icon-copy.svg";
import pinIcon from "../assets/images/icon-pin.svg";
import unpinIcon from "../assets/images/icon-unpin.svg";
import ArchiveIcon from "../assets/images/icon-archive.svg";
import UnArchiveIcon from "../assets/images/icon-unarchive.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import Dropdown from "./Dropdown";
import iconMenuBookmark from "../assets/images/icon-menu-bookmark.svg";
import { cn } from "../lib/utils";
import { toast } from "react-toastify";
import Modal from "./Modal";
import DarkCalenderIcon from '../assets/images/calendar.svg'
import DarkClockIcon from '../assets/images/clock.svg'
import DarKEyeIcon from '../assets/images/eye.svg'
import darkVerticalIcon from '../assets/images/dots-vertical.svg'

import darkVisitIcon from '../assets/images/navigate.svg'
import darkCopyIcon from "../assets/images/copy.svg"
import darkPinIcon from '../assets/images/pin.svg'
import darkUnPinIcon from '../assets/images/unpin.svg'
import darkEditIcon from '../assets/images/edit.svg'
import darkArchiveIcon from '../assets/images/archive.svg'
import darkunArchiveIcon from '../assets/images/refresh.svg'
import darkDeleteIcon from '../assets/images/delete.svg'



function Card({ cardData, onEdit, onArchive, onDelete }) {
  const [open, setOpen] = useState(false);
  const {
    id,
    title,
    url,
    favicon,
    description,
    tags,
    pinned,
    lastVisited,
    visitCount,
    createdAt,
    isArchived,
  } = cardData;

  const [, pathName] = url.split("//");

  const [itemSelected, setItemSelected] = useState("");
  const {
    state: { isActiveSidebar, data,selectedTheme },
    setState,
  } = useContext(ApplicationContext);

  const itemsModalDropdownItems = [
    {
      id: 1,
      name: "Visit",
      icon: IconVisit,
      darkIcon:darkVisitIcon
    },

    {
      id: 2,
      name: "Copy URL",
      icon: CopyIcon,
      darkIcon:darkCopyIcon
    },

    {
      id: 3,
      name: pinned ? "Unpin" : "pin",
      icon: pinned ? unpinIcon : pinIcon,
      darkIcon:pinned?darkUnPinIcon:darkPinIcon
    },

    {
      id: 4,
      name: "Edit",
      icon: EditIcon,
      darkIcon:darkEditIcon
    },
    {
      id: 5,
      name: "Archive",
      icon:  ArchiveIcon,
      darkIcon:darkArchiveIcon
    },
  ];

  const isArchivedModalDropdownItems = [
    {
      id: 1,
      name: "Visit",
      icon: IconVisit,
       darkIcon:darkVisitIcon
    },

    {
      id: 2,
      name: "Copy URL",
      icon: CopyIcon,
       darkIcon:darkCopyIcon
    },
    {
      id: 3,
      name: "Unarchive",
      icon: UnArchiveIcon,
      darkIcon:darkunArchiveIcon
    },
    {
      id: 4,
      name: "Delete Permanently",
      icon: deleteIcon,
      darkIcon:darkDeleteIcon
    },
  ];

  function formatDate(bndDate) {
    const date = new Date(bndDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formatted = `${date.getDate()} ${months[date.getMonth()]}`;
    return formatted;
  }

  const options = isArchived
    ? isArchivedModalDropdownItems
    : itemsModalDropdownItems;

  function handleSelected(item) {
    setItemSelected(item);
  }

  function handleCopyUrl() {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Copied the url"))
      .catch((err) => toast.error("Failed to copy", err));
  }

  function handleDropdown(item) {
    if (item === "Visit") window.open(url, "_blank", "noopener,noreferrer");
    if (item === "Copy URL") handleCopyUrl();
    if (item === "pin" || item === "Unpin") {
      const updatePin = data.bookmarks.map((el) =>
        el.id === id ? { ...el, pinned: !el.pinned } : el
      );
      setState((prev) => ({ ...prev, data: { bookmarks: updatePin } }));
    }
    if (item === "Edit") onEdit(id);
    if (item === "Archive" || item === "Unarchive") onArchive(id);
    if (item === "Delete Permanently") {
      onDelete(id);
    }
  }

  return (
    <>
      <div className="p-4 flex flex-col rounded-[10px] shadow-xs bg-white gap-3 dark:bg-neutral-dark-500">
        {/* 1st section */}
        <section className="flex items-center justify-between ">
          <div className="flex gap-5 items-center">
            <div className="flex rounded-lg border border-[#e8f0ef] w-10 h-10 dark:border-neutral-dark-500">
              <img src={favicon} className="object-cover" />
            </div>
            <div className="flex flex-col gap-0">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">{title}</h3>
              <a
                href={url}
                className="text-xs text-neutral-800 dark:text-neutral-dark-100"
                target="_blank"
              >
                {pathName}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-lg border border-neutral-400 bg-white p-1 relative cursor-pointer dark:border-neutral-dark-500 dark:bg-neutral-dark-800">
            <img
              src={selectedTheme==="dark" ?darkVerticalIcon:iconMenuBookmark}
              className="w-5 h-5"
              onClick={() => setOpen(!open)}
            />

            <Dropdown isOpen={open} onClose={() => setOpen(false)}>
              <ul className="py-2">
                {options.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      handleSelected(item.name);
                      handleDropdown(item.name);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-neutral-800 hover:bg-[#e8f0ef] rounded-lg dark:text-neutral-dark-100 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-dark-100" ,
                      itemSelected === item.name && "bg-[#e8f0ef] rounded-lg dark:hover:ring-1 dark:hover:ring-neutral-dark-100 dark:bg-transparent "
                    )}
                  >
                    <div>
                      <img
                        src={selectedTheme==="dark"?item.darkIcon :item.icon}
                        alt={item.name}
                        className="w-4 h-4"
                      />
                    </div>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>
        </section>
        <div className="border-[0.5px] border-neutral-300 dark:border-neutral-dark-500"></div>

        {/* description */}
        <div className="text-sm text-neutral-800 dark:text-neutral-dark-100">{description}</div>
        {/* tags */}

        <div className="flex gap-4">
          {tags.map((tag) => (
            <div
              className="py-0.5 px-4 rounded-sm bg-[#e8f0ef] text-xs text-neutral-800 dark:bg-neutral-dark-600 dark:text-neutral-dark-100"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="border-[0.5px] border-neutral-300 dark:border-neutral-dark-500"></div>

        {/* footer */}
        <section className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <img src={selectedTheme==="dark"?DarKEyeIcon:visitCountIcon} className="w-3 h-3 object-cover" />
              <span className="text-xs  text-neutral-800 dark:text-neutral-dark-100">{visitCount}</span>
            </div>

            <div className="flex gap-2 items-center">
              <img src={selectedTheme==="dark"?DarkClockIcon:lastVistedIcon} className="w-3 h-3 object-cover" />
              <span className="text-xs  text-neutral-800 dark:text-neutral-dark-100">
                {formatDate(lastVisited)}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <img src={selectedTheme==="dark"?DarkCalenderIcon:createdIcon} className="w-3 h-3 object-cover" />
              <span className="text-xs  text-neutral-800 dark:text-neutral-dark-100">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>

          {isActiveSidebar === "archived" && isArchived ? (
            <div className="py-0.5 px-4 rounded-sm bg-[#e8f0ef] text-xs text-neutral-800 ">
              Archived
            </div>
          ) : (
            (pinned && (
              <img src={PinIcon} className="w-4 h-4 cursor-pointer" />
            )) ||
            null
          )}
        </section>
      </div>
    </>
  );
}

export default Card;
