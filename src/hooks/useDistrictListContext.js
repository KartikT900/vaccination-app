import React, { useContext } from 'react';

function useDistrictListContext(data) {
  const context = React.createContext({ data, updateData: () => {} });

  return useContext(context);
}

export default useDistrictListContext;
