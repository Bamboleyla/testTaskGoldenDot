import * as axios from "axios";

//Устанавливаем базовый URL для axios
const instance = axios.create({
    baseURL: 'https://www.cbr-xml-daily.ru/'
})

export const valuteAPI = {
    getToday() {
        return instance.get(`daily_json.js`).then(response => response.data)
    },
}