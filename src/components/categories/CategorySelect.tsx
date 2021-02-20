import { FormInstance, Select } from 'antd'
import React from 'react'
import Category from '../../models/Category'

interface Props {
  categories: Category[],
  onSelect?(categoryName: string): void
  formData?: {form: FormInstance<any>, itemName: string}
  placeholder?: string
  multiple?: boolean
}

const CategorySelect = ({categories, formData, onSelect, placeholder, multiple}: Readonly<Props>) => {

  const handleSelect = (categoryName: string) => {
    if (formData) {
      const { form, itemName } = formData
      if (multiple) {
        let val = [categoryName]
        let currentCategoryNames = form.getFieldValue(itemName)
        if (currentCategoryNames) {
          currentCategoryNames = Array.isArray(currentCategoryNames) ? currentCategoryNames : [currentCategoryNames]
          val =  [...currentCategoryNames, categoryName]
        }
        form.setFieldsValue({[itemName]: val})
      } else {
        form.setFieldsValue({[itemName]: categoryName})
      }
    }

    onSelect?.(categoryName)
  }

  const onDeselect = (categoryName: string) => {
    if (!formData) return
    const { form, itemName } = formData

    let currentCategoryNames: string[] = form.getFieldValue(itemName)
    const categoryIdx = currentCategoryNames.indexOf(categoryName)
    currentCategoryNames.splice(categoryIdx)
  }

  placeholder = placeholder || "Select a category"
  const mode = multiple ? "multiple" : undefined

  return (
    <Select placeholder={placeholder} showSearch filterOption allowClear mode={mode} onSelect={handleSelect} 
      onDeselect={onDeselect} defaultValue={formData?.form.getFieldValue(formData?.itemName)} 
      onClear={() => handleSelect("")}
    >
      {
        categories.map(({name}) => (
          <Select.Option value={name} key={name}> {name} </Select.Option>
        ))
      }
    </Select> 
  )
}

export default CategorySelect