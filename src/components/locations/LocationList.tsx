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

  const getLocationCategoriesArray = (location: Location): string[] => location.categories.map(c => c.name)
  const categoriesWithLocations = categories.filter(c => locations
    .find(l => l.categories
    .map(lc => lc.name).includes(c.name))
  )

  const locationsByCategory = new Map<string, Category[]>()
  for (let category of categoriesWithLocations) {
    const categoryLocations = locations
      .filter(l => getLocationCategoriesArray(l)
      .includes(category.name)
    )

    if (categoryLocations.length) {
      locationsByCategory.set(category.name, categoryLocations)
    }
  }

  const sortLocations = (locations: Location[]) => {
    return locations.sort((l1, l2) => {
      const [name1, name2] = [l1.name.toLowerCase(), l2.name.toLowerCase()]
      return name1.localeCompare(name2)
    })
  }

  const getUpdatedLocations = (locations: Location[]): Location[] => {
    let res = sortActive ? sortLocations(clone(locations)) : locations
    return categoryNameFilter ? 
      res.filter(l => getLocationCategoriesArray(l).includes(categoryNameFilter)) :
      res
  }

  const toggleSort = () => { setSortActive(!sortActive) }
  const filterByCategory = (categoryName: string) => { setCategoryNameFilter(categoryName) }
  const toggleGroupByCategory = () => { setGroupByCategoryActive(!groupByCategoryActive) }

  const getCategoryUpdatedLocations = (categoryName: string): Location[] => {
    const locations = locationsByCategory.get(categoryName) as Location[]
    return getUpdatedLocations(locations)
  }

  return (
    <>
      { !!locations.length &&
        <div className="list-actions-container">
          <div className="filter-wrapper">
            <CategorySelect categories={categoriesWithLocations} onSelect={filterByCategory}
              placeholder="Filter by Category"/>
          </div>
          <LocationListAction icon={SortIcon} onClick={toggleSort} title="Sort Alphabetically"/>
          <LocationListAction icon={GroupByIcon} onClick={toggleGroupByCategory} title="Group by category"/>
        </div>
      }
      { groupByCategoryActive ?
        categoriesWithLocations.map((category, idx) => (
          <div className={`section${!idx ? ' first' : ''}`} key={category.name}>
            <span className="section-title">{category.name}</span>
            <EntityList items={getCategoryUpdatedLocations(category.name)} type="location"/>
          </div>
        )) :
        <EntityList items={getUpdatedLocations(locations)} type="location"/>
      }
    </>
  )
}

export default LocationList