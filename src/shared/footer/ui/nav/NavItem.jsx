import style from './NavItem.module.scss'

export default function NavItem({link, icon, title, current, notification}){
  const currentLink = style['item'] + (current ? ' ' + style['item--active'] : '')
  console.log('menuitem', link, icon, title, current, currentLink)
  return(
    <a href={link} className={currentLink}>
      <span className={style['item__preview']}>
        {!!notification && <span className={style['item__notification']}>{notification}</span>}
        <img src={icon} alt={title} />
      </span>
      <span className={style['item__title']}>{title}</span>
    </a>
  )
}