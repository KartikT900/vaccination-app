import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion, Checkbox, Menu } from 'semantic-ui-react';

export const checkboxOptions = [
  {
    name: 'Covaxin',
    value: 'covaxin'
  },
  {
    name: 'Covishield',
    value: 'covishield'
  },
  {
    name: 'Sputnik V',
    value: 'sputnik v'
  }
];
export const baseClass = 'vcc-filters';

function Filters({ handleOnChange }) {
  const [isActive, setIsActive] = useState(false);
  const getOptions = () => (
    <div className={`${baseClass}-option`}>
      {checkboxOptions.map((item) => (
        <Checkbox
          key={item.name}
          label={item.name}
          value={item.value}
          onChange={handleOnChange}
          type="checkbox"
          readOnly={false}
        />
      ))}
    </div>
  );

  return (
    <div className={baseClass}>
      <Accordion as={Menu} vertical>
        <Accordion.Title
          active={false}
          content="Filter By"
          index={0}
          onClick={() => setIsActive(!isActive)}
          icon="angle down"
        ></Accordion.Title>
        <Accordion.Content active={isActive} content={getOptions()} />
      </Accordion>
    </div>
  );
}

Filters.propTypes = {
  handleOnChange: PropTypes.func.isRequired
};

export default Filters;
