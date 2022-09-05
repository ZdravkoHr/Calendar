<template>
  <div class="calendar-body" :style="styles">
    <div class="dates">
      <div class="row" v-for="i in daysForPrint" :key="i.id">
        <div
          :class="getColClass(j.date)"
          v-for="j in i.arr"
          :key="j.id"
          @click="this.$parent.$emit('dateSelect', j.dateObj)"
        >
          {{ j.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['monthData', 'date', 'todayDate', 'colorTheme'],
  data() {
    return {
      days: Array.from({ length: 5 }, () => {
        return Array.from({ length: 7 }, () => '');
      }),
      lastMonthDate: null,
      lastMonthDay: null,
    };
  },

  watch: {
    monthData() {
      this.clearDates();
      this.updateDaysForPrint();
      this.createBody();
    },
  },

  created() {
    this.addDaysId();
    this.updateDaysForPrint();
    this.createBody();
  },

  computed: {
    styles() {
      return {
        '--background': this.colorTheme.bg,
        '--color': this.colorTheme.color,
        '--active-background': this.colorTheme.activeBg,
        '--active-color': this.colorTheme.activeColor,
      };
    },
  },

  methods: {
    getDaysAfterMonday(currentDay) {
      const result = currentDay.getDay() - 1;
      /*  The 0th day is Sunday. If we substract one from it, we get -1.
      because Sunday is 6 days after Monday -1 to 6*/
      return result === -1 ? 6 : result;
    },

    createBody() {
      const currentDay = new Date(
        this.date.getFullYear(),
        this.monthData.number,
        1
      );
      const daysAfterMonday = this.getDaysAfterMonday(currentDay);

      let date = 1;

      while (currentDay.getMonth() === this.monthData.number) {
        let row = Math.floor((date + daysAfterMonday - 1) / 7) % 5;
        let col = (currentDay.getDay() - 1) % 7;

        this.lastMonthDay = currentDay.getDay();
        col = col === -1 ? 6 : col;
        this.days[row].arr[col].date = date;
        this.days[row].arr[col].dateObj = currentDay;

        currentDay.setDate(++date);
      }
      this.lastMonthDate = date;
    },
    clearDates() {
      this.days.forEach((obj) => {
        obj.arr.forEach((arr) => {
          arr.date = '';
          arr.dateObj = null;
        });
      });
    },

    updateDaysForPrint() {
      if (this.monthData.number !== 1) {
        this.daysForPrint = [...this.days];
        return;
      }

      this.daysForPrint =
        this.lastMonthDate > 28 || this.lastMonthDay > 0
          ? [...this.days]
          : [...this.days].slice(0, this.days.length - 1);
    },

    addDaysId() {
      this.days = this.days.map((week, index) => {
        week = week.map((date, index) => {
          return { date, id: index };
        });

        return {
          arr: week,
          id: index,
        };
      });
    },

    getColClass(currentDate) {
      let className = 'col';
      className += this.isToday(currentDate) ? ' active' : '';
      className += currentDate === '' ? ' empty' : '';
      return className;
    },

    isToday(currentDate) {
      return (
        this.todayDate.getDate() === currentDate &&
        this.monthData.number === this.todayDate.getMonth() &&
        this.date.getFullYear() === this.todayDate.getFullYear()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-body {
  background: var(--background);
  color: var(--color);
  small {
    display: block;
  }

  .dates {
    flex: 7;
  }
  .row {
    display: flex;

    & > * {
      flex: 1;
    }
  }
  .col {
    text-align: center;
    padding: 8px;
    font-weight: bold;
    font-size: 20px;
    isolation: isolate;
    position: relative;
    cursor: pointer;

    &.active {
      color: var(--active-color);
    }

    &.active::before,
    &:not(.empty):hover::before {
      content: '';
      background: var(--active-background);
      width: 34px;
      height: 32px;
      display: block;
      position: absolute;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    &:not(.empty):hover::before {
      opacity: 0.6;
    }
  }
}
</style>
