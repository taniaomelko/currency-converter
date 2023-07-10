import React, { useState, useEffect } from "react";
import { Table } from 'evergreen-ui';
import PropTypes from 'prop-types';

function TableComponent({ data }) {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  function selectCurrency(e) {
    e.target.closest('svg').classList.toggle('fill-yellow-300');
    e.target.closest('.js--row').querySelector('.js--code span').classList.toggle('selected');

    const selectedCurrency = e.target.closest('.js--row').querySelector('.js--code span').innerHTML;
    const updatedData = tableData.map((currency) => {
      if (currency.cc === selectedCurrency) {
        return { ...currency, selected: true };
      }
      return currency;
    });

    setTableData(updatedData);
    console.log(updatedData);
  }

  function handleSort() {
    const sortedData = [...tableData].sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1; // a should come before b
      } else if (!a.selected && b.selected) {
        return 1; // a should come after b
      } else {
        return a.cc.localeCompare(b.cc); // sort alphabetically by cc
      }
    });

    setTableData(sortedData);
  }

  function iconClick(e) {
    selectCurrency(e);
    handleSort();
  }

  return (
    <Table className="max-w-[1000px]">
      <Table.Head height={40}>
        <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}></Table.TextHeaderCell>
        <Table.TextHeaderCell>Code</Table.TextHeaderCell>
        <Table.TextHeaderCell>Currency</Table.TextHeaderCell>
        <Table.TextHeaderCell>Rate</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {tableData.map((currency, index) => (
          <Table.Row key={index} height={40} className="js--row">
            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
              <svg className="inline-block cursor-pointer hover:fill-yellow-300" onClick={iconClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64424 18.0633 7.73467C18.1714 7.8251 18.2519 7.94411 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Table.TextCell>
            <Table.TextCell className="js--code">{currency.cc}</Table.TextCell>
            <Table.TextCell>{currency.txt}</Table.TextCell>
            <Table.TextCell>{parseFloat(currency.rate.toFixed(4))}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default TableComponent;

TableComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      r030: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      cc: PropTypes.string.isRequired,
      exchangedate: PropTypes.string.isRequired,
    })
  ).isRequired,
};
