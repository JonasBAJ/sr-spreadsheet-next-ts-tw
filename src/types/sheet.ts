
type ValueFormat = '$' | '%' | 'none';
export interface ICell {
  row: number;
  col: number;
  edit: boolean;
  value: string;
  format: ValueFormat;
  computed?: string;
}

export interface IColHeader {
  col: number;
  value: string;
  format: ValueFormat;
}

export interface ISheet {
  id: string;
  rows: number;
  cols: number;
  title?: string;
  colNames: IColHeader[];
  data: ICell[][];
}
