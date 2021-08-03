import React from 'react';

import Header from 'components/Header/Header';
import Panel from 'components/Panel/Panel';
import Search from 'containers/Search/Search';

export const baseClass = 'vcc-app-container';
function AppContainer() {
  return (
    <>
      <Header />
      <div className={baseClass}>
        <Panel header={'Search Available Appoinments'}>
          <Search />
        </Panel>
      </div>
    </>
  );
}

export default AppContainer;
