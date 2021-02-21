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

  const allLocations = useTypedSelector(state => state.locations.all)
  const categories = useTypedSelector(state => state.categories.all)

  const getLocationCategoriesArray = (location: Location): string[] => location.categories.map(c => c.name)

  const updatedLocations = getUpdatedLocations(allLocations)

  const updatedLocationsByCategory = new Map<string, Category[]>()
  for (let category of getCategoriesWithLocations(updatedLocations)) {
    const updatedCategoryLocations = updatedLocations
      .filter(l => getLocationCategoriesArray(l)
      .includes(category.name)
    )
    
    if (!updatedCategoryLocations.length) continue

    updatedLocationsByCategory.set(category.name, updatedCategoryLocations)
  }

  function getCategoriesWithLocations(locations: Location[]): Category[] {
    return categories.filter(c => locations
      .find(l => l.categories
      .map(lc => lc.name).includes(c.name))
    )
  }

  function sortLocations(locations: Location[]) {
    return locations.sort((l1, l2) => {
      const [name1, name2] = [l1.name.toLowerCase(), l2.name.toLowerCase()]
      return name1.localeCompare(name2)
    })
  }

  function getCategoryNameFilteredLocations(locations: Location[]): Location[] {
    if (!categoryNameFilter) return locations
    return locations.filter(l => getLocationCategoriesArray(l).includes(categoryNameFilter))
  }

  function getUpdatedLocations(locations: Location[]): Location[] {
    let res = sortActive ? sortLocations(clone(locations)) : locations
    return getCategoryNameFilteredLocations(res)
  }

  const toggleSort = () => { setSortActive(!sortActive) }
  const filterByCategory = (categoryName: string) => { setCategoryNameFilter(categoryName) }
  const toggleGroupByCategory = () => { setGroupByCategoryActive(!groupByCategoryActive) }

  const getCategoryLocations = (categoryName: string): Location[] => (
    updatedLocationsByCategory.get(categoryName) as Location[]
  )

  return (
    <>
      { !!allLocations.length &&
        <div className="list-actions-container">
          <div className="filter-wrapper">
            <CategorySelect categories={getCategoriesWithLocations(allLocations)} onSelect={filterByCategory}
              placeholder="Filter by Category"/>
          </div>
          <LocationListAction icon={SortIcon} onClick={toggleSort} title="Sort Alphabetically"/>
          <LocationListAction icon={GroupByIcon} onClick={toggleGroupByCategory} title="Group by category"/>
        </div>
      }
      { groupByCategoryActive ?
        getCategoriesWithLocations(updatedLocations).map((category, idx) => (
          <div className={`section${!idx ? ' first' : ''}`} key={category.name}>
            <span className="section-title">{category.name}</span>
            <EntityList items={getCategoryLocations(category.name)} type="location"/>
          </div>
        )) :
        <EntityList items={updatedLocations} type="location"/>
      }
    </>
  )
}

export default LocationList