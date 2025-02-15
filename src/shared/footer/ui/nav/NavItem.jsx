import style from './NavItem.module.scss'

export default function NavItem({link, icon, title, current, notification}){
  const className = style['item'] + (current ? ' ' + style['item--active'] : '')
  return(
    <a href={link} className={className}>
      <span className={style['item__preview']}>
        {!!notification && <span className={style['item__notification']}>{notification}</span>}
        <img src={icon} alt={title} />
      </span>
      <span className={style['item__title']}>{title}</span>
    </a>
  )
}