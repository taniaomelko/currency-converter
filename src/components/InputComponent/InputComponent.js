import { TextInput } from 'evergreen-ui';
import PropTypes from 'prop-types';

function InputComponent({ amount, setAmount }) {
  return (
    <TextInput 
      type="number"
      id="amount"
      placeholder="enter a number"
      min="0"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
}

export default InputComponent;

InputComponent.propTypes = {
  amount: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
};
