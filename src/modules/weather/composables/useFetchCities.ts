import { fetchData, weatherApi } from '../api';
import { ref } from 'vue';
import { City } from '../types/cities';

export const useFetchCities = () => {
  const areCitiesLoading = ref(false);
  const error = ref<string | null>('');
  const searchedCities = ref<City[] | null>(null);

  const fetchCitiesData = async (city: string) => {
    if (!city) return (searchedCities.value = null);

    try {
      areCitiesLoading.value = true;
      const { data } = await fetchData<City[]>(weatherApi.withCity(city));
      searchedCities.value = data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      areCitiesLoading.value = false;
    }
  };

  return { fetchCitiesData, searchedCities, areCitiesLoading, error };
};
