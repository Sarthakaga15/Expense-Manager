<template>
  <v-card 
    class="mx-auto text-center card" 
    dark >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, 0.8)"
          height="100"
          padding="24"
          stroke-linecap="round"
          :show-labels="false"
          auto-draw
          smooth
        >
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Total Expense: {{ totalExpense }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn block text link to="/report">
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TotalExpense',
  props: {
    totalExpense: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }
  }
}
</script>
