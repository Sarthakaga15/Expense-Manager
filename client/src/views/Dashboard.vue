<template>
  <div class="home" v-if="isMounted">
    <navbar />
    <total-expense :total-expense="totalExpense" />
    <v-divider></v-divider>
    <v-card class="card">
      <v-card-text>
        <div class="text-h4 font-weight-thin" style="text-align: center">
          Recent transactions
        </div>
      </v-card-text>
      <v-container class="card-container" v-for="(expense, index) in expenses" :key="index">
        <expense-card 
          :id="expense.id"
          :amount="expense.amount" 
          :category="expense.category" 
          :description="expense.description"
          :dateTime="expense.dateTime"
        />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import api from '@/apis'
import ExpenseCard from '@/components/ExpenseCard'
import TotalExpense from '@/components/TotalExpense.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Dashboard',
  components: {
    ExpenseCard,
    TotalExpense,
    Navbar
  },
  data () {
    return {
      expenses: [],
      totalExpense: null,
      isMounted: false
    }
  },
  async mounted(){
    let [dashboardRes, expensesRes] = await Promise.all([
                                        api.getUserDashboard(), 
                                        api.getExpenses({ limt: 5, offset: 0 })
                                      ])
    this.totalExpense = dashboardRes.totalExpense
    this.expenses = expensesRes.expenses
    this.isMounted = true
  }
}
</script>
<style scoped>
 .card{
  width: 90%; 
  margin: 30px auto;
 }
</style>
