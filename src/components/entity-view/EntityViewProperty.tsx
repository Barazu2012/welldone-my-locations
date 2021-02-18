import './entity-view-property.scss'
import classNames from 'classnames'

interface Props {
  label: string
  values: string | number | string[]
  className?: string
  onValueClick?(val: string | number): void
}
const EntityViewProperty = ({label, values, className, onValueClick}: Readonly<Props>) => {
  const itemClassName = classNames("property-wrapper", className)
  const handleValueClick = (value: string | number) => {
    if (!onValueClick) return
    onValueClick(value)
  }
  return (
    <div className={itemClassName}>
      <span className="label"> {label} </span>
      {
        Array.isArray(values) ? values.map((value, idx) => {
          let text = idx < values.length - 1 ? `${value}, ` : value
          return <span className="value" key={idx} onClick={() => handleValueClick(value)}>{text}</span>
        }) :
        <span className="value" onClick={() => handleValueClick(values)}> {values} </span>
      }
  </div>
  )
}

export default EntityViewProperty