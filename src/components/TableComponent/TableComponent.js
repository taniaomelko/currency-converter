import React, { useState, useEffect } from "react";
import { Table } from 'evergreen-ui';
import PropTypes from 'prop-types';
import TableRowComponent from "../TableRowComponent/TableRowComponent";

function TableComponent({ data }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const updatedData = data.map(currency => currency={ ...currency, isSelected: false });
    setTableData(updatedData);
  }, [data]);


  function sortSelected() {
    const selectedRows = tableData.filter((currency) => currency.isSelected);
    const unselectedRows = tableData.filter((currency) => !currency.isSelected);
    const sortedTableData = [...selectedRows, ...unselectedRows];
    setTableData(sortedTableData);
  }

  return (
    <Table className="max-w-[1000px]">
      <Table.Head height={40}>
        <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}></Table.TextHeaderCell>
        <Table.TextHeaderCell>Code</Table.TextHeaderCell>
        <Table.TextHeaderCell>Currency</Table.TextHeaderCell>
        <Table.TextHeaderCell>Rate</Table.TextHeaderCell>
        <Table.TextHeaderCell>isSelected</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {tableData.map((currency, index) => (
          <TableRowComponent key={index} currency={currency} sortSelected={sortSelected} setTableData={setTableData}></TableRowComponent>
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
