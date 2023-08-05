import { onMounted, onUnmounted, computed, ref, Ref } from 'vue';
import { WeatherFullInfo } from '../types/weather';

export const useArrowNavigation = (
  weatherData: Ref<WeatherFullInfo[]>,
  func: (id: number) => void
) => {
  const currentIndex = ref(0);
  const cachedWeatherData = ref(weatherData);

  const selectedCity = computed(
    () => cachedWeatherData.value[currentIndex.value]
  );

  const moveForward = () => {
    currentIndex.value =
      (currentIndex.value + 1) % cachedWeatherData.value.length;

    func(selectedCity.value.id);
  };

  const moveBack = () => {
    currentIndex.value =
      (currentIndex.value - 1 + cachedWeatherData.value.length) %
      cachedWeatherData.value.length;

    func(selectedCity.value.id);
  };

  const handleNavigation = (event: KeyboardEvent) => {
    if (event.code === 'ArrowRight') moveForward();
    if (event.code === 'ArrowLeft') moveBack();
  };

  onMounted(() => window.addEventListener('keydown', handleNavigation));
  onUnmounted(() => window.removeEventListener('keydown', handleNavigation));

  return { moveBack, moveForward };
};
