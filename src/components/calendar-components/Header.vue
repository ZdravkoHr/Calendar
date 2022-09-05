<template>
  <header :style="styles">
    <div class="month-name">
      <i class="fas fa-chevron-left" @click="$emit('changeMonth', 'prev')"></i>
      {{ monthData.name }} {{ date.getFullYear() }}
      <i class="fas fa-chevron-right" @click="$emit('changeMonth', 'next')"></i>
    </div>
  </header>
</template>

<script>
export default {
  props: ['monthData', 'date', 'colorTheme'],
  emits: ['changeMonth'],

  computed: {
    styles() {
      return {
        '--background': this.colorTheme.bg,
        '--color': this.colorTheme.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  font-size: 27px;
  padding: 0 10px;
  user-select: none;
  font-family: 'Peddana', serif;
  background: var(--background);
  color: var(--color);

  color: #caf0f8;
  i {
    cursor: pointer;
    font-size: 15px;
  }
}
</style>
