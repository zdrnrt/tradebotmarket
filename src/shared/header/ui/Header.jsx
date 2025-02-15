import style from './Header.module.scss'


export default function Header(){
  return (
    <header className={style['header']}>
      <button className={`${style['header__control']} ${style['header__control--menu']}`}>
        <img src="/img/header/menu.png" alt="menu" />
      </button>
      <span className={style['header__title']}>Dashboard</span>
      <button className={`${style['header__control']} ${style['header__control--refresh']}`}>
        <img src="/img/header/refresh.png" alt="Refresh" />
      </button>
    </header>
  )
}