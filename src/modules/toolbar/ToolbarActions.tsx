import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../../store";
import { deleteCategory, selectCategory } from "../../store/Categories";
import queryString from 'query-string'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CategoryAction, generalActions, selectedCategoryActions } from './toolbarActionsConfig'
import { Modal } from "antd";
import React from "react";
import ToolbarAction from "./ToolbarAction";

const ToolbarActions = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const selectedCategory = useTypedSelector(state => state.categories.selected)

  const onDelete = () => {
    if (!selectedCategory) return
    dispatch(deleteCategory(selectedCategory.name))
    dispatch(selectCategory(undefined))
    history.push('/')
  }

  const handleAction = ({type, path}: CategoryAction) => {
    const search = selectedCategory ? queryString.stringify({categoryName: selectedCategory.name}) : undefined
    
    switch (type) {
      case 'add': case 'edit': case 'view':
        history.push({ pathname: path, search })
        break
      case 'delete':
        Modal.confirm({
          title: 'Delete Category',
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
    return selectedCategory ? selectedCategoryActions : generalActions
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