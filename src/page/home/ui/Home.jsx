import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Footer from '../../../shared/footer';
import Header from '../../../shared/header';
import Chart from './Chart/Chart';
import RangeItem from './Range/RangeItem';
import style from './Home.module.scss';

import jsonData from '../api/data.min.json';
import ranges from '../config/ranges';
import Bot from './Bot/Bot';

export default function Home(){

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const [activeBot, setActiveBot] = useState(null);
  const changeBot = useCallback( (name) => setActiveBot(name), [])
  const [activeRange, setActiveRange] = useState(null)
  const changePeriod = useCallback( (id) => setActiveRange(id), [])

  useEffect( () => {
    // включение дефолтного первого периода
    setActiveRange(ranges[0].id);

    // проверка на данные в localStorage
    if (localStorage.getItem('botData') && JSON.parse(localStorage.getItem('botData'))){
      const localData = JSON.parse(localStorage.getItem('botData'));
      if ( Date.now() < ( new Date(Number(localData.time) + 3600000) ) ){
        setData(localData);
        setLoading(false);
        return 
      }
    }

    // пример асинхронности
    const timer = setTimeout(() => {
      setData(jsonData);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer)
/*
    fetch('API_URL')
      .then( (response) => {
        if (!response.ok){
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then( (data) => {
        setData(data);
      })
      .catch( (error) => {
        console.log(error);
        setError(true);
      })
      .finally( () => {
        setLoading(false);
      })
*/
  }, [])
  
  useEffect(() => {
    // првоерка данных на пустоту
    if (Object.keys(data).length > 0){
      // проверка и включение дефолтного первого бота
      if (data?.bots?.length > 0){
        setActiveBot(data.bots[0].name)
      }
      // сохранение данных в localStorage и добавление ключа для обновления
      data.time = Date.now();
      localStorage.setItem('botData', JSON.stringify(data));
    }
    return
  }, [data]);
  
  let botList = [];
  let chartValue = null;
  
  if (data?.bots?.length > 0){
    botList = data.bots.map((el) => {
      return <Bot key={el.name} name={el.name} clickHandler={changeBot} active={activeBot === el.name} value={el[activeRange]}/>
    })
    if (data.bots.find( (el) => el.name === activeBot)){
      chartValue = data.bots.find( (el) => el.name == activeBot)[activeRange]
    }
  }
  
  let rangeList = ranges.map( (el) => 
    <RangeItem key={el.id} id={el.id} name={el.name} clickHandler={changePeriod} active={activeRange == el.id}  />
  )


  
  return (
    <>
      <Header />
      <main className={classNames(style['home'], {[style['home--loading']]: loading || error }) }>
        { loading && <div className={style['loading']}>Loading...</div> }
        { error && <div className={style['error']}>Error, reload page</div> }
        <div className={style['content']}>
          <header className={style['header']}>
            <div className={style['header__title']}>Trading capital</div>
            <div className={style['header__value']}>
              <div className={style['header__capital']}>
                { (data.trading_capital && data.trading_capital_currency) ? `${data.trading_capital} ${data.trading_capital_currency}` : '—'}
              </div>
              <div className={classNames(style['header__wallet'], style['wallet'])}>
                <div className={style['wallet__item']}>
                  <span className={style['wallet__title']}>Balance:</span>
                  <span className={style['wallet__value']}>{data.balance ? data['balance'] : '—'}</span>
                  <img src='/img/home/value-icon.png' alt='Balance' className={style['wallet__icon']}/>
                </div>
                <div className={style['wallet__item']}>
                  <span className={style['wallet__title']}>On hold:</span>
                  <span className={style['wallet__value']}>{data.on_hold ? data.on_hold : '—'}</span>
                  <img src='/img/home/value-icon.png' alt='On hold' className={style['wallet__icon']}/>
                </div>
              </div>
            </div>
          </header>
          <div className={style['chart']}>
            <Chart value={chartValue}/>
          </div>
          <div className={style['bot-list']}>
            {botList}
          </div>
          <div className={style['range']}>
            <div className={style['range__title']}>Time Range: </div>
            {rangeList}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}