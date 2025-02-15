import nav from "../config/nav"
import NavItem from "./nav/NavItem"
import style from './Footer.module.scss';

export default function Footer(){
  const currentPage = '/'
  let navList = nav.map( (el) => <NavItem key={el.id} link={el.link} icon={el.icon} title={el.title} current={currentPage == el.link} notification={el.notification} />)

  return (
    <footer className={style['footer']}>
      <nav className={style['footer__nav']}>
        {navList}
      </nav>
    </footer>
  )
}