<template>
  <div class="parameter-row">
    <span class="parameter-label">{{ title }}</span>
    <span class="parameter-value">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  value: string | number;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
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
