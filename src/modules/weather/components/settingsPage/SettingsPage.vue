<template>
  <section class="settings-window">
    <WidgetHeader>
      <div class="header-title">Settings</div>
      <img
        src="@/assets/weather/icons/close-white.svg"
        alt="open settings menu"
        @click="handleToggleSettingsView"
      />
    </WidgetHeader>

    <div v-if="citiesData.length" class="cities">
      <div v-for="city in citiesData" class="cities-item" :key="city.id">
        <img
          @dragstart="handleDragstart($event, city)"
          @dragend="handleDragend"
          @dragleave="handleDragleave"
          @dragover="handleDragover"
          @drop="handleDrop($event, city)"
          src="@/assets/weather/icons/hamburger-menu.svg"
          alt="burger-menu"
          class="icon-burger-menu"
          :draggable="true"
        />
        {{ city.name }}
        <img
          src="@/assets/weather/icons/trash.svg"
          alt="trash-bin"
          @click="removeCity(city.name)"
          class="icon-trash-menu"
        />
      </div>
    </div>

    <div class="content">
      <Input
        :cities="searchedCities"
        :loading="areCitiesLoading"
        :error="!!error"
        @handleClearSearch="handleClearSearch"
        @handleItemClick="handleCityClick"
        v-model:citySearch="citySearch"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import WidgetHeader from './../../UI/WidgetHeader.vue';
import Input from './CitiesInput.vue';
import { onMounted, watch, ref } from 'vue';
import { getFromLocalStorage } from '@/utils/localStorage';
import { WeatherFullInfo } from '../../types/weather';
import { useCityWeather } from '../../composables/useCityWeather';
import { useFetchCities } from '../../composables/useFetchCities';
import { useDragAndDropCities } from '../../composables/useDragAndDropCities';
import { debounce } from '@/utils/debounce';

type Emits = {
  (e: 'update:citySearch', value: string): void;
  (e: 'handleClearSearch'): void;
  (e: 'handleToggleSettings'): void;
};
const emits = defineEmits<Emits>();

const { handleCityClick, removeCity, citiesData } = useCityWeather();
const { areCitiesLoading, searchedCities, fetchCitiesData, error } =
  useFetchCities();
const {
  handleDragend,
  handleDragleave,
  handleDragover,
  handleDragstart,
  handleDrop,
} = useDragAndDropCities(citiesData);

const citySearch = ref('');
const debauncedFetchCitiesData = debounce(fetchCitiesData, 500);

const handleClearSearch = () => (citySearch.value = '');

const getSelectedCitiesFromStorage = () => {
  const citiesInfo = getFromLocalStorage(
    'fetchedWetherDataByCity'
  ) as WeatherFullInfo[];

  if (!citiesInfo) return;

  citiesData.value = citiesInfo;
};

const handleToggleSettingsView = () => emits('handleToggleSettings');

watch(citySearch, () => {
  debauncedFetchCitiesData(citySearch.value);
});

onMounted(getSelectedCitiesFromStorage);
</script>

<style lang="scss">
.icon-burger-menu {
  cursor: grab;
}

.icon-trash-menu {
  cursor: pointer;
}

.cities {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &-item {
    padding: 3px;
    justify-content: space-between;
    display: flex;
    background-color: rgb(150, 150, 150);
    border-radius: 3px;
  }

  img {
    // cursor: pointer;
    width: 20px;
    display: block;
  }
}

.content {
  padding-top: 35px;
}

.separator {
  height: 1px;
  width: 10%;
  margin: 25px 0;
  background: #ccc;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
