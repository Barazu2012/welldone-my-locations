import { useState } from "react"
import classNames from 'classnames'

interface Props {
  icon: React.ForwardRefExoticComponent<any>
  onClick(): void
  title?: string
}
const LocationListAction = ({onClick, icon: Icon, title}: Readonly<Props>) => {
  const [isSelected, setIsSelected] = useState(false)
  const className = classNames('list-action', {selected: isSelected})
  const handleClick = () => {
    setIsSelected(!isSelected)
    onClick()
  }
  return (
    <div className={className} onClick={handleClick}>
      <Icon className="icon" title={title}/>
    </div>
  )
}

export default LocationListAction
