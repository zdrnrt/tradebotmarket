import style from './Chart.module.scss'

export default function Chart(){
  return (
    <div className={style['chart']}>
      <img src='/img/home/chart.png' alt="chart" className={style['chart__item']}/>
    </div>
  )
}