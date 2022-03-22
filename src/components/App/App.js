import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { valuteAPI } from '../../api/api';
import { Home } from '../Home/Home';
import { TenDays } from '../TenDays/TenDays';

export const App = () => {

  const [today, setTodayValue] = useState();
  const [tenDay, setTenDay] = useState();
  const [valute, setValute] = useState();

  //Предзагрузка данных курсов валют за 10 рабочих дней
  const tenDayData = (data) => valuteAPI.getTenDays(data).then(res => setTenDay(res));

  //Получаем курсы валют на сегодня и упаковываем их в массив
  const getTodayValue = () => {
    valuteAPI.getToday().then(result => {
      if (today === undefined) {
        tenDayData(result);
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
    for (let key in tenDay.Valute) {
      if (tenDay.Valute[key].ID === id) {
        setValute(tenDay.Valute[key]);
      }
    }
    navigate("./ten", { replace: true });
  };

  return <div>
    <Routes>
      <Route path="/" element={<Home today={today} navigate={changeUrl} />} >
        <Route path="ten" element={<TenDays valute={valute} />} />
      </Route>
    </Routes>
  </div>
}
