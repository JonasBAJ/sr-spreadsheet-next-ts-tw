
// type ValueFormat = '$' | '%' | 'none';
export interface ICell {
  row: number;
  col: number;
  edit: boolean;
  value: string;
  computed?: string;
  error?: boolean;
}

export interface IColHeader {
  col: number;
  value: string;
}

export interface ISheet {
  id: string;
  rows: number;
  cols: number;
  title?: string;
  colNames: IColHeader[];
  data: ICell[][];
}
