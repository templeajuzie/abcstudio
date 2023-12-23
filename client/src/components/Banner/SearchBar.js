"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import AllResults from "./AllResults";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { useRouter } from "next/navigation";


const SearchBar = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const {
    searchProducts,
    setSearchResults,
    searchResults,
    fetchProductsByCategory,
  } = UseProductProvider();
  const dropDownRef = useRef(null)

  const handleDropdownRef = () => {
    dropDownRef.current.style.display = "none"
    handleDropdown()
  }
  
 

  const handleFocus = () => {
    setIsFocused( prev => !prev);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
 
  const [isDropdown, setIsDropdown] = useState(false)
  const handleDropdown = () => {
      setIsDropdown(prev => !prev)
  } 
  
 
  const hasSearchResults = searchResults && searchResults.length > 0;
  
  

  const handleSearch = (e) => {
    const query = e.target.value;
    if (!query || query === "") {
      // If the query is empty, clear the searchResults
      setSearchResults([]);
    } else {
      // If there is a query, perform the search
      searchProducts(query);
    }
  };
  return (
    <>
      <form
        className={`${isFocused && "z-40"}  ${
          isDropdown && "z-[1000]"
        } hidden sm:block transition-all duration-300 relative`}
      >
        <div className="flex relative h-full">
          <label
            for="search-dropdown"
            className="mb-2 text-sm font-medium sr-only dark:text-white"
          >
            Your Email
          </label>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center flex-shrink-0 h-full py-2 bg-opacity-25 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:hover:bg-gray-600 "
            type="button"
          ></button>
          <div
            onClick={handleDropdown}
            className="flex flex-row items-center justify-center h-full gap-2 px-4 mr-1 text-sm font-medium text-center text-gray-900 bg-white rounded-s-lg"
          >
            All categories{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
          {isDropdown && (
            <>
              <div
                id="dropdown"
                className={` absolute top-[3rem] left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      onClick={() =>
                        router.push(`/store/category/${"men's clothing"}`)
                      }
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Men
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        router.push(`/store/category/${"jewelery"}`)
                      }
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Jewelry
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        router.push(`/store/category/${"electronics"}`)
                      }
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Electronics
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        router.push(
                          `/store/category/${"women's clothing"}`
                        )
                      }
                    
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Women'sclothing
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          <div
            className={`relative flex flex-row h-full rounded-r-lg w-fit ${
              isFocused && "z-40"
            }`}
          >
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-[30vw] py-2 bg-white outline-none border-none  text-lg text-gray-900 rounded-e-xl border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-s-gray-700  dark:border-gray-600 placeholder-gray-400 dark:text-white "
              placeholder="Search here..."
              onFocus={handleFocus}
              onChange={handleSearch}
            />{" "}
            <button className="bg-blue-500 absolute z-10 right-0 top-0 h-full  w-[4vw] flex items-center justify-center  rounded-e-lg">
              <svg
                className="w-4 h-4 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isFocused && hasSearchResults && (
          <AllResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            hasSearchResults={hasSearchResults}
            isFocused={isFocused}
            handleFocus={handleFocus}
          />
        )}
      </form>

      {/* {isFocused &&  (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-30"
          onClick={handleModalRef}
        ></div>
      )} */}
      {isDropdown && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-30"
          ref={dropDownRef}
          onClick={handleDropdownRef}
        ></div>
      )}
    </>
  );
};

export default SearchBar;
