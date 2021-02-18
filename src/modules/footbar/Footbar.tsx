import './footbar.scss'
import { Menu } from "antd"
import { useTypedSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { AppContext as Item, setContext } from '../../store/AppContext'
import { useHistory } from 'react-router-dom'

const items: Item[] = ['categories', 'locations']

const Footbar = () => {
  const dispatch = useDispatch()
  const currentContext = useTypedSelector(state => state.context.current)
  const history = useHistory()

  const onSelect = (item: Item) => {
    dispatch(setContext(item))
    history.push(`/${item}`)
  }

  return (
    <Menu className="footbar" mode="horizontal" theme="dark" selectedKeys={[currentContext]}
      defaultSelectedKeys={[currentContext]}>
      {
        items.map(item => (
          <Menu.Item className="footbar-item" key={item} onClick={() => onSelect(item)}>
            {item}
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default Footbar
