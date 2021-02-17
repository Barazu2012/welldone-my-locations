import './category-view.scss'
import { Link } from "react-router-dom"
import { MehTwoTone as MehIcon } from '@ant-design/icons'

const CategoryView = () => {

  return (
    <div className="category-view">
      <MehIcon className="category-view-icon"/>
      <span>Sorry, there's nothing here yet. </span>
      <span> 
        You should probably head back to the 
        <Link to="/"> categories list </Link>
      </span>
    </div>
  )
}

export default CategoryView
