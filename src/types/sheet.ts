
// type ValueFormat = '$' | '%' | 'none';
export interface ICell {
  id: string;
  edit: boolean;
  value: string;
  computed?: string;
  error?: boolean;
  message?: string;
  outputCells: Record<string, boolean>;
  inputCells: Record<string, boolean>;
}

export interface IColHeader {
  col: number;
  value: string;
}

export interface ISheet {
  id: string;
  status?: 'IN_PROGRESS' | 'DONE';
  serverId?: string;
  rows: number;
  cols: number;
  title?: string;
  colNames: IColHeader[];
  data: Record<string, ICell>;
  updatedAt?: string;
  savedAt?: string;
}
