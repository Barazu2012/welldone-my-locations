import { FormInstance, Select } from 'antd'
import React from 'react'
import Category from '../../models/Category'

interface Props {
  categories: Category[],
  onSelect?(categoryName: string): void
  formItemName?: string
  form?: FormInstance<any>
  placeholder?: string
}

const CategorySelect = ({categories, form, formItemName, onSelect, placeholder}: Readonly<Props>) => {

  const defaultOnSelect = (categoryName: string) => {
    if (!form) return

    if (!formItemName) {
      console.error('must set forItemName touse inside form')
      return
    }

    form.setFieldsValue({[formItemName]: categoryName})
  }

  const handleSelect = onSelect || defaultOnSelect
  placeholder = placeholder || "Select a category"

  return (
    <Select placeholder={placeholder} showSearch filterOption onSelect={handleSelect} 
      defaultValue={form?.getFieldValue('category')} allowClear onClear={() => handleSelect("")}>
      {
        categories.map(({name}) => (
          <Select.Option value={name} key={name}> {name} </Select.Option>
        ))
      }
    </Select> 
  )
}

export default CategorySelect