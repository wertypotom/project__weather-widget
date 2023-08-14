import axios, { AxiosResponse } from 'axios';

export const WEATHER_API_URL_BY_ID =
  'https://api.openweathermap.org/data/2.5/weather';

export const WEATHER_API_URL_BY_CITY =
  'https://api.openweathermap.org/geo/1.0/direct';

export const WEATHER_API_KEY = 'c09e83e4a1a55a335ad660611073bbe0';

export const weatherApi = {
  withCoords(lat: number, lon: number) {
    return `${WEATHER_API_URL_BY_ID}?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
  },
  withCity(city: string) {
    return `${WEATHER_API_URL_BY_CITY}?q=${city}&limit=5&appid=${WEATHER_API_KEY}`;
  },
};

export const fetchData = async <T>(
  api: string
): Promise<{ data: T | null }> => {
  let data: T | null = null;

  try {
    const response: AxiosResponse<T> = await axios.get<T>(api);
    data = response.data;
  } catch (err) {
    throw new Error(
      axios.isAxiosError(err)
        ? err.message
        : 'An error occurred while fetching the data.'
    );
  }

  return {
    data,
  };
};
