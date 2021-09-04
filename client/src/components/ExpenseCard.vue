<template>
  <div>
    <v-card class="row" elevation="2" outlined style="margin-top: 10px">
      <v-col cols="10">
        <v-card-title> Rs. {{ amount }} </v-card-title>
        <v-card-subtitle> {{ categoryName }} - {{ formattedDateTime }} </v-card-subtitle>
        <v-card-text> {{ description }} </v-card-text>
      </v-col>
      <v-col cols="2">
        <v-btn elevation="2" icon outlined color="indigo" @click="showDeleteDialog = true">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn class="ma-2" icon outlined color="indigo" @click="showDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-card>
    <delete-expense-dialog :showDialog="showDeleteDialog" @close="(value) => showDeleteDialog = value" @delete="(value) => deleteExpense(value)"/>
    <add-expense-dialog :showDialog="showDialog" :isExistingExpense="true" :expense="expense" @close="(value) => showDialog = value"/>
  </div>
</template>

<script>
import AddExpenseDialog from '@/components/AddExpenseDialog.vue'
import moment from 'moment'
import DeleteExpenseDialog from '@/components/DeleteExpenseDialog.vue'
import { Categories } from '@/constants'
import api from '@/apis'
export default {
  components: { AddExpenseDialog, DeleteExpenseDialog },
  name: 'ExpenseCard',
  props: {
    id: {
      type: Number,
      default: 1
    },
    amount: {
      type: Number,
      default: 0
    },
    category: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      default: ''
    },
    dateTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDialog: false,
      showDeleteDialog: false
    }
  },
  computed: {
    expense () {
      let categoryKey = Object.keys(Categories).find(ele => parseInt(Categories[ele].id) === this.category) 
      return {
        id: this.id,
        amount: this.amount,
        category: categoryKey,
        description: this.description,
        date: moment(this.dateTime).format('YYYY-MM-DD'),
        time: moment(this.dateTime).format('hh:mm')
      }
    },
    categoryName(){
      let key = Object.keys(Categories).find(ele => parseInt(Categories[ele].id) === this.category)
      return Categories[key].name
    },
    formattedDateTime(){
      return moment(this.dateTime).format('DD-MM-YYYY hh:mm a')
    }
  },
  methods: {
    async deleteExpense(value) {
      if(!value)
        return
      try{
        await api.deleteExpense(this.id)
        this.$router.go()
      }catch(err){
        console.log(err)
        alert(err.message)
      }
    }
  }
}
</script>
