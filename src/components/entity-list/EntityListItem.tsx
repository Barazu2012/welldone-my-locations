import classNames from "classnames"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import Category from "../../models/Category"
import { useTypedSelector } from "../../store"
import { Entity, EntityType } from "./EntityList"

interface Props {
  item: Entity
  type: EntityType
  onSelect(itemName: string | undefined): void
}

const EntityListItem = ({ item, type, onSelect }: Readonly<Props>) => {
  const entityState = useTypedSelector(state => type === 'category' ? state.categories : state.locations)
  const selectedItem = entityState.selected
  const dispatch = useDispatch()

  const isSelected = item.name === selectedItem?.name
  
  const itemClassName = useMemo(() => {
      return classNames('entity-list-item', {selected: isSelected})
  }, [isSelected])


  const toggleSelection = (item: Category) => {
    const selection = isSelected ? undefined : item.name
    dispatch(onSelect(selection))
  }

  return (
    <div className={itemClassName} key={item.name} onClick={() => toggleSelection(item)}>
      {item.name} 
    </div>
  )
}

export default EntityListItem