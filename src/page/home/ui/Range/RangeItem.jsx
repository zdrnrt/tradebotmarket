import classNames from 'classnames'
import style from './Range.module.scss'

export default function RangeItem({id, name, clickHandler, active}) {
  return (
    <button className={classNames(style['range'], {[style['range--active']]: active})} onClick={() => clickHandler(id)}>
      {name}
    </button>
  )
}