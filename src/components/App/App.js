import { useState } from 'react';
import { valuteAPI } from '../../api/api';
import { Home } from '../Home/Home';
import './App.css';

export const App = () => {

  const [today, setTodayValue] = useState();

  //Получаем курсы валют на сегодня и упаковываем их в массив
  const getTodayValue = () => {
    valuteAPI.getToday().then(result => {
      if (today === undefined) {
        let date = [];
        for (let key in result.Valute) {
          date.push(result.Valute[key])
        }
        setTodayValue(date)
      }
    });
  };

  getTodayValue();
  return <Home today={today} />
}
