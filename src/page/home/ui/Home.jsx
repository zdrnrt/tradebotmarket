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
  
  const changeBot = useCallback( (name) => {
    setActiveBot(name)
  }, [])

  const [activeRange, setActiveRange] = useState(null)

  const changePeriod = useCallback( (id) => setActiveRange(id), [])

  useEffect( () => {
    if (data?.bots?.length > 0){
      setActiveBot(data.bots[0].name)
    }
    return
  }, [data])

  useEffect( () => {
    setActiveRange(ranges[0].id);
    return
  }, [])

  useEffect( () => {

    // setTimeout(() => {
      setData(jsonData);
      setLoading(false);
      // setError(true);

    // }, 2000);
    // setLoading(false);
/*
    fetch('http://127.0.0.1:8080/src/page/home/api/data.min.json/')
    // fetch('/src/page/home/api/data.min.json/')
      .then( (response) => {
        if (!response.ok){
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then( (data) => {
        console.log(data);
        setTimeout(() => {
          setData(jsonData);
          setLoading(false);
        }, 2000);
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

  
  let botList = [];
  
  if (data.bots){
    botList = data.bots.map((el) => {
      return <Bot key={el.name} name={el.name} clickHandler={changeBot} active={activeBot == el.name} value={el[activeRange]}/>
    })
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
        <div className='content'>
          <header className={style['header']}>
            <div className={style['header__title']}>Trading capital</div>
            <div className={style['header__value']}>
              <div className={style['header__capital']}>
                { (data.trading_capital && data.trading_capital_currency) ? `${data.trading_capital} ${data.trading_capital_currency}` : '—'}
              </div>
              <div className={classNames(style['header__wallet'], style['wallet'])}>
                <div className={style['wallet__item']}>
                  <span className={style['wallet__title']}>Balance:</span>
                  <span className={style['wallet__value']}>{!!data.balance ? data['balance'] : '—'}</span>
                  <img src='/img/home/value-icon.png'/>
                </div>
                <div className={style['wallet__item']}>
                  <span className={style['wallet__title']}>On hold:</span>
                  <span className={style['wallet__value']}>{!!data.on_hold ? data.on_hold : '—'}</span>
                  <img src='/img/home/value-icon.png'/>
                </div>
              </div>
            </div>
          </header>
          <div className={style['chart']}>
            <Chart/>
          </div>
          <div className={style['bot-list']}>
            {botList}
          </div>
          {/* home - {activeBot} - {activeRange} */}
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