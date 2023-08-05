<template>
  <div class="input-component">
    <div class="input-container">
      <input
        @input="handleInput"
        placeholder="Enter city name..."
        :value="citySearch"
      />
      <img
        src="./../../assets/icons/close-black.svg"
        alt="input icon"
        @click="handleClearSearch"
      />
    </div>
    <ul v-if="Array.isArray(cities)" class="results">
      <div class="loader">
        <Loader loader-color="black" v-if="loading" />
      </div>
      <div
        class="results-empty"
        v-if="Array.isArray(cities) && !cities?.length"
      >
        Nothing found...
      </div>
      <li
        @click="handleItemClick(city)"
        v-for="city in cities"
        :key="`${city.name} ${city.lat} ${city.lon}`"
      >
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { City } from '../../types/cities';
import Loader from './../../UI/DataLoading.vue';

type Emits = {
  (e: 'update:citySearch', value: string): void;
  (e: 'handleItemClick', city: City): void;
  (e: 'handleClearSearch'): void;
};

type Props = {
  citySearch: string;
  cities: City[] | null;
  loading: boolean;
  error?: boolean;
};

const emits = defineEmits<Emits>();
defineProps<Props>();

const handleInput = (event: Event) =>
  emits('update:citySearch', (event.target as HTMLInputElement).value);

const handleClearSearch = () => emits('handleClearSearch');

const handleItemClick = (city: City) => emits('handleItemClick', city);
</script>

<style lang="scss">
.input-container {
  position: relative;
  z-index: 1;

  img {
    width: 30px;
    position: absolute;
    z-index: 2;
    right: 5px;
    top: 13px;
    transition: 0.1s;

    &:hover {
      cursor: pointer;
      background-color: rgb(178, 168, 168, 0.2);
      border-radius: 50%;
    }
  }
}

.input-component {
  position: relative;

  input {
    width: 100%;
    padding: 5px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    height: 55px;
    outline: none;
  }

  .results {
    color: #000;
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 4px 0;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    &-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0 10px;
    }
  }

  .results li {
    padding: 8px 12px;
    cursor: pointer;
  }

  .results li:hover {
    background-color: #f0f0f0;
  }
}

.loader {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
