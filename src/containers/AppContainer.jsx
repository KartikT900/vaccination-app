import React from 'react';

import Header from 'components/Header/Header';
import Panel from 'components/Panel/Panel';

export const baseClass = 'vcc-app-container';
function AppContainer() {
  return (
    <>
      <Header />
      <div className={baseClass}>
        <Panel header={'Search by Pincode'}>
          <span>Search</span>
        </Panel>
      </div>
    </>
  );
}

export default AppContainer;
