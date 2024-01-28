import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  const discountOptions = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ];

  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={discountOptions}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
