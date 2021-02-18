import { EntityAction } from './toolbarActionsConfig'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'

interface Props {
  action: EntityAction
  onClick(action: EntityAction): void
}

const ToolbarAction = ({action, onClick}: Readonly<Props>) => {
  const location = useLocation()
  const { type, displayName, icon: Icon } = action
  const selected = action.path && location.pathname.includes(action.path)
  const actionClass = classNames('toolbar-action', {selected})

  return (
    <div className={actionClass} key={type} title={displayName} onClick={() => onClick(action)}>
      <Icon className="toolbar-action-icon" />
    </div>
  )
}

export default ToolbarAction
