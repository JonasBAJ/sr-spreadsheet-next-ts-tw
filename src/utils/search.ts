
export const cellContainsSearchValue = (
  searchText?: string | null,
  cellValue?: string,
  cellComputedValue?: string,
) => {
  if (!searchText) return false;

  const foundCellVal = cellValue?.toLowerCase().includes(searchText);
  const foundCompVal = cellComputedValue?.toLowerCase().includes(searchText);

  return foundCellVal || foundCompVal;
}
