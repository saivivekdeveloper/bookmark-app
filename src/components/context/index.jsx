import React, { createContext, useEffect, useState } from "react";
import data from "../../data/data";
const ApplicationContext = createContext(null);

function ApplicationState({ children }) {
  const [state, setState] = useState({
    isActiveSidebar: "home",
    tagsChecked: {},
    isSearchInput: "",
    data,
    selectedTheme: "dark",
  });

  useEffect(() => {
    const root = document.documentElement;
    if (state.selectedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.selectedTheme]);

  function handleActiveSidebar(value) {
    setState((prev) => ({
      ...prev,
      isActiveSidebar: value,
    }));
  }

  function handleCheckbox(event) {
    const name = event.target.name;
    const checked = event.target.checked;
    setState((prev) => ({
      ...prev,
      isActiveSidebar: "",
      tagsChecked: { ...prev.tagsChecked, [name]: checked },
    }));
  }

  function handleSearch(event) {
    setState((prev) => ({ ...prev, isSearchInput: event.target.value }));
  }

  function handleResetTags() {
    setState((prev) => ({ ...prev, tagsChecked: {} }));
  }

  return (
    <ApplicationContext
      value={{
        handleActiveSidebar,
        state,
        handleCheckbox,
        handleSearch,
        handleResetTags,
        setState,
      }}
    >
      {children}
    </ApplicationContext>
  );
}

export { ApplicationContext, ApplicationState };
