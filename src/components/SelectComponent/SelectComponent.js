import PropTypes from 'prop-types';
import { Select } from 'evergreen-ui';

function SelectComponent({ id, data, updateCurrencies }) {
  return (
    <Select
      id={id}
      onChange={(e) => {
        const value = e.target.value;
        const rate = data.find((item) => item.cc === value).rate;
        updateCurrencies(value, rate, id);
      }}
    >
      {data.map((currency, index) => (
        <option key={index} value={currency.cc}>{currency.cc}</option>
      ))}
    </Select>
  );
}

SelectComponent.propTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      r030: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      cc: PropTypes.string.isRequired,
      exchangedate: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
}).isRequired;

export default SelectComponent;
