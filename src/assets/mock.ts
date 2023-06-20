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
  data: [
    [
      {
        col: 0,
        row: 0,
        edit: false,
        value: "1000",
      },
      {
        col: 1,
        row: 0,
        edit: false,
        value: "15",
      },
      {
        col: 2,
        row: 0,
        edit: false,
        value: "=A1*B1",
      },
    ],
    // [
    //   {
    //     col: 0,
    //     row: 1,
    //     edit: false,
    //     format: "$",
    //     value: "1000",
    //   },
    //   {
    //     col: 1,
    //     row: 1,
    //     edit: false,
    //     format: "%",
    //     value: "15",
    //   },
    //   {
    //     col: 2,
    //     row: 1,
    //     edit: false,
    //     format: "$",
    //     value: "=A1*B1",
    //   },
    // ],
    // [
    //   {
    //     col: 0,
    //     row: 2,
    //     edit: false,
    //     format: "$",
    //     value: "1000",
    //   },
    //   {
    //     col: 1,
    //     row: 2,
    //     edit: false,
    //     format: "%",
    //     value: "15",
    //   },
    //   {
    //     col: 2,
    //     row: 2,
    //     edit: false,
    //     format: "$",
    //     value: "=A1*B1",
    //   },
    // ],
  ],
};
