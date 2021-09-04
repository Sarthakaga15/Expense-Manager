<template>  
  <v-col cols="auto">
    <v-dialog
      v-model="showDialog"
      transition="dialog-top-transition"
      @click:outside="closeDialog"
      max-width="600"
    >
      <template v-slot>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >Expense</v-toolbar>
          <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="amount"
                  label="Amount"
                  type="number"
                  :rules="[v => !!v || 'Amount is required', v => v > 0 || 'Amount should be positive']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="description"
                  label="Description"
                ></v-text-field>

                <v-select
                  v-model="category"
                  :items="categories"
                  :rules="[v => !!v || 'Category is required']"
                  label="Category"
                  required
                ></v-select>

                  <v-layout wrap>
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Date"
                          readonly
                          :value="date"
                          v-on="on"
                          required
                          :rules="[v => !!v || 'Date is required']"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-layout>
                  <v-layout wrap>
                    <v-menu
                      v-model="timeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Time"
                          readonly
                          :value="time"
                          v-on="on"
                          required
                          :rules="[v => !!v || 'Time is required']"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        ampm-in-title
                        format="ampm"
                        v-model="time"
                        @input="timeMenu = false" 
                      ></v-time-picker>
                    </v-menu>
                  </v-layout>
              </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
             <v-btn
              color="error"
              class="mr-4 mb-4"
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 mb-4"
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script>
import api from '@/apis'
import moment from 'moment'
import { Categories } from '@/constants'
export default {
  components: {  
  },
  name: 'AddExpenseDialog',
  props: {
    showDialog: {
      type: Boolean, 
      default: false
    },
    isExistingExpense: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      valid: true,
      amount: 0,
      description: null,
      dateMenu: false,
      date: null,
      timeMenu: false,
      time: null,
      category: null,
      categories: Object.keys(Categories)
    }
  },
  mounted () {
    if(this.isExistingExpense){
      this.amount = this.expense.amount,
      this.description = this.expense.description,
      this.category = this.expense.category,
      this.date = this.expense.date,
      this.time = this.expense.time
    }
  },
  methods: {
    async submit(){
      var isValid = this.$refs.form.validate()
      if(!isValid)
        alert('Invalid')
      let expense = {
        amount: this.amount,
        description: this.description,
        category: Categories[this.category].id,
        dateTime: moment(this.date).add(this.time).format('YYYY-MM-DD HH:mm')
      }
      console.log('dt', expense.dateTime)
      if(!this.isExistingExpense){
        try{
          await api.createExpense(expense)
          this.$router.go()
        }catch(err){
          console.log(err)
          alert(err.message)
        }
      }else{
        try{
          await api.updateExpense(this.expense.id, expense)
          this.$router.go()
        }catch(err){
          console.log(err)
          alert(err.message)
        }
      }
    },
    closeDialog(){
      this.$emit('close', false)
    }
  }
}
</script>
