import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { netCall } from 'utils';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await netCall(
      '/appointment/sessions/public/findByPin?pincode=110001&date=31-03-2021',
      {
        method: 'get',
        headers: { 'Content-type': 'application/json' }
      }
    );

    setData(response);
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);

  return (
    <div>
      {!loaded
        ? 'fetching data now'
        : `data: ${JSON.stringify(data)}`}
    </div>
  );
}

export default hot(App);
