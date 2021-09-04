<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          Are you sure you want to delete this expense?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            No
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteExpense"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DeleteExpenseDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog(){
      this.$emit('close', false)
    },
    deleteExpense(){
      this.$emit('delete', true)
      this.closeDialog()
    }
  }
}
</script>
