<template>
  <Bar :data="data" :options="options" />
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { reactive } from 'vue'

const data = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
})

const options = reactive({
  responsive: true
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// watch(
//   () => chartStore.c2data, //  better not to watch deep...
//   (currentValue, oldValue) => {
//     if (chart2) chart2.render()
//   },
//   { deep: true }
// )
</script>
