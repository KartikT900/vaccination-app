import React, { useState } from 'react';

import useFetch from 'hooks/useFetch';

export const baseClass = 'vcc-search';
const radioOptions = [
  {
    id: 'byPin',
    key: 'Pin',
    name: 'search-by-pin',
    value: 'byPin'
  },
  {
    id: 'byDistrict',
    key: 'District',
    name: 'search-by-pin',
    value: 'byDistrict'
  }
];

function Search() {
  const [option, setOption] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearchByDistrict, setIsSearchByDistrict] = useState(false);
  const { fetchData } = useFetch();

  const searchKey = Object.keys(option)[0];

  const handleSearchInput = (value) => {
    setSearchInput(parseInt(value, 10));
  };

  const handleRadioSelection = (target) => {
    const { value, checked } = target;

    if (value === 'byDistrict' && checked) {
      setIsSearchByDistrict(true);
      return;
    }

    setIsSearchByDistrict(false);
  };

  const handleOnChange = (event) => {
    if (event.target.name === 'searchBox') {
      const { value } = event.target;

      handleSearchInput(value);
      return;
    }

    handleRadioSelection(event.target);
    setOption({ [event.target.value]: event.target.checked });
  };

  const handleSearchClick = async () => {
    const options = {
      requestFor:
        searchKey === 'byPin' ? 'appointments' : 'districtList',
      searchType: {
        key: searchKey === 'byPin' ? 'byPin' : 'district',
        id: searchInput
      }
    };

    fetchData(options);
  };

  const renderRadioOptions = () => {
    return (
      <div className={`${baseClass}-radio`}>
        {radioOptions.map((item) => (
          <label htmlFor={item.id} key={item.key}>
            <input
              type="radio"
              {...item}
              onChange={handleOnChange}
              role="radio"
              aria-checked={searchKey === item.value}
            />
            <span>{`By ${item.key}`}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className={baseClass}>
      <span>
        {isSearchByDistrict ? 'Please enter State ID' : null}
      </span>
      <input type="text" name="searchBox" onChange={handleOnChange} />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>
      <div className={`${baseClass}-options`}>
        {renderRadioOptions()}
      </div>
    </div>
  );
}

export default Search;
