<template>
  <div v-if="isMounted">
    <navbar />
    <h2 style="text-align: center; margin-top: 5px">Expense Report</h2>
    <v-row justify="end" style="margin-right: 20px">
      <v-select
        :items="months"
        v-model="monthSelected"
        class="col-4"
        style="padding-right: 30px"
        label="Select Month"
        Solo
      ></v-select>
      <v-btn @click="loadReport">Load</v-btn>
    </v-row>
    <v-card class="report-card" style="background: aliceblue">
      <line-chart v-if="isMounted" :chart-data="weeklyChartData" :options="weeklyChartOptions" :type="true" />    
    </v-card>
    <div class="row" style="margin: 0 auto;width: 90%">
      <v-card class="report-card col-5" style="background: aliceblue">
        <doughnut-chart :chart-data="categoryChartData" :options="{title: { display: true, text: 'Category Expenses of the month'}}"/>
      </v-card>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/charts/LineChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import Navbar from '@/components/Navbar.vue'
import api from '@/apis'
import moment from 'moment'
export default {
  name: 'Report',
  components: {
    LineChart,
    DoughnutChart,
    Navbar
  },
  data () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthSelected: null,
      monthInd: null,
      weeklyChartData: {},
      categoryChartData: {},
      monthlyChartData: {},
      weeklyChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Weekly Expenses'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      isMounted: false
    }
  },
  methods: {
    loadReport(){
      this.$router.push(`/report?month=${this.monthSelected}`)
      this.$router.go()
    }
  },
  async mounted () {
    this.monthSelected = this.$route.query.month || this.months[moment().month()]
    this.monthInd = this.months.findIndex(mon => mon === this.monthSelected)
    try{
      let { categoryStats, weeklyStats } = await api.getUserReport({ month: this.monthInd+1 })
      this.categoryChartData.labels = []
      this.categoryChartData.datasets = [{ 
          data: [], 
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 235)',
            'rgb(10, 10, 10)'
          ],
          hoverOffset: 4
      }]
      categoryStats.forEach(stat => {
        this.categoryChartData.labels.push(stat.category.name)
        this.categoryChartData.datasets[0].data.push(stat.expense)
      })
      this.weeklyChartData.labels = ['']
      this.weeklyChartData.datasets = [{
        backgroundColor: '#FF3D67',
        data: [0]
      }]
      let k = 0
      for(let i=1;i<=4;i++){
        this.weeklyChartData.labels.push(`Week ${i}`)
        if(k < weeklyStats.length && weeklyStats[k].week === i){
          this.weeklyChartData.datasets[0].data.push(weeklyStats[k].expense)
          k++
        }else{
          this.weeklyChartData.datasets[0].data.push(0)
        }
      }
    }catch(err){
      console.log(err)
      alert(err.message)
    }
    this.isMounted = true
  }
}
</script>
<style scoped>
  .report-card{
    width: 90%;
    margin: 20px auto;
    padding: 30px;
  }
</style>
