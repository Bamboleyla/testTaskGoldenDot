import Tippy from '@tippyjs/react';
import './Home.css'
import 'tippy.js/dist/tippy.css'
import { Outlet } from 'react-router-dom';
export const Home = (props) => {
    //Вычисляем отклонения курса
    const deviation = (val, prev) => {
        const onePercent = prev * 0.01;
        const todayPercent = val / onePercent;
        const result = todayPercent > 100 ? todayPercent - 100 : todayPercent - 100;
        return result.toFixed(2);
    };
    return <div className="table">
        <table border="1">
            <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Код валюты</th>
                    <th>Значение в рублях</th>
                    <th>Отклонение в %</th>
                </tr>
            </thead>
            <tbody>
                {props.today === undefined ? null : props.today.map(e => {
                    const riseOrFall = deviation(e.Value, e.Previous)
                    return <Tippy content={e.Name} key={e.ID}>
                        <tr onClick={() => props.navigate(e.ID)}>
                            <td>{e.CharCode}</td>
                            <td>{e.NumCode}</td>
                            <td>{e.Value}</td>
                            <td style={riseOrFall >= 0 ? { color: 'green' } : { color: 'red' }}>{riseOrFall >= 0 ? `+${riseOrFall}` : riseOrFall}</td>
                        </tr>
                    </Tippy>
                })}
            </tbody>
        </table>
        <Outlet />
    </div >
}