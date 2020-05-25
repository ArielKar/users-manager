export const validateForm = config => data => {
  const errors = {};
  for (const key in config) {
    const validations = config[key];
    const value = data[key];
    validations.forEach(validation => {
      if (errors.hasOwnProperty(key)) {
        return;
      }
      const err = validator[validation](value);
      if (err) errors[key] = err;
    });
  }
  let isValid = !Object.keys(errors).length;
  return [isValid, errors];
};
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/*

    NAIVE VALIDATORS - DEMOSTRATION PURPOSES

*/
const validator = {
  required(val) {
    return val ? '' : 'Required';
  },
  alpha(val) {
    return val && val.match(/^[a-zA-Z ]+$/) ? '' : 'Only letter allowed';
  },
  email(val) {
    return val && val.match(EMAIL_REGEX) ? '' : 'Must be valid email';
  },
  notEmptyList(val) {
    return val && val.length ? '' : 'Cant be empty';
  },
};
