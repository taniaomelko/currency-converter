import React, { useState, useEffect } from "react";

// import { useQuery, useMutation } from 'react-query';
import './dist/style.css';

import { getData } from './api/api';

import { Pane, Tablist, Tab } from 'evergreen-ui';


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

  // const [currency, selectCurrency] = useState();


  const [selectedIndex, setSelectedIndex] = useState(1);
  const [tabs] = useState(['Converter', 'Currencies']);

  const convertCurrency = () => {
    if (amount.length) {
      document.querySelector('.error').classList.add('opacity-0');

      const conversionRate = currency1Rate / currency2Rate || 0;
      const converted = amount * conversionRate;

      console.log(
        amount, currency1Rate, currency2Rate
      );
      setConvertedAmount(converted);
    } else {
      document.querySelector('.error').classList.remove('opacity-0');
      setConvertedAmount(0);
    }
  };

  // const selectCurrency = () => {
  //   document.querySelector('.selected-icon').classList.toggle('fill-yellow-500');
  //   console.log('selectCurrency');
  // }

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
                    <small className="error opacity-0 text-red-500">enter a number</small>
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
