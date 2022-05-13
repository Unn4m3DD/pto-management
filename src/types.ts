import * as React from "react";

export interface Person {
  name: string,
  holidays: number[],
  selected: boolean,
  holidayCount: number
}
export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>