import { NavLink } from 'react-router-dom';
import './tenDays.css'

export const TenDays = (props) => {
    return <div className="message">
        <NavLink to='/'>
            <div className='close'>X</div>
        </NavLink>
        <h2>{props.valute.Name}</h2>
        <ul>
            {props.valute.history.map(el => <li key={el[0]}>{el[0].slice(0, 10)} курс ${el[1]}</li>)}
        </ul>
    </div>
}