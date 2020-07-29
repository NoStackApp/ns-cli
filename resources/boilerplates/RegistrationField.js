/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: general, comp: RegistrationField

// ns__custom_start unit: general, comp: RegistrationField, loc: beforeImports
'use strict';
// ns__custom_end unit: general, comp: RegistrationField, loc: beforeImports

import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Row, ErrorContainer } from './RegistrationForm.style';

const RegistrationField = ({
  fieldLabel,
  type,
  name,
}) => (
  <Row>
    <label>
      {fieldLabel}
      <Field type={type} name={name} />
    </label>
    <ErrorContainer>
      <ErrorMessage name={name} />
    </ErrorContainer>
  </Row>
);

export default RegistrationField;
