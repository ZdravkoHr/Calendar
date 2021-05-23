<template>
	<header>
		<div class="month-name">
			<i class="fas fa-chevron-left" @click="changeMonth('prev')"></i>
			{{ month.name }} {{ currentYear }}
			<i class="fas fa-chevron-right" @click="changeMonth('next')"></i>
		</div>
	</header>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
	props: ['month', 'currentYear', 'date', 'bgColor'],
	methods: {
		changeMonth(newMonth) {
			const monthStep = newMonth === 'prev' ? -2 : 0;
			const newDate = new Date(
				this.currentYear,
				+this.month.number + monthStep,
				this.date.getDate()
			);
			eventBus.changeDate(newDate);
		},
	},

	mounted() {
		this.$el.style.backgroundColor = this.bgColor;
	},
};
</script>

<style lang="scss" scoped>
header {
	text-align: center;
	font-size: 27px;
	padding: 0 10px;

	font-family: 'Peddana', serif;

	color: #caf0f8;
	i {
		cursor: pointer;
		font-size: 15px;
	}
}
</style>
