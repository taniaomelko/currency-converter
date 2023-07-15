import React, { useState, useEffect } from "react";
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
  const [currency1, setCurrency1] = useState(0);
  const [currency2, setCurrency2] = useState(0);
  const [currency1Rate, setCurrency1Rate] = useState(0);
  const [currency2Rate, setCurrency2Rate] = useState(0);

  const [baseCurrency, setbaseCurrency] = useState('UAH');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(false);

  const [tabs] = useState(['Converter', 'Currencies']);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const convertCurrency = () => {
    if (amount.length) {
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
      const preparedData = data
        .filter(currency => currency.cc !== 'RUB' && currency.cc !== 'BYN')
        .sort((a, b) => a.cc.localeCompare(b.cc));

      setData(preparedData);
      console.log(preparedData);

      setCurrency1(preparedData[0].cc);
      setCurrency2(preparedData[0].cc);

      setCurrency1Rate(preparedData[0].rate);
      setCurrency2Rate(preparedData[0].rate);
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
                      currency={currency1} 
                      setCurrency={setCurrency1} 
                      currencyRate={currency1Rate} 
                      setCurrencyRate={setCurrency1Rate}
                    />
                    in
                    <SelectComponent 
                      id="currency2" 
                      data={data} 
                      currency={currency2} 
                      setCurrency={setCurrency2} 
                      currencyRate={currency2Rate} 
                      setCurrencyRate={setCurrency2Rate}
                    />
  
                    <ButtonComponent 
                      convertCurrency={convertCurrency} 
                      amount={amount} setAmount={setAmount}
                    />
                  </div>
  
                  <div>
                    <small className={`text-red-500 ${error === true ? 'opacity-100' : 'opacity-0'}`}>enter a number</small>
                  </div>
  
                  <div>Converted Amount: {parseFloat(convertedAmount.toFixed(4))}</div>
                  </>
                )}

                {index === 1 && (
                  <>
                    <BaseCurrencyComponent 
                      data={data} 
                      setData={setData}
                      baseCurrency={baseCurrency} 
                      setBaseCurrency={setbaseCurrency}
                      className="mb-[20px]"
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
