import 'bootstrap-select';
import PropTypes from 'prop-types';
import React from 'react';

import Info from '../Info';
import { reduceClassNames } from '../../util';

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
};

export default function Select({
  children,
  className,
  info,
  label,
  labelClassName,
  name,
  wrapperClassName,
  ...restProps
}) {
  return (
    <div className={reduceClassNames('form-group', wrapperClassName)}>
      {label && (
        <label className={reduceClassNames('text-nowrap', labelClassName)} htmlFor={name}>
          {label}
        </label>
      )}
      <select
        className={reduceClassNames('selectpicker form-control', className)}
        data-none-selected-text=""
        data-selected-text-format="count"
        data-style=""
        data-style-base="form-control"
        id={name}
        name={name}
        {...restProps}
      >
        {children}
      </select>
      {info && <Info>{info}</Info>}
    </div>
  );
}
