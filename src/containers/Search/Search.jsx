import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Input, Label, Radio } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Panel from 'components/Panel/Panel';

import useFetch from 'hooks/useFetch';

export const baseClass = 'vcc-search';
const radioOptions = [
  {
    id: 'byPin',
    key: 'Pin',
    name: 'searchtype',
    value: 'byPin'
  },
  {
    id: 'byDistrict',
    key: 'District',
    name: 'searchtype',
    value: 'byDistrict'
  }
];

function Search({ geoLocatedPincode }) {
  const todaysDate = new Date();
  const [option, setOption] = useState({
    ['byPin']: geoLocatedPincode?.length > 0
  });
  const [emptyInput, setEmptyInput] = useState({
    noRadio: false,
    pin: false,
    state: false
  });
  const [searchInput, setSearchInput] = useState(geoLocatedPincode);
  const [date, setDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isSearchByDistrict, setIsSearchByDistrict] = useState(false);
  const { fetchData } = useFetch();

  const searchKey = Object.keys(option)[0];

  const handleSearchInput = (value) => {
    setSearchInput(parseInt(value, 10));
  };

  const handleRadioSelection = (target) => {
    const { value, checked } = target;

    setEmptyInput({ ...emptyInput, pin: false, state: false });

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
    const uncheckedRadioKey = Object.keys(option).filter(
      (key) => key !== event.target.value
    );

    setOption({
      [event.target.value]: event.target.checked,
      [uncheckedRadioKey[0]]: false
    });
  };

  const handleDayChange = (...args) => {
    const [, , dayPickerInput] = args;
    const input = dayPickerInput.getInput();

    setDate(input.value);
  };

  const handleSearchClick = async () => {
    if (
      isEmpty(option) ||
      Object.keys(option)?.every((radio) => !option[radio])
    ) {
      setEmptyInput({ ...emptyInput, noRadio: true });
      return;
    }
    if (
      searchKey === 'byPin' &&
      (!searchInput ||
        searchInput.toString(10).length < 6 ||
        searchInput.toString(10).length > 6)
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
        id: searchInput,
        // don't judge lol
        date: date
          ? date.split('-').reverse().join('-')
          : todaysDate
              .toLocaleString()
              .split(',')[0]
              .split('/')
              .join('-')
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
            checked={option[item.value]}
            onChange={handleOnChange}
            role="radio"
            id={item.id}
            value={item.value}
            name={item.name}
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
          value={searchInput || ''}
          onChange={handleOnChange}
          name="searchBox"
          error={emptyInput.pin || emptyInput.state}
        />
        {(emptyInput.pin ||
          emptyInput.state ||
          emptyInput.noRadio) && (
          <Label
            basic
            className={emptyInput.noRadio && 'no-radio'}
            color="red"
            prompt={
              emptyInput.pin || emptyInput.state || emptyInput.noRadio
            }
            pointing={emptyInput.noRadio ? 'below' : 'above'}
          >
            {emptyInput.noRadio &&
              'Please select one search option below'}
            {emptyInput.state &&
              'State ID should be in range 1 to 28'}
            {emptyInput.pin && 'Pincode should be 6 digits'}
          </Label>
        )}
        <div className={`${baseClass}-options`}>
          {renderRadioOptions()}
          <DayPickerInput
            value={date}
            onDayChange={handleDayChange}
            placeholder={todaysDate.toLocaleDateString()}
            inputProps={{
              name: 'date',
              ['aria-label']: 'Choose slot date'
            }}
          />
        </div>
      </Panel>
    </div>
  );
}

Search.propTypes = {
  geoLocatedPincode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Search;
