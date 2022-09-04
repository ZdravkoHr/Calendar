<template>
  <header>
    <div class="month-name">
      <i class="fas fa-chevron-left" @click="$emit('changeMonth', 'prev')"></i>
      {{ monthData.name }} {{ date.getFullYear() }}
      <i class="fas fa-chevron-right" @click="$emit('changeMonth', 'next')"></i>
    </div>
  </header>
</template>

<script>
export default {
  props: ['monthData', 'date', 'bgColor'],
  emits: ['changeMonth'],

  mounted() {
    this.$el.style.backgroundColor = this.bgColor;
    console.log('currentDate: ', this.date);
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

  color: #caf0f8;
  i {
    cursor: pointer;
    font-size: 15px;
  }
}
</style>
