<template>
  <div class="wrapper">
    <z-calendar-header
      :monthData="monthData"
      :date="currentDate"
      :bgColor="colorTheme.header"
      @changeMonth="changeMonth"
    ></z-calendar-header>
    <z-calendar-body
      :monthData="monthData"
      :date="currentDate"
      :todayDate="todayDate"
      :colorTheme="colorTheme.body"
    ></z-calendar-body>
  </div>
</template>

<script>
import Header from './calendar-components/Header.vue';
import Body from './calendar-components/Body.vue';
import colorThemes from '../color-themes.js';
import { months, getMonthNumber } from '../helpers/months';

export default {
  props: {
    selectedColorTheme: {
      type: String,
    },
  },
  data() {
    const currentDate = new Date();
    const todayDate = new Date();
    return {
      currentDate,
      todayDate,
      months,
    };
  },

  created() {
    this.validateColorTheme();
  },

  computed: {
    monthData: function () {
      const month = this.currentDate.getMonth();
      const monthName = months[month];
      return { name: monthName, number: getMonthNumber(monthName) };
    },
  },

  methods: {
    validateColorTheme() {
      const availableThemes = Object.keys(colorThemes);
      this.colorTheme = colorThemes[this.selectedColorTheme];

      if (!availableThemes.includes(this.selectedColorTheme)) {
        this.colorTheme = colorThemes.default;
      }
    },

    changeMonth(newMonth) {
      const monthStep = newMonth === 'prev' ? -1 : 1;
      const newDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + monthStep,
        this.currentDate.getDate()
      );

      this.currentDate = newDate;
    },
  },
  components: {
    zCalendarHeader: Header,
    zCalendarBody: Body,
  },
};
</script>

<style scoped></style>
