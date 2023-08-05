<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss">
header {
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 21px;
  font-weight: 500;
  letter-spacing: 2px;

  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  height: 60px;

  img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
