import { fetchData, weatherApi } from '../api';
import { ref } from 'vue';
import { WeatherFullInfo } from '../types/weather';

export const useWeatherByCoords = () => {
  const isWeatherLoading = ref(false);
  const error = ref<string | null>('');
  const weatherData = ref<WeatherFullInfo | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      isWeatherLoading.value = true;
      const { data } = await fetchData<WeatherFullInfo>(
        weatherApi.withCoords(lat, lon)
      );
      weatherData.value = data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isWeatherLoading.value = false;
    }
  };

  return { fetchWeatherData, weatherData, isWeatherLoading, error };
};
