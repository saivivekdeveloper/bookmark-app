import { useContext, useMemo, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import SortIcon from "../assets/images/icon-sort.svg";

import Card from "../components/Card";
import { ApplicationContext } from "../components/context";
import useDebounce from "../hooks/useDebounce";
import Dropdown from "../components/Dropdown";
import CheckIcon from "../assets/images/icon-check.svg";
import { cn } from "../lib/utils";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import BookmarkForm from "./Form";
import darkSort from '../assets/images/dark-sort.svg'
import DarkCheckIcon from '../assets/images/check-icon.svg'

function Homepage() {
  const {
    state: { isActiveSidebar, tagsChecked, isSearchInput, data,selectedTheme },
    setState,
  } = useContext(ApplicationContext);
  const [open, setOpen] = useState(false);

  //edit archive delete add modals
  const [editBookmarkStateModal, setEditBookmarkStateModal] = useState(false);
  const [archiveStateModal, setArchiveStateModal] = useState(false);
  const [deleteBookmarkStateModal, setDeleteBookmarkStateModal] =
    useState(false);

  const [addBookmarkModalOpen, setAddBookmarkModalOpen] = useState(false);

  const [isSelectedTextDropdown, setIsSelectedDropddown] = useState(null);
  const { debouncedSearchInput } = useDebounce(isSearchInput, 500);
  const isTagsSelected = Object.values(tagsChecked).some((el) => el);



  function handleFilteredData() {
      let selectedNames = [];
    let filteredData = [...data.bookmarks];
    //1. making sure that selected checkbox to get names of it
    //2.make sure that  all selected names should includes in tags that only it filter that element

    if (isActiveSidebar === "home") {
      filteredData = data.bookmarks.filter((bookmark) => !bookmark.isArchived);
    }
    if (isActiveSidebar === "archived") {
      filteredData = data.bookmarks.filter((bookmark) => bookmark.isArchived);
    }

    // for search Input
    if (debouncedSearchInput) {
      filteredData = filteredData.filter((boomark) =>
        boomark.title
          .trim()
          .toLocaleLowerCase()
          .includes(debouncedSearchInput.toLocaleLowerCase().trim(""))
      );
    }

    //for Tags
    for (const key in tagsChecked) {
      if (tagsChecked[key]) {
        selectedNames.push(key);
      }
    }
    filteredData = filteredData.filter((el) =>
      selectedNames.every((name) => el.tags.includes(name))
    );

    //sorting

    if (isSelectedTextDropdown === "Recently added")
      filteredData = [...filteredData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    if (isSelectedTextDropdown === "Recently visited")
      filteredData = [...filteredData].sort(
        (a, b) => new Date(b.lastVisited) - new Date(a.lastVisited)
      );

    if (isSelectedTextDropdown === "Most visited")
      filteredData = [...filteredData].sort(
        (a, b) => b.visitCount - a.visitCount
      );
    return {
      filteredData,
      selectedNames,
    };
  }

  const { filteredData, selectedNames } = useMemo(
    () => handleFilteredData(),
    [data.bookmarks, isActiveSidebar, debouncedSearchInput, tagsChecked, isSelectedTextDropdown]
  );
  const options = ["Recently added", "Recently visited", "Most visited"];

  function handleSelected(value) {
    setIsSelectedDropddown(value);
  }

  function handleArchive() {
    const id = archiveStateModal;
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        bookmarks: prev.data.bookmarks.map((el) =>
          el.id === id ? { ...el, isArchived: !el.isArchived } : el
        ),
      },
    }));
    // setModalID(id)
    setArchiveStateModal(null);
    selectedIsArchiveStatus
      ? toast.success("Bookmark unarchived successfully")
      : toast.success("Bookmark archived successfully");
  }

  const selectedIsArchiveStatus = data.bookmarks.find(
    (bookmark) => bookmark.id === archiveStateModal
  )?.isArchived;

  function handleDeleteBookmark() {
    const id = deleteBookmarkStateModal;
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        bookmarks: prev.data.bookmarks.filter((el) => el.id !== id),
      },
    }));
    setDeleteBookmarkStateModal(null);
    toast.success("Bookmark deleted successfully");
  }

  function editData() {
    const id = editBookmarkStateModal;
    const editData = data.bookmarks.find((el) => el.id === id);
    return {
      title: editData?.title,
      url: editData?.url,
      tags: editData?.tags,
      description: editData?.description,
    };
  }

  function editSaveBookmark(formData){
    const id = editBookmarkStateModal;
    console.log(formData, "formdata");
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        bookmarks: prev.data.bookmarks.map((el) =>
          el.id === id
            ? {
                ...el,
                title: formData.title,
                description: formData.description,
                url: formData.url,
                tags: formData.tags.split(",").map((tag) => tag.trim()),
              }
            : el
        ),
      },
    }));
    setEditBookmarkStateModal(null);
    toast.success("Bookmark edited successfully");
  }



  return (
    <div className="flex">
      <Sidebar />

      <div className="bg-[#e8f0ef] w-full dark:bg-neutral-dark-900">
        <Header enableAddBookmark={() => setAddBookmarkModalOpen(true)} />
        {/* Home */}
        <div className="p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[22px] font-bold text-neutral-900 dark:text-white">
              {isTagsSelected ? (
                <div className="flex gap-2 items-center ">
                  <p > Bookmarks Tagged:</p>
                  <p className="text-teal-700 text-xl dark:text-white">
                    {
                      selectedNames.map((el) => el)
                      .join(",")}
                  </p>
                </div>
              ) : isActiveSidebar === "archived" ? (
                "Archived bookmarks"
              ) : (
                "All bookmarks"
              )}
            </h1>

            <div
              className="py-2.5 px-3 rounded-lg border border-neutral-400 bg-white flex items-center gap-2 cursor-pointer relative dark:border-neutral-dark-400  dark:bg-neutral-dark-800"
              onClick={() => setOpen(!open)}
            >
              <img src={selectedTheme==="dark"?darkSort:SortIcon} alt="sort-icon" />
              <p
                className="text-sm
               text-neutral-900 dark:text-white"
              >
                Sort by{" "}
              </p>

              <Dropdown isOpen={open} onClose={() => setOpen(false)}>
                <ul className="py-2">
                  {options.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        handleSelected(item);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-neutral-800 hover:bg-[#e8f0ef] dark:text-neutral-dark-100",
                        isSelectedTextDropdown === item &&
                          "bg-[#e8f0ef] rounded-lg"
                      )}
                    >
                      <p>{item}</p>
                      {isSelectedTextDropdown === item && (
                        <div>
                          <img
                            src={selectedTheme==="dark"?DarkCheckIcon:CheckIcon}
                            alt="checkicon"
                            className="w-4 h-4 object-cover"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 p-8">
          {filteredData.length > 0 ? (
            filteredData.map((card) => (
              <Card
                cardData={card}
                key={card.id}
                onEdit={() => {
                  setEditBookmarkStateModal(card.id);
                }}
                onArchive={() => {
                  setArchiveStateModal(card.id);
                }}
                onDelete={() => {
                  setDeleteBookmarkStateModal(card.id);
                }}
              />
            ))
          ) : (
            <p className="text-neutral-900 text-center font-bold">
              No Data Found
            </p>
          )}
        </div>
      </div>

      {/* Modals */}

      {/* edit */}
      <Modal
        isOpen={!!editBookmarkStateModal}
        onClose={() => setEditBookmarkStateModal(null)}
        title="Edit Bookmark"
        buttonText="Save Bookmark"
      >
        <BookmarkForm
          onClose={() => setAddBookmarkModalOpen(false)}
          editData={editData()}
          editSaveBookmark={editSaveBookmark}
          mode="EDIT"
        />
      </Modal>

      {/* add bookmark */}
      <Modal
        isOpen={!!addBookmarkModalOpen}
        onClose={() => setAddBookmarkModalOpen(false)}
        title="Add a bookmark"
        buttonText={"Add Bookmark"}
      >
        <BookmarkForm onClose={() => setAddBookmarkModalOpen(false)} />
      </Modal>

      {/* archive or unarchive */}
      <Modal
        isOpen={!!archiveStateModal}
        onClose={() => setArchiveStateModal(null)}
        title={
          selectedIsArchiveStatus ? "Unarchive Bookmark" : "Archive Bookmark"
        }
        buttonText={selectedIsArchiveStatus ? "Unarchive" : "Archive"}
        handleButtonClick={handleArchive}
      >
        {selectedIsArchiveStatus ? (
          <p className="font-medium text-sm text-[#4C5C59] px-4">
            Move this bookmark back to your active list?
          </p>
        ) : (
          <p className="font-medium text-sm text-[#4C5C59] px-4 ">
            Are you sure you want to archive this bookmark?
          </p>
        )}
      </Modal>

      <Modal
        isOpen={!!deleteBookmarkStateModal}
        onClose={() => setDeleteBookmarkStateModal(null)}
        title="Delete Bookmark"
        buttonText="Delete Permanently"
        handleButtonClick={handleDeleteBookmark}
      >
        <p className="font-medium text-sm text-[#4C5C59] px-4">
          Are you sure you want to delete this bookmark? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}

export default Homepage;
