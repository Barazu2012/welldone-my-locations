import './toolbar.scss'
import { Layout } from 'antd'
import { useTypedSelector } from '../../store'
import ToolbarActions from './ToolbarActions'
const { Header } = Layout

const Toolbar = () => {
  //todo: reuse
  const currentContext = useTypedSelector(state => state.context.current)
  const isCategory = currentContext === 'categories'
  const entityState = useTypedSelector(
    state => isCategory ? state.categories : state.locations
  )
  const selectedEntity = entityState.selected
  const defaultTitle = isCategory ? 'Categories' : 'Locations'

  return (
    <Header className="toolbar">
      <h2 className="toolbar-title"> {!!selectedEntity ? selectedEntity.name : defaultTitle} </h2>
      <ToolbarActions />
    </Header>
  )
}

export default Toolbar