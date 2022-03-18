import { useState } from 'react';
import { valuteAPI } from '../../api/api';
import { Home } from '../Home/Home';
import './App.css';

export const App = () => {
  const [today, setTodayValue] = useState();

  const getTodayValue = () => {
    valuteAPI.getToday().then(result => {
      if (today === undefined) {
        setTodayValue(result.Valute)
      }
    });
  }
  getTodayValue();
  return <Home today={today} />
}
