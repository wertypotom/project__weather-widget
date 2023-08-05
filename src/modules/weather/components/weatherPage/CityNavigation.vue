<template>
  <div class="city-navigation">
    <div
      v-for="city in fetchedWetherDataByCity"
      :key="city.id"
      :class="['dot', { 'dot-active': city.id === activeCityId }]"
      @click="getActiveCity(city.id)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { WeatherFullInfo } from '../../types/weather';

type Props = {
  fetchedWetherDataByCity: WeatherFullInfo[];
  activeCityId: number | undefined;
};

type Emits = {
  (e: 'getActiveCity', id: number): void;
};

defineProps<Props>();
const emits = defineEmits<Emits>();

const getActiveCity = (id: number) => emits('getActiveCity', id);
</script>

<style lang="scss">
.city-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #b1b1b1;
  }

  &-active {
    background-color: #b1b1b1;
  }
}
</style>
