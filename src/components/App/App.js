import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { valuteAPI } from '../../api/api';
import { Home } from '../Home/Home';
import { Load } from '../Load/Load';
import { TenDays } from '../TenDays/TenDays';

export const App = () => {

  const [today, setTodayValue] = useState();
  const [tenDayValue, settenDayValue] = useState();

  //Получаем курсы валют на сегодня и упаковываем их в массив
  const getTodayValue = () => {
    valuteAPI.getToday().then(result => {
      if (today === undefined) {
        settenDayValue(result);
        let date = [];
        for (let key in result.Valute) {
          date.push(result.Valute[key])
        }
        setTodayValue(date)
      }
    });
  };

  getTodayValue();

  let navigate = useNavigate();

  let changeUrl = (id) => {
    navigate("load", { replace: true });
    const result = valuteAPI.getTenDays(tenDayValue);
    result.then(res => {
      for (let key in res.Valute) {
        if (res.Valute[key].ID === id) {
          console.log('tenDaysValue', res.Valute[key]);
        }
      }
    }
    );
    //navigate("./ten", { replace: true });
  };
  return <div>
    <Routes>
      <Route path="/" element={<Home today={today} navigate={changeUrl} />} >
        <Route path="ten" element={<TenDays />} />
        <Route path="load" element={<Load />} />
      </Route>
    </Routes>
  </div>
}
