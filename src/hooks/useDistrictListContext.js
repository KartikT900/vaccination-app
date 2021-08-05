import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DistrictListContext = React.createContext();
const DistrictListUpdateContext = React.createContext();

export function useDistrictListContext() {
  return {
    districtList: useContext(DistrictListContext),
    updateDistrictList: useContext(DistrictListUpdateContext)
  };
}

function DistrictListProvider({ children }) {
  const [districtList, setDistrictList] = useState(123);

  const updateDistrictList = (data) => {
    setDistrictList(data);
  };

  return (
    <DistrictListProvider.Provider value={districtList}>
      <DistrictListUpdateContext.Provider value={updateDistrictList}>
        {children}
      </DistrictListUpdateContext.Provider>
    </DistrictListProvider.Provider>
  );
}

DistrictListProvider.propTypes = {
  children: PropTypes.node
};

export default DistrictListProvider;
