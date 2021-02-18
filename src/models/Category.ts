import IEntity from "./IEntity"

export default class Category implements IEntity {
  name: string

  constructor(name: string) {
    this.name = name
  }
}