import './toolbar.scss'
import { Layout } from 'antd'
import { useTypedSelector } from '../../store'
import ToolbarActions from './ToolbarActions'
const { Header } = Layout

const Toolbar = () => {
  let selectedCategory = useTypedSelector(state => state.categories.selected)

  return (
    <Header className="toolbar">
      <h2 className="toolbar-title"> {!!selectedCategory ? selectedCategory.name : 'Categories'} </h2>
      <ToolbarActions />
    </Header>
  )
}

export default Toolbar