/* eslint-disable */
import { City } from '../types/cities';
import { ref, watch } from 'vue';
import { useWeatherByCoords } from './useWeatherByCoords';
import { WeatherFullInfo } from '../types/weather';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';

export const useCityWeather = () => {
  const { fetchWeatherData, weatherData } = useWeatherByCoords();
  let citiesData = ref<WeatherFullInfo[]>([]);
  let cityOrder = ref((getFromLocalStorage('lastCityOrder') as number) || 1);

  const removeCity = (cityName: string) => {
    citiesData.value = citiesData.value.filter(
      (city: WeatherFullInfo) => city.name !== cityName
    );
  };

  const getCityWeather = async (latitude: number, longitude: number) => {
    await fetchWeatherData(latitude, longitude);

    const chosenCityNames = citiesData.value.map((city) => city.name);

    if (!weatherData.value || chosenCityNames.includes(weatherData.value.name))
      return;

    citiesData.value.push({ ...weatherData.value, order: cityOrder.value });

    cityOrder.value++;
  };

  const handleCityClick = async (city: City) => {
    await getCityWeather(city.lat, city.lon);
  };

  watch(
    citiesData,
    () => setToLocalStorage('fetchedWetherDataByCity', citiesData.value),
    { deep: true }
  );

  watch(cityOrder, () => setToLocalStorage('lastCityOrder', cityOrder.value));

  return {
    removeCity,
    handleCityClick,
    citiesData,
  };
};
