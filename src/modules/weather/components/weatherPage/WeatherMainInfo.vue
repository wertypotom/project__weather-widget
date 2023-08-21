<template>
  <div class="main-info">
    <img
      alt="weather"
      class="main-info-icon"
      :src="getImgUrl(weatherData.weather[0].icon)"
    />
    <div class="content-wrapper">
      <span class="content-temperature">
        {{ Math.round(weatherData.main.temp) }}°C
      </span>
      <p class="content-description">
        {{ weatherData.weather[0].description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeatherFullInfo } from '../../types/weather';
import { getImgUrl } from './../../utils/getImgUrl';

type Props = {
  weatherData: WeatherFullInfo;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-icon {
    width: 100px;
    display: block;
    margin-left: -15px;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
