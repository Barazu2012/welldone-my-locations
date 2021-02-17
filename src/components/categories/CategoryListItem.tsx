import classNames from "classnames"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import Category from "../../models/Category"
import { useTypedSelector } from "../../store"
import { selectCategory } from "../../store/Categories"

interface Props {
  category: Category
}

const CategoryListItem = ({ category }: Readonly<Props>) => {
  const selectedCategory = useTypedSelector(state => state.categories.selected)
  const dispatch = useDispatch()

  const isSelected = category.name === selectedCategory?.name
  
  const itemClassName = useMemo(() => {
      return classNames('category-list-item', {selected: isSelected})
  }, [isSelected])


  const toggleSelection = (category: Category) => {
    const selection = isSelected ? undefined : category.name
    dispatch(selectCategory(selection))
  }

  return (
    <div className={itemClassName} key={category.name} onClick={() => toggleSelection(category)}>
      {category.name} 
    </div>
  )
}

export default CategoryListItem