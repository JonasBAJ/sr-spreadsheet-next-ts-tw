import { ICell } from '../types/sheet';

export class Cell implements ICell {
  id: string
  edit: boolean = false
  value: string;
  computed?: string | undefined;
  error?: boolean;
  outputCells: Record<string, boolean> = {};
  inputCells: Record<string, boolean> = {};

  constructor(props: ICell);
  constructor(id: string, value?: string);

  constructor(...args: any[]) {
    if (args.length === 1) {
      const cell = args[0] as ICell;
      this.id = cell.id;
      this.edit = cell.edit;
      this.value = cell.value;
      this.computed = cell.computed;
      this.error = cell.error;
      this.outputCells = cell.outputCells;
      this.inputCells = cell.inputCells;
    } else {
      this.id = args[0] as string;
      this.value = (args[2] || '') as string;
    }
  }

  toPlainObject = () => ({
    id: this.id,
    edit: this.edit,
    value: this.value,
    computed: this.computed,
    error: this.error,
    outputCells: this.outputCells,
    inputCells: this.inputCells,
  })
}
