import PropTypes from 'prop-types';
import { Select } from 'evergreen-ui';

function SelectComponent({ id, data, currency, setCurrency, setCurrencyRate }) {
  return (
    <Select
      id={id}
      value={currency}
      onChange={(e) => {
        const selectedCurrency = e.target.value;
          setCurrency(selectedCurrency);

          const currencyRate = data.find((item) => item.cc === selectedCurrency).rate;
          setCurrencyRate(currencyRate);
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
}).isRequired;

export default SelectComponent;
