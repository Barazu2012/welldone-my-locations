import { 
  ReadOutlined as ViewIcon,
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  PlusOutlined as AddIcon
} from '@ant-design/icons'

export interface EntityAction {
  type: 'delete' | 'edit' | 'view' | 'add',
  displayName: string,
  icon: typeof ViewIcon,
  path?: '/upsert' | '/view'
}

export const selectedEntityActions: EntityAction[] = [
  { type: 'delete', displayName: 'Delete', icon: DeleteIcon },
  { type: 'edit', displayName: 'Edit', icon: EditIcon, path: '/upsert' },
  { type: 'view', displayName: 'View Details', icon: ViewIcon,  path: '/view' }
]

export const generalActions: EntityAction[] = [
  { type: 'add', displayName: 'New Category', icon: AddIcon, path: '/upsert'}
]