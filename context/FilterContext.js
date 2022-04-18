import React, { useState } from "react";

const FilterContext = React.createContext()

export function FilterContextProvider ({ children }) {
  const [filter, setFilter] = useState("")

  return <FilterContext.Provider value={{ filter, setFilter }}>
    {children}
  </FilterContext.Provider>
}

export default FilterContext