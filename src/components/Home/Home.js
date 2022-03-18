import './Home.css'
export const Home = (props) => {
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
                <tr>
                    <td>Ячейка 3</td>
                    <td>Ячейка 4</td>
                    <td>Ячейка 5</td>
                    <td>Ячейка 6</td>
                </tr>
            </tbody>
        </table>
    </div>
}