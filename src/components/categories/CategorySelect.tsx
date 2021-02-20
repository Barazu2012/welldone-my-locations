import { FormInstance, Select } from 'antd'
import React from 'react'
import Category from '../../models/Category'

interface Props {
  categories: Category[],
  onSelect?(categoryName: string): void
  formData?: {form: FormInstance<any>, itemName: string}
  placeholder?: string
}

const CategorySelect = ({categories, formData, onSelect, placeholder}: Readonly<Props>) => {

  const defaultOnSelect = (categoryName: string) => {
    if (!formData) return
    const { form, itemName } = formData
    form.setFieldsValue({[itemName]: categoryName})
  }

  const handleSelect = onSelect || defaultOnSelect
  placeholder = placeholder || "Select a category"

  return (
    <Select placeholder={placeholder} showSearch filterOption allowClear onSelect={handleSelect} 
      defaultValue={formData?.form.getFieldValue('category')} onClear={() => handleSelect("")}>
      {
        categories.map(({name}) => (
          <Select.Option value={name} key={name}> {name} </Select.Option>
        ))
      }
    </Select> 
  )
}

export default CategorySelect