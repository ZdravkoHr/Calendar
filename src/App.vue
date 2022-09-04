<template>
  <div class="holder">
    <z-calendar></z-calendar>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue';

export default {
  components: {
    zCalendar: Calendar,
  },
};
</script>

<style lang="scss">
.holder {
  width: 400px;
}
</style>
