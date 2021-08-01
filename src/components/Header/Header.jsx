import React from 'react';

export const baseClass = 'vcc-header';
function Header() {
  return (
    <div className={baseClass}>
      <h1 className={`${baseClass}-text`}>Vaccine Slot Booking</h1>
    </div>
  );
}

export default Header;
