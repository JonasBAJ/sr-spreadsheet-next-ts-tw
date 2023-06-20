import { ISheet } from "../types/sheet";

export const mockSheet: ISheet = {
  id: "sh_demo",
  cols: 3,
  rows: 3,
  colNames: [
    {
      col: 0,
      value: "Price",
    },
    {
      col: 1,
      value: "Reward Rate",
    },
    {
      col: 2,
      value: "Annual Reward in $",
    },
  ],
  data: {
    A1: {
      id: "A1",
      edit: false,
      value: "1000",
      outputCells: {},
      inputCells: {},
    },
    B1: {
      id: "B1",
      edit: false,
      value: "15",
      outputCells: {},
      inputCells: {},
    },
    C1: {
      id: "C1",
      edit: false,
      value: "=A1*B1",
      outputCells: {},
      inputCells: {}
    },
  },
};
