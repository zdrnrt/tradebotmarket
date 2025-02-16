import classNames from 'classnames';
import style from './Chart.module.scss';

export default function Chart({value}){
  return (
    <div className={style['chart']}>
      <div className={classNames(style['chart__value'], {[style['chart__value--green']]: value >= 0}, {[style['chart__value--red']]: value < 0})}>{value > 0 ? '+' : ''}{!!value ? value : '—'}%</div>
      {/* <div className={classNames(style['chart__value'], {[style['chart__value--green']]: value >= 0}, {[style['chart__value--red']]: value < 0})}>{value > 0 ? '+' : ''}32.6%</div> */}
      <img src='/img/home/chart.png' alt="chart" className={style['chart__item']}/>
    </div>
  )
}