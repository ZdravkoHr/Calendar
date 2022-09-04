<template>
  <div class="calendar-body">
    <div class="separator">
      <small> MON </small>
      <small> TUE </small>
      <small> WED </small>
      <small> THU </small>
      <small> FRI </small>
      <small> SAT </small>
      <small> SUN </small>
    </div>

    <div class="dates">
      <div class="row" v-for="i in daysForPrint" :key="i.id">
        <div
          class="col"
          v-for="j in i.arr"
          :key="j.id"
          :style="getColStyle(j.date)"
        >
          {{ j.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['month', 'currentYear', 'currentDate', 'todayDate', 'colorTheme'],
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
    month() {
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

  methods: {
    getNumberOfWeek(date) {
      date = Number(date);
      const today = new Date();
      today.setDate(date);
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    },
    getDaysAfterMonday(currentDay) {
      const result = currentDay.getDay() - 1;
      /*  The 0th day is Sunday. If we substract one from it, we get -1.
      because Sunday is 6 days after Monday -1 to 6*/
      return result === -1 ? 6 : result;
    },
    createBody() {
      const currentDay = new Date(this.currentYear, +this.month.number - 1, 1);
      const daysAfterMonday = this.getDaysAfterMonday(currentDay);

      let date = 1;

      while (currentDay.getMonth() === +this.month.number - 1) {
        let row = Math.floor((date + daysAfterMonday - 1) / 7);
        let col = currentDay.getDay() - 1;
        if (row > 4 || col > 6) {
          row = 0;
          col = 0;
        }

        this.lastMonthDay = currentDay.getDay();
        col = col === -1 ? 6 : col;
        this.days[row].arr[col].date = date;

        currentDay.setDate(++date);
      }
      this.lastMonthDate = date;
    },
    clearDates() {
      this.days.forEach((obj) => {
        obj.arr.forEach((arr) => {
          arr.date = '';
        });
      });
    },
    updateDaysForPrint() {
      if (+this.month.number === 2) {
        this.daysForPrint =
          this.lastMonthDate > 28 || this.lastMonthDay > 0
            ? [...this.days]
            : [...this.days].slice(0, this.days.length - 1);
      } else {
        this.daysForPrint = [...this.days];
      }
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
    getColStyle(currentDate) {
      return {
        background: this.isToday(currentDate)
          ? this.colorTheme.marked
          : this.colorTheme.background,
        color: this.colorTheme.color,
      };
    },
    isToday(currentDate) {
      return (
        this.todayDate.getDate() === currentDate &&
        this.month.number - 1 === this.todayDate.getMonth() &&
        this.currentDate.getFullYear() === this.todayDate.getFullYear()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-body {
  .separator {
    display: flex;
    margin: 5px 0;
    & > * {
      flex: 1;
    }

    small {
      text-align: center;
    }
  }

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
    border: 1px solid;
    border-bottom: 0;
    border-right: 0;

    cursor: pointer;
  }
}
</style>
