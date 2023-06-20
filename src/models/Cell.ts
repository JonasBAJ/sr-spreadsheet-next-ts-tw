import { ICell } from '../types/sheet';

export class Cell implements ICell {
  row: number;
  col: number;
  edit: boolean = false
  value: string;
  computed?: string | undefined;

  constructor(props: ICell);
  constructor(row: number, col: number, value?: string);

  constructor(...args: any[]) {
    if (args.length === 1) {
      const cell = args[0] as ICell;
      this.row = cell.row;
      this.col = cell.col;
      this.edit = cell.edit;
      this.value = cell.value;
      this.computed = cell.computed;
    } else {
      this.row = args[0] as number;
      this.col = args[1] as number;
      this.value = (args[2] || '') as string;
    }
  }

  toPlainObject = () => ({
    row: this.row,
    col: this.col,
    edit: this.edit,
    value: this.value,
    computed: this.computed,
  })
}