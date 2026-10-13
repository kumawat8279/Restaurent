import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export default function Searchcontext({ children }) {

    let [search, setSearch] = useState("");
    let [userproducts, setUserproducts] = useState([]);

    return (
        <SearchContext.Provider
            value={{
                search,
                setSearch,
                userproducts,
                setUserproducts
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}