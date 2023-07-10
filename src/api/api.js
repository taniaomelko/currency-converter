import axios from "axios";

// const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
const URL = 'https://api.jsonserve.com/p5uK3k';

export async function getData() {
  const response = await axios.get(URL);
  // console.log(response.data);

  return response.data;
}
