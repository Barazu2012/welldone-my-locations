import Category from "./Category"
import IEntity from "./IEntity"

type Coordinates = [number, number]

export default class Location implements IEntity {
  name: string
  address: string
  coordinates: Coordinates
  category: Category

  constructor(name: string, address: string, coordinates: Coordinates, category: Category) {
    this.name = name 
    this.address = address 
    this.coordinates = coordinates 
    this.category = category 
  }
}