import * as axios from "axios";
import _ from 'lodash';

//Устанавливаем базовый URL для axios
const instance = axios.create({
    baseURL: 'https://www.cbr-xml-daily.ru/'
})

//Функция которая приводит дату в удобный формат для запроса
const formateDate = (date) => {
    const mount = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    return `${date.getFullYear()}/${mount}/${day}`
}

const addValue = (val, newVal) => {
    for (let key in val.Valute) {
        val.Valute[key][formateDate(newVal.Date)] = newVal.Valute[key].Value;
        val.Valute[key][formateDate(newVal.PreviousDate)] = newVal.Valute[key].Previous;
    }
    val.lastDate = newVal.PreviousDate;
}

export const valuteAPI = {
    getToday() {
        return instance.get(`daily_json.js`).then(response => response.data)
    },
    getTenDays(value) {
        let lastDate = new Date(value.PreviousDate);
        value.lastDate = lastDate - (24 * 60 * 60 * 1000);
        let copyValue = _.cloneDeep(value);
        for (let i = 3; i <= 10; i++) {
            console.log('запрос', `archive/${formateDate(new Date(value.lastDate))}/daily_json.js`)
            instance.get(`archive/${formateDate(new Date(value.lastDate))}/daily_json.js`).then(res => addValue(copyValue, res))
            console.log(` запрос ${formateDate(new Date(value.lastDate))} обработан copyValue=`, copyValue);
        }
    }
}