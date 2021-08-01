import React from 'react';
import propTypes from 'prop-types';

import { classnames } from 'utils';

export const baseClass = 'vcc-panel';

function Panel({ ...props }) {
  const { className, header, children } = props;

  if (!children) {
    return null;
  }

  const renderHeader = () =>
    header && (
      <div
        className={`${baseClass}-header`}
        data-testid="panel-header"
      >
        {header}
      </div>
    );

  const renderBody = () => (
    <div className={`${baseClass}-body`}>{children}</div>
  );

  return (
    <div className={classnames(baseClass, className)}>
      {renderHeader()}
      {renderBody()}
    </div>
  );
}

Panel.propTypes = {
  className: propTypes.string,
  header: propTypes.oneOfType([propTypes.string, propTypes.node]),
  children: propTypes.any.isRequired
};

export default Panel;
