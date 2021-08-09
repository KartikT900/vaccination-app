import React, { useState } from 'react';
import { Input, Label, Radio } from 'semantic-ui-react';

import Panel from 'components/Panel/Panel';

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
  const [emptyInput, setEmptyInput] = useState({
    pin: false,
    state: false
  });
  const [searchInput, setSearchInput] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isSearchByDistrict, setIsSearchByDistrict] = useState(false);
  const { fetchData } = useFetch();

  const searchKey = Object.keys(option)[0];

  const handleSearchInput = (value) => {
    setSearchInput(parseInt(value, 10));
  };

  const handleRadioSelection = (target) => {
    const { value, checked } = target;

    setEmptyInput({ pin: false, state: false });

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
    if (
      searchKey === 'byPin' &&
      (!searchInput || searchInput.toString(10).length < 6)
    ) {
      setEmptyInput({ ...emptyInput, pin: true, state: false });
      return;
    } else if (
      searchKey === 'byDistrict' &&
      (!searchInput ||
        searchInput.toString(10).length < 1 ||
        searchInput.toString(10).length > 2)
    ) {
      setEmptyInput({ ...emptyInput, pin: false, state: true });
      return;
    }

    const options = {
      requestFor:
        searchKey === 'byPin' ? 'appointments' : 'districtList',
      searchType: {
        key: searchKey === 'byPin' ? 'byPin' : 'district',
        id: searchInput
      }
    };

    setEmptyInput(false);
    fetchData(options);
  };

  const renderRadioOptions = () => {
    return (
      <div className={`${baseClass}-radio`}>
        {radioOptions.map((item) => (
          <Radio
            key={item.id}
            readOnly={false}
            label={`By ${item.key}`}
            aria-checked={searchKey === item.value}
            checked={searchKey === item.value}
            onChange={handleOnChange}
            role="radio"
            id={item.id}
            value={item.value}
            name={item.value}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={baseClass}>
      <Panel header="Search Available Appoinments">
        <Input
          className={`${baseClass}-input`}
          action={{
            color: 'teal',
            labelPosition: 'right',
            content: 'Search',
            icon: 'search',
            onClick: handleSearchClick
          }}
          actionPosition="right"
          placeholder={
            searchKey === 'byPin'
              ? 'Pincode...'
              : 'Please enter State Id...'
          }
          onChange={handleOnChange}
          name="searchBox"
          error={emptyInput.pin || emptyInput.state}
        />
        {(emptyInput.pin || emptyInput.state) && (
          <Label
            basic
            color="red"
            prompt={emptyInput.pin || emptyInput.state}
            pointing={'below'}
          >
            {emptyInput.state &&
              'State ID should be in range 1 to 28'}
            {emptyInput.pin && 'Pincode should be 6 digits'}
          </Label>
        )}
        <div className={`${baseClass}-options`}>
          {renderRadioOptions()}
        </div>
      </Panel>
    </div>
  );
}

export default Search;
