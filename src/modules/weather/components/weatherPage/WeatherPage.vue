<template>
  <WidgetHeader>
    <div class="loading" v-if="isWeatherLoading">
      <Loading loader-color="white" />
    </div>
    <div class="main-info-header" v-if="!!weatherData">
      <div>
        {{ weatherData.name }}
      </div>
      <img
        src="@/assets/weather/icons/gear.svg"
        alt="open settings menu"
        @click="$emit('handleToggleSettings')"
      />
    </div>
  </WidgetHeader>

  <div v-if="!!error">Ooops.... Can not get city data. Try again.</div>

  <div v-if="!!weatherData" class="main-info-wrapper">
    <img
      v-if="cachedWeatherData.length > 1"
      src="@/assets/weather/icons/arrow-left-circle.svg"
      alt="arrow left"
      class="arrow-icon"
      @click="moveBack"
    />
    <div :style="{ width: cachedWeatherData.length > 1 ? '225px' : '100%' }">
      <WeatherMainInfo :weatherData="weatherData" />
      <div class="main-info-details">
        <WeatherParameter
          v-for="param in weatherParams"
          :key="param.title"
          :title="param.title"
          :value="param.value"
        />
      </div>
    </div>
    <img
      v-if="cachedWeatherData.length > 1"
      src="@/assets/weather/icons/arrow-right-circle.svg"
      alt="arrow right"
      class="arrow-icon"
      @click="moveForward"
    />
  </div>

  <CityNavigation
    v-if="cachedWeatherData.length > 1"
    @getActiveCity="getActiveCity"
    :fetchedWetherDataByCity="cachedWeatherData"
    :activeCityId="weatherData?.id"
  />
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { WeatherFullInfo, WeatherParams } from './../../types/weather';
import Loading from './../../UI/DataLoading.vue';
import WeatherParameter from './WeatherParameter.vue';
import WidgetHeader from './../../UI/WidgetHeader.vue';
import { useUserLocation } from './../../composables/useUserLocation';
import { useWeatherByCoords } from './../../composables/useWeatherByCoords';
import { useArrowNavigation } from './../../composables/useArrowNavigation';
import CityNavigation from './CityNavigation.vue';
import { getFromLocalStorage } from '@/utils/localStorage';
import WeatherMainInfo from './WeatherMainInfo.vue';
// import ArrowRightCircle from '@/assets/weather/icons/arrow-right-circle.svg';

type Emits = {
  (e: 'handleToggleSettings'): void;
};

defineEmits<Emits>();

const cachedWeatherData = ref<WeatherFullInfo[]>([]);
const { getUserLocation } = useUserLocation();
const { weatherData, error, isWeatherLoading, fetchWeatherData } =
  useWeatherByCoords();
const { moveBack, moveForward } = useArrowNavigation(
  cachedWeatherData,
  getActiveCity
);

const fetchCurrentWeather = async () => {
  try {
    const {
      coords: { latitude, longitude },
    } = await getUserLocation();

    fetchWeatherData(latitude, longitude);
  } catch (error) {
    alert('Can not get coordinates');
  }
};

const initAppWithLocalStorage = (data: WeatherFullInfo[]) => {
  cachedWeatherData.value = data;
  weatherData.value = data[0];
};

function getActiveCity(id: number) {
  const activeCity = cachedWeatherData.value.find((city) => city.id === id);

  if (!activeCity) return;

  weatherData.value = activeCity;
}

const weatherParams = computed<WeatherParams[]>(() => {
  if (!weatherData.value) return [];

  return [
    {
      title: 'Feels like',
      value: `${Math.round(weatherData.value.main.feels_like)} °C`,
    },
    {
      title: 'Wind',
      value: `${weatherData.value.wind.speed} m/s`,
    },
    {
      title: 'Humidity',
      value: `${weatherData.value.main.humidity} %`,
    },
    {
      title: 'Pressure',
      value: `${weatherData.value.main.pressure} hPa`,
    },
  ];
});

onMounted(() => {
  const weatherData = getFromLocalStorage(
    'fetchedWetherDataByCity'
  ) as WeatherFullInfo[];

  if (!weatherData || !Array.isArray(weatherData) || !weatherData.length)
    return fetchCurrentWeather();

  initAppWithLocalStorage(weatherData);
});
</script>

<style lang="scss">
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
}

.weather {
  width: 300px;
  min-height: 200px;
  border-radius: 6px;
  box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
  color: #fff;
  background-color: #333;
  margin: 20px auto 0 auto;
  padding: 0 20px 20px 20px;
}

.main-info {
  &-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.arrow-icon {
  width: 25px;
  cursor: pointer;
}

.content {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &-temperature {
    font-weight: 600;
    font-size: 70px;
    width: auto;
    letter-spacing: -5px;
    margin-bottom: -20px;
  }

  &-details {
    margin-top: 10px;
    width: 100%;
  }
}

.parameter {
  &-row {
    display: flex;
    justify-content: space-between;
  }

  &-label {
    text-align: left;
    font-weight: 400;
    font-size: 12px;
  }

  &-value {
    text-align: right;
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
../../composables/useUserLocation
