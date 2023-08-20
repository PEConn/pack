export enum ItemState {
  ToDo,
  Packed,
  Unneeded,
}

export class Item {
  constructor(
    readonly name: string,
    readonly state: ItemState = ItemState.ToDo) {}
}