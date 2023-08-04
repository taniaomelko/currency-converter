import axios from "axios";

export const getData = async (cacheDuration = 3600000) => {
  const cacheKey = 'fetchedData';
  const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));

  if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
    return cachedData.data;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));

    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};
