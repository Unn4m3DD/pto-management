import * as React from "react";

export interface Person {
  name: string,
  holidays: Set<number>,
  selected: boolean,
  holidayCount: number,
  color: string
}
export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>