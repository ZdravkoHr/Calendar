<template>
  <div class="wrapper">
    <z-calendar-header
      :month="currentPeriods.month"
      :currentYear="currentPeriods.year"
      :date="currentDate"
      :bgColor="colorTheme.header"
      :changeMonth="changeMonth"
    ></z-calendar-header>
    <z-calendar-body
      :month="currentPeriods.month"
      :currentYear="currentPeriods.year"
      :currentDate="currentDate"
      :todayDate="todayDate"
      :colorTheme="colorTheme.body"
    ></z-calendar-body>
  </div>
</template>

<script>
import Header from './calendar-components/Header.vue';
import Body from './calendar-components/Body.vue';
import colorThemes from '../color-themes.js';

export default {
  props: {
    selectedColorTheme: {
      type: String,
      default: 'deepPurpBlue',
    },
  },
  data() {
    const currentDate = new Date();
    const todayDate = new Date();
    return {
      currentDate,
      todayDate,

      monthsInfo: [
        {
          name: 'January',
          number: '01',
        },
        {
          name: 'February',
          number: '02',
        },
        {
          name: 'March',
          number: '03',
        },
        {
          name: 'April',
          number: '04',
        },
        {
          name: 'May',

          number: '05',
        },
        {
          name: 'June',
          number: '06',
        },
        {
          name: 'July',
          number: '07',
        },
        {
          name: 'August',
          number: '08',
        },
        {
          name: 'September',
          number: '09',
        },
        {
          name: 'October',
          number: '10',
        },
        {
          name: 'November',
          number: '11',
        },
        {
          name: 'December',
          number: '12',
        },
      ],
    };
  },

  created() {
    this.validateColorTheme();
  },

  computed: {
    currentPeriods: function () {
      const month = this.currentDate.getMonth();
      const year = this.currentDate.getFullYear();
      return { month: this.monthsInfo[month], year };
    },
  },

  methods: {
    validateColorTheme() {
      const availableThemes = Object.keys(colorThemes);
      if (!availableThemes.includes(this.selectedColorTheme)) {
        this.colorTheme = colorThemes.default;

        throw new Error(
          'You have passed an invalid theme, so the default one is applied.'
        );
      }

      this.colorTheme = colorThemes[this.selectedColorTheme];
    },

    changeMonth(newMonth) {
      const monthStep = newMonth === 'prev' ? -1 : 1;
      const newDate = new Date(
        this.currentPeriods.year,
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
