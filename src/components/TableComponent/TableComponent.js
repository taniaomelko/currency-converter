import React, { useState } from "react";
import { Table } from 'evergreen-ui';
import PropTypes from 'prop-types';
import TableRowComponent from "../TableRowComponent/TableRowComponent";

function TableComponent({ data }) {
  const initialCurrenciesState = data.reduce(
    (acc, currency) => ({
      ...acc,
      [currency.cc]: currency.isSelected,
    }),
  {});

  const [currencies, setCurrencies] = useState(initialCurrenciesState);
  const starredItems = data.filter((curr) => !!currencies[curr.cc]).map((curr) => ({ ...curr, isSelected: true }));
  const unstarredItems = data.filter((curr) => !currencies[curr.cc]).map((curr) => ({ ...curr, isSelected: false }));

  const toggleSelect = (currency) => {
    setCurrencies((prevCurrencies) => ({
      ...prevCurrencies,
      [currency.cc]: !prevCurrencies[currency.cc],
    }));
  };

  return (
    <Table className="max-w-[1000px]">
      <Table.Head height={40}>
        <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}></Table.TextHeaderCell>
        <Table.TextHeaderCell>Code</Table.TextHeaderCell>
        <Table.TextHeaderCell>Currency</Table.TextHeaderCell>
        <Table.TextHeaderCell>Rate</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {starredItems.map((currency, index) => (
          <TableRowComponent key={index} currency={currency} onToggleSelect={() => toggleSelect(currency)}></TableRowComponent>
        ))}
        {unstarredItems.map((currency, index) => (
          <TableRowComponent key={index} currency={currency} onToggleSelect={() => toggleSelect(currency)}></TableRowComponent>
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
