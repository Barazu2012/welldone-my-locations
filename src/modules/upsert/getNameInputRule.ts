import { Entity } from "../../components/entity-list/EntityList"

const getNameInputRule = (entities: Entity[], initialName: string | undefined, entityName: 'category' | 'location') => {
  return [{required: true, message: `Please enter a ${entityName}`},
  {
    validator: (rule: any, newName: string) => { 
      const nameTaken = !!entities.find(c => c.name === newName) && initialName !== newName
      const message = `A ${entityName} with this name already exists`
      return nameTaken ? Promise.reject(message) : Promise.resolve() 
    }
  }]
}

export default getNameInputRule