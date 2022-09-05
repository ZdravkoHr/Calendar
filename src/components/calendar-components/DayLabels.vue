<template>
  <div class="separator" :style="styles">
    <small> MON </small>
    <small> TUE </small>
    <small> WED </small>
    <small> THU </small>
    <small> FRI </small>
    <small> SAT </small>
    <small> SUN </small>
  </div>
</template>

<script>
export default {
  name: 'dayLables',
  props: ['colorTheme'],
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
.separator {
  display: flex;
  padding: 5px 0;
  background: var(--background);
  color: var(--color);
  & > * {
    flex: 1;
  }

  small {
    text-align: center;
  }
}
</style>
