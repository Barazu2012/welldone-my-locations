
import './location-list.scss'
import React, { useState } from 'react'
import Location from '../../models/Location'
import { useTypedSelector } from '../../store'
import EntityList from '../entity-list/EntityList'
import clone from 'lodash/clone'
import CategorySelect from '../categories/CategorySelect'
import { SortAscendingOutlined as SortIcon, GroupOutlined as GroupByIcon} from '@ant-design/icons'
import Category from '../../models/Category'
import LocationListAction from './LocationListAction'

const LocationList = () => {
  const [sortActive, setSortActive] = useState(false)
  const [categoryNameFilter, setCategoryNameFilter] = useState<string>()
  const [groupByCategoryActive, setGroupByCategoryActive] = useState(false)

  const locations = useTypedSelector(state => state.locations.all)
  const categories = useTypedSelector(state => state.categories.all)
  const categoriesWithLocations = categories.filter(c => 
    locations.find(l => l.category.name === c.name)
  )

  let sortedLocations = clone(locations).sort((l1, l2) => {
    const [name1, name2] = [l1.name.toLowerCase(), l2.name.toLowerCase()]
    return name1.localeCompare(name2)
  })

  const updatedLocations = function(): Location[] {
    let res = sortActive ? sortedLocations : locations
    return categoryNameFilter ? res.filter(l => l.category.name === categoryNameFilter) : res
  }()

  const getCategoryLocations = (category: Category): Location[] => {
    return updatedLocations.filter(l => l.category.name === category.name)
  }
  
  const toggleSort = () => { setSortActive(!sortActive) }
  const filterByCategory = (categoryName: string) => { setCategoryNameFilter(categoryName) }
  const toggleGroupByCategory = () => { setGroupByCategoryActive(!groupByCategoryActive) }

  return (
    <>
      <div className="list-actions-container">
        <div className="filter-wrapper">
          <CategorySelect categories={categoriesWithLocations} onSelect={filterByCategory}
            placeholder="Filter by Category"/>
        </div>
        <LocationListAction icon={SortIcon} onClick={toggleSort} title="Sort Alphabetically"/>
        <LocationListAction icon={GroupByIcon} onClick={toggleGroupByCategory} title="Group by category"/>
      </div>
      { groupByCategoryActive ?
        categoriesWithLocations.map(category => (
          <div className="section" key={category.name}>
            <span>{category.name}</span>
            <EntityList items={getCategoryLocations(category)} type="location"/>
          </div>
        )) :
        <EntityList items={updatedLocations} type="location"/>
      }
    </>
  )
}

export default LocationList