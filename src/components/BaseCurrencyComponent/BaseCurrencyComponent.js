import { Select } from 'evergreen-ui';
import PropTypes from 'prop-types';

function BaseCurrencyComponent({ data, baseCurrency, updateBaseCurrency }) {

  return (
    <div className="mb-[20px]">
      <span>
        Base currency: &nbsp;
      </span>

      <Select
        value={baseCurrency}
        onChange={(e) => {
          updateBaseCurrency(e.target.value);
        }}
      >
        {data.map((currency, index) => (
          <option key={index} value={currency.cc}>{currency.cc}</option>
        ))}

      </Select>
    </div>
  );
}

BaseCurrencyComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      r030: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      cc: PropTypes.string.isRequired,
      exchangedate: PropTypes.string.isRequired,
    })
  ).isRequired,
  baseCurrency: PropTypes.string.isRequired,
  updateBaseCurrency: PropTypes.func.isRequired,
};

export default BaseCurrencyComponent;
