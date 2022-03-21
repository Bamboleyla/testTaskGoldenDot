import * as axios from "axios";
import _ from 'lodash';

//Устанавливаем базовый URL для axios
const instance = axios.create({
    baseURL: 'https://www.cbr-xml-daily.ru/'
})

//Функция которая приводит дату в удобный формат для запроса
const formateDate = (date) => {
    const transformDate = new Date(date);
    let mount = transformDate.getMonth() + 1;
    mount = mount > 9 ? mount : `0${mount}`;
    const day = transformDate.getDate() > 9 ? transformDate.getDate() : `0${transformDate.getDate()}`
    return `${transformDate.getFullYear()}/${mount}/${day}`
}

const addValue = (val, newVal) => {
    for (let key in val.Valute) {
        val.Valute[key][formateDate(newVal.PreviousDate)] = newVal.Valute[key].Previous;
    }
    val.lastDate = newVal.PreviousDate;
}

export const valuteAPI = {
    getToday() {
        return instance.get(`daily_json.js`).then(response => response.data)
    },
    async getTenDays(value) {
        let copy = _.cloneDeep(value);
        copy.lastDate = value.PreviousDate;
        for (let i = 3; i <= 10; i++) {
            const res = await instance.get(`archive/${formateDate(copy.lastDate)}/daily_json.js`);
            addValue(copy, res.data);
        };
        return copy;
    }
}
