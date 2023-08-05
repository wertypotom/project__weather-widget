import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL_BY_CITY } from '../api';
import { ref } from 'vue';
import { City } from '../types/cities';

export const useFetchCities = () => {
  const areCitiesLoading = ref(false);
  const error = ref<string | null>('');
  const searchedCities = ref<City[] | null>(null);

  const fetchCitiesData = async (city: string) => {
    if (!city) return (searchedCities.value = null);

    const url = `${WEATHER_API_URL_BY_CITY}?q=${city}&limit=5&appid=${WEATHER_API_KEY}`;

    try {
      areCitiesLoading.value = true;
      const { data } = await axios.get<City[]>(url);
      searchedCities.value = data;
    } catch (e) {
      error.value = (e as Error).message;
      searchedCities.value = null;
    } finally {
      areCitiesLoading.value = false;
    }
  };

  return { fetchCitiesData, searchedCities, areCitiesLoading, error };
};
