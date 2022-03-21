import load from './Load.gif'
import './load.css'

export const Load = () => {
    return <div className="body">
        <div className='massage'>
            <p className='title'>Идет загрузка ...</p>
            <img src={load} alt="load" />
        </div>
    </div>
}