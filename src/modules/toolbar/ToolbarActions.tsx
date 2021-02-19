import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../../store";
import { deleteCategory, selectCategory } from "../../store/Categories";
import queryString from 'query-string'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { EntityAction, generalActions, selectedEntityActions } from './toolbarActionsConfig'
import { Modal } from "antd";
import React from "react";
import ToolbarAction from "./ToolbarAction";

const ToolbarActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentContext = useTypedSelector(state => state.context.current)
  const isCategory = currentContext === 'categories'
  const entityState = useTypedSelector(state => isCategory ? state.categories : state.locations)
  const selectedEntity = entityState.selected
  const entityName = isCategory ? 'category' : 'location'

  const onDelete = () => {
    if (!selectedEntity) return
    dispatch(deleteCategory(selectedEntity.name))
    dispatch(selectCategory(undefined))
    history.push('/')
  }

  const handleAction = ({type, path}: EntityAction) => {
    const search = selectedEntity ? queryString.stringify({entityName: selectedEntity.name}) : undefined
    
    switch (type) {
      case 'add': case 'edit': case 'view':
        history.push({ pathname: path, search })
        break
      case 'delete':
        Modal.confirm({
          title: `Delete ${entityName.toUpperCase()}`,
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to delete this category?',
          onOk: onDelete,
          okType: 'danger',
          okText: 'Delete',
          maskClosable: true
        })
        break
      default:
        console.error(`No handler for ${type} action`)
    }
  }
  
  const availableActions = function() {
    return selectedEntity ? selectedEntityActions : generalActions
  }()

  return (
    <div className="toolbar-actions">
      {
        availableActions.map((action) => (
          <ToolbarAction key={action.type} action={action} onClick={handleAction}/>
        ))
      }
    </div>
  )
}

export default ToolbarActions