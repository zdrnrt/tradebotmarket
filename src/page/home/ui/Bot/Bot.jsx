import classNames from 'classnames';
import style from './Bot.module.scss';

export default function Bot({name, clickHandler, active, value}){
  return (
    <button className={classNames(style['bot'], {[style['bot--active']]: active})} onClick={() => clickHandler(name) }>
      <span className={style['bot__preview']}>
        <img src={`/img/home/bot/${name}.png`} alt={name} className={style['bot__icon']} />
      </span>
      <span className={style['bot__name']}>{name}</span>
      <span className={classNames(style['bot__value'], {[style['bot__value--green']]: value >= 0}, {[style['bot__value--red']]: value < 0})}>{value}</span>
    </button>
  )
}