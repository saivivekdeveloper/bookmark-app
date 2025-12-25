import React, { useContext, useState } from "react";
import Logo from "../../assets/images/logo-light-theme.svg";
import HomeWhiteIcon from "../../assets/images/icon-white-home.svg";
import ArchivedWhiteIcon from "../../assets/images/icon-white-archive.svg";
import HomeFilledIcon from "../../assets/images/icon-home.svg";
import ArchivedFilledIcon from "../../assets/images/icon-archive.svg";
import { cn } from "../../lib/utils";
// import data from "../../data/data";
import Tags from "../../pages/Tags";
import { ApplicationContext } from "../context";

function Sidebar() {
  const {
    handleActiveSidebar,
    handleResetTags,
    state: { isActiveSidebar, tagsChecked,data },
  } = useContext(ApplicationContext);

  const isTagsSelected = Object.values(tagsChecked).some((el) => el);

  function removeDuplicates(allTags) {
    // return [...new Set(allTags)];
    const newArray = [];
    allTags.forEach((tag) => {
      if (!newArray.includes(tag)) {
        newArray.push(tag);
      }
    });
    return newArray;
  }

  const allTags = data.bookmarks.flatMap((bookmark) => bookmark.tags);

  function occurencesOfEachCount() {
    const tagCount = {};
    for (let i = 0; i < allTags.length; i++) {
      const tag = allTags[i];
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
    return tagCount;
  }

  return (
    <aside className="h-screen w-78 p-5">
      {/* icon */}
      <div className="mb-5">
        <img src={Logo} alt="bookmark logo" />
      </div>

      {/* link to go to different pages */}
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "flex gap-2 items-center cursor-pointer py-2 px-3 transition-all duration-500 ease-in-out",
            isActiveSidebar === "home" && " bg-[#e8f0ef]  rounded-md"
          )}
          onClick={() => handleActiveSidebar("home")}
        >
          {isActiveSidebar === "home" ? (
            <img
              src={HomeFilledIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          ) : (
            <img
              src={HomeWhiteIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          )}
          <p className="text-base font-medium text-neutral-800 ">Home</p>
        </div>
        <div
          className={cn(
            "flex gap-2 items-center cursor-pointer py-2 px-3 transition-all duration-500 ease-in-out",
            isActiveSidebar === "archived" && " bg-[#e8f0ef]  rounded-md"
          )}
          onClick={() => handleActiveSidebar("archived")}
        >
          {isActiveSidebar === "archived" ? (
            <img
              src={ArchivedFilledIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          ) : (
            <img
              src={ArchivedWhiteIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          )}
          <p className="text-base font-medium text-neutral-800">Archived</p>
        </div>
      </div>

      {/* Tags.Section */}

      <section className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-[#4D4D4D] text-xs ">TAGS</h3>
          {isTagsSelected && (
            <p
              className="text-xs text-neutral-800  border-b border-neutral-500"
              onClick={handleResetTags}
            >
              Reset
            </p>
          )}
        </div>
        {removeDuplicates(allTags).length > 0 &&
          removeDuplicates(allTags).map((tag) => (
            <Tags key={tag} tagName={tag} tagCount={occurencesOfEachCount()} />
          ))}
      </section>
    </aside>
  );
}

export default Sidebar;
