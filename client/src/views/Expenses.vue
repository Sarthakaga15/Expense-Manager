<template>
  <div>
    <navbar />
    <v-container class="card-container">
      <v-btn style="position: absolute; right: 0;margin: 10px" @click="showDialog = true">New Expense</v-btn>
    </v-container>
    <div v-if="isMounted">
      <v-container class="card-container" v-for="(expense, index) in expenses" :key="index">
        <expense-card
          :id="expense.id" 
          :amount="expense.amount" 
          :category="expense.categoryId" 
          :description="expense.description"
          :date-time="expense.dateTime"
        />
      </v-container>
      <v-pagination circle :length="totalPages" v-model="page"></v-pagination>
    </div>
    <add-expense-dialog :showDialog="showDialog" @close="(value) => showDialog = value"/>
  </div>
</template>

<script>
import ExpenseCard from '@/components/ExpenseCard'
import AddExpenseDialog from '@/components/AddExpenseDialog.vue'
import Navbar from '@/components/Navbar.vue'
import api from '@/apis'
export default {
  name: 'Expenses',
  components: {
    ExpenseCard,
    AddExpenseDialog,
    Navbar
  },
  data () {
    return {
      expenses: [],
      showDialog: false,
      isMounted: false,
      page: 1,
      limit: 10,
      offset: 0,
      totalCount: 0
    }
  },
  computed: {
    totalPages () {
      if (this.totalCount > 0) {
        return Math.ceil(this.totalCount / this.limit)
      }
      return 1
    }
  },
  async mounted() {
    this.loadData()
    this.isMounted = true
  },
  watch: {
    page(newValue){
      this.offset = (newValue-1)*this.limit
      this.loadData()
    }
  },
  methods: {
    async loadData(){
      let res = await api.getExpenses({ limit: this.limit, offset: this.offset })
      this.expenses = res.expenses
      this.totalCount = res.count
    }
  }
}
</script>

<style scoped>
 .card-container {
   width: 60%;
   margin: 0 auto;
 }
</style>
