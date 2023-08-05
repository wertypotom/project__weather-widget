import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL_BY_ID } from '../api';
import { ref } from 'vue';
import { WeatherFullInfo } from '../types/weather';

export const useWeatherByCoords = () => {
  const isWeatherLoading = ref(false);
  const error = ref<string | null>('');
  const weatherData = ref<WeatherFullInfo | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    const url = `${WEATHER_API_URL_BY_ID}?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

    try {
      isWeatherLoading.value = true;
      const { data } = await axios.get<WeatherFullInfo>(url);
      weatherData.value = data;
      isWeatherLoading.value = false;
    } catch (e) {
      error.value = (e as Error).message;
    }
  };

  return { fetchWeatherData, weatherData, isWeatherLoading, error };
};
