import { WeatherFullInfo } from '../types/weather';
import { ref, Ref } from 'vue';

export const useDragAndDropCities = (citiesData: Ref<WeatherFullInfo[]>) => {
  const cardToMove = ref<WeatherFullInfo | null>(null);

  const sortCities = (a: WeatherFullInfo, b: WeatherFullInfo) => {
    if (!a.order || !b.order) return 0;

    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  const setHoverBgColor = (event: DragEvent) =>
    ((
      (event.target as HTMLDivElement).closest('div') as HTMLDivElement
    ).style.backgroundColor = 'rgb(113, 113, 113)');

  const setPrimaryBgColor = (event: DragEvent) =>
    ((
      (event.target as HTMLDivElement).closest('div') as HTMLDivElement
    ).style.backgroundColor = 'rgb(150, 150, 150)');

  const reorderCities = (city: WeatherFullInfo) => {
    citiesData.value = citiesData.value
      .map((c) => {
        if (!cardToMove.value) return c;

        if (c.id === city.id) {
          return { ...c, order: cardToMove.value.order };
        }

        if (c.id === cardToMove.value.id) {
          return { ...c, order: city.order };
        }

        return c;
      })
      .sort(sortCities);
  };

  const handleDragstart = (event: DragEvent, city: WeatherFullInfo) => {
    cardToMove.value = city;
    setPrimaryBgColor(event);
  };
  const handleDragend = (event: DragEvent) => {
    setPrimaryBgColor(event);
  };
  const handleDragleave = (event: DragEvent) => {
    setPrimaryBgColor(event);
  };
  const handleDragover = (event: DragEvent) => {
    event.preventDefault();
    setHoverBgColor(event);
  };
  const handleDrop = (event: DragEvent, city: WeatherFullInfo) => {
    event.preventDefault();
    setPrimaryBgColor(event);
    reorderCities(city);
  };

  return {
    handleDragstart,
    handleDragend,
    handleDragover,
    handleDragleave,
    handleDrop,
  };
};
