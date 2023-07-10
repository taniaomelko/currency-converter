import { Button } from 'evergreen-ui';
import PropTypes from 'prop-types';

function ButtonComponent({ convertCurrency }) {
  return (
    <Button appearance="primary" onClick={convertCurrency}>Convert</Button>
  );
}

export default ButtonComponent;

ButtonComponent.propTypes = {
  convertCurrency: PropTypes.func.isRequired,
};
