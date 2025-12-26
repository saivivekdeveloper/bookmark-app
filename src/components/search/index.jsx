import { useContext } from "react";
import SearchIcon from "../../assets/images/icon-search.svg";
import darkSearchIcon from '../../assets/images/dark-search.svg'
import { ApplicationContext } from "../context";

function Search() {
  const { handleSearch,state:{selectedTheme} } = useContext(ApplicationContext);
  return (
    <div className="relative border border-neutral-300 bg-white p-3 rounded-lg h-12 w-72 shadow-sm dark:border-neutral-dark-500 dark:bg-neutral-dark-600">
      <input
        type="text"
        placeholder="Search by title..."
        className="w-full h-full pl-10 text-sm placeholder:text-neutral-800 outline-none dark:placeholder:text-neutral-dark-100 dark:text-white"
        onChange={handleSearch}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <img src={selectedTheme==="dark"?darkSearchIcon:SearchIcon} alt="Search icon" className="w-4 h-4" />
      </div>
    </div>
  );
}

export default Search;
