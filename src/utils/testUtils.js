import React from 'react';
import { render } from '@testing-library/react';

export const withContextProvider = (
  LocalContext,
  Ui,
  { providerProps, ...renderOptions }
) => {
  return render(
    <LocalContext.Provider {...providerProps}>
      {<Ui />}
    </LocalContext.Provider>,
    renderOptions
  );
};
