import { Select } from 'evergreen-ui';
import PropTypes from 'prop-types';

function BaseCurrencyComponent({ data, setData, baseCurrency, setBaseCurrency }) {

  if (!data.some((currency) => currency.cc === 'UAH')) {
    data.push(
      { r030: 980, txt: 'Гривня', rate: 1, cc: 'UAH', exchangedate: '' },
    );
  }

  return (
    <div className="mb-[20px]">
      <span>
        Base currency: &nbsp;
      </span>

      <Select
        value={baseCurrency}
        onChange={(e) => {
          const selectedCurrency = e.target.value;
          setBaseCurrency(selectedCurrency);

          function changeTableData() {
            const baseCurrencyRate = data.find((currency) => currency.cc === selectedCurrency).rate;

            const updatedData = data.map((currency) => {
              return {
                ...currency, 
                rate: currency.rate / baseCurrencyRate,
              };
            });

            setData(updatedData);
          }

          changeTableData();
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
};

export default BaseCurrencyComponent;
