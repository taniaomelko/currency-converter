import React, { useState, useEffect } from 'react';
import { getData } from './api/api';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import './dist/style.css';

import InputComponent from "./components/InputComponent/InputComponent";
import SelectComponent from "./components/SelectComponent/SelectComponent";
import TableComponent from "./components/TableComponent/TableComponent";
import ButtonComponent from "./components/ButtonComponent/ButtonComponent";
import BaseCurrencyComponent from "./components/BaseCurrencyComponent/BaseCurrencyComponent";

function App() {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');

  const [currencies, setCurrencies] = useState({
    currency1: {
      value: 0,
      rate: 0,
    },
    currency2: {
      value: 0,
      rate: 0,
    },
  });

  const [baseCurrency, setBaseCurrency] = useState('UAH');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(false);

  const [tabs] = useState(['Converter', 'Currencies']);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateBaseCurrency = (value) => {
    setBaseCurrency(value);

    const baseCurrencyRate = data.find((currency) => currency.cc === value).rate;
    const updatedData = data.map((currency) => {
      return {
        ...currency, 
        rate: currency.rate / baseCurrencyRate,
      };
    });

    setData(updatedData);
  }

  const updateCurrencies = (value, rate, id) => {
    setCurrencies((prevCurrencies) => ({
      ...prevCurrencies,
      [id]: {
        ...prevCurrencies[id],
        value: value,
        rate: rate,
      },
    }));
  }

  const convertCurrency = () => {
    if (amount.length) {
      const currency1Rate = currencies.currency1.rate;
      const currency2Rate = currencies.currency2.rate;

      const conversionRate = currency1Rate / currency2Rate || 0;
      const converted = amount * conversionRate;
      setConvertedAmount(converted);
      setError(false);
    } else {
      setConvertedAmount(0);
      setError(true);
    }
  };

  useEffect(() => {
    async function prepareData() {
      const data = await getData();
      const uahCurrency = {
        r030: 980,
        txt: 'Гривня',
        rate: 1,
        cc: 'UAH',
        exchangedate: '',
      };
      const preparedData = [
        ...data.filter(currency => currency.cc !== 'RUB' && currency.cc !== 'BYN'),
        uahCurrency,
      ].sort((a, b) => a.cc.localeCompare(b.cc));

      setData(preparedData);
      console.log(preparedData);

      updateCurrencies(preparedData[0].cc, preparedData[0].rate, 'currency1');
      updateCurrencies(preparedData[0].cc, preparedData[0].rate, 'currency2');
    }

    prepareData();
  }, []);


  return (
    <div className="py-[40px]">
      <div className="container">
        <Pane>
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabs.map((tab, index) => (
              <Tab
                aria-controls={`panel-${tab}`}
                isSelected={index === selectedIndex}
                key={tab}
                onSelect={() => setSelectedIndex(index)}
                id={`tab-${index}`}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          <Pane background="tint1" flex="1">
            {tabs.map((tab, index) => (
              <Pane
                aria-labelledby={tab}
                aria-hidden={index !== selectedIndex}
                display={index === selectedIndex ? 'block' : 'none'}
                key={tab}
                role="tabpanel"
              >
                {index === 0 && (
                  <>
                    <div className="flex flex-wrap items-center gap-[10px] w-fit">
                      <InputComponent amount={amount} setAmount={setAmount} />
                      <SelectComponent
                        id="currency1"
                        data={data}
                        updateCurrencies={updateCurrencies}
                      />
                      in
                      <SelectComponent
                        id="currency2"
                        data={data}
                        updateCurrencies={updateCurrencies}
                      />
    
                      <ButtonComponent
                        convertCurrency={convertCurrency}
                      />
                    </div>
    
                    <div>
                      <small id="error" className={`text-red-500 ${error === true ? 'opacity-100' : 'opacity-0'}`}>enter a number</small>
                    </div>
    
                    <div>
                      Converted Amount:&nbsp;
                      <span id="converted-amount">
                        {parseFloat(convertedAmount.toFixed(4))}
                      </span>
                    </div>
                  </>
                )}

                {index === 1 && (
                  <>
                    <BaseCurrencyComponent 
                      data={data} 
                      baseCurrency={baseCurrency} 
                      updateBaseCurrency={updateBaseCurrency}
                    />
                    <TableComponent data={data} />
                  </>
                )}
              </Pane>
            ))}
          </Pane>
        </Pane>
      </div>
    </div>
  );
}

export default App;
