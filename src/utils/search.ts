
export const cellContainsSearchValue = (
  searchText?: string,
  cellComputedValue?: string,
) => {
  if (!searchText) return false;
  return cellComputedValue?.toLowerCase().includes(searchText)
}
