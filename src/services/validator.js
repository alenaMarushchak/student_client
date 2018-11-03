import validate from 'validate.js'
import * as validators from '../validators';
import _ from 'lodash';

class Validator {
  formatBackendErrors(errorsData = {}) {
    let errorsKeys = Object.keys(errorsData);
    let errors = {};
    errorsKeys.forEach(errorKey => {

    const errorArr = (errorsData[errorKey] || []).map(error => (
      error.match(/^\^/) ? `${error}`.replace(/\^/, ''):
      validate.capitalize(
        validate.prettify(`${errorKey} ${error || ''}`)
      )
    ));

    errors = { ...errors,
      ...{ [errorKey]: errorArr }
    }

    })

    return errors || errorsData;
  }

  validate(object, validator) {
    const constrains = validators[validator];
    if (!validators[validator]) return;

    if (_.isFunction(validators[validator]))
      return validate(object, validators[validator](object));
    else
      return validate(object, constrains);
  }

  formatErrors(backend, frontend) {
    const outErrors = Object.keys(frontend || {}).length ? frontend : backend;
    return outErrors || {};
  }
}
export default new Validator();

