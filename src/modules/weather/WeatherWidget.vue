<template>
  <div class="weather" ref="widget">
    <WeatherPage
      v-if="!isSettingsOpen"
      @handleToggleSettings="handleToggleSettings"
    />
    <SettingsPage @handleToggleSettings="handleToggleSettings" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsPage from './components/settingsPage/SettingsPage.vue';
import WeatherPage from './components/weatherPage/WeatherPage.vue';

const isSettingsOpen = ref(false);

const handleToggleSettings = () =>
  (isSettingsOpen.value = !isSettingsOpen.value);
</script>

<style scoped lang="scss">
.weather {
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 200px;
  border-radius: 6px;
  box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
  color: #fff;
  background-color: #333;
  margin: 20px auto 0 auto;
  padding: 0 20px 20px 20px;
}
</style>
