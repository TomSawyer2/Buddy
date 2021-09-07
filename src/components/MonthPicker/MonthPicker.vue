<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          no-title
          scrollable
          @change="save"
        >
        </v-date-picker>
      </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MonthPicker",
  props: ["dateYear", "dateMonth", "label"],
  data() {
    return {
        menu: false,
        date: new Date().toISOString().substr(0, 7),
        modal: false,
    };
  },
  methods: {
    save (date) {
      (this as any).$refs.menu.save(date);
      (this as any).$emit("save", (this as any).date);
      (this as any).menu = false;
    },
  },
  watch: {
    dateYear(newVal, oldVal){
      if (newVal == 0) {
        (this as any).date = "";
      } else {
        (this as any).date = newVal + '-' + (this as any).dateMonth;
      }
    },
    dateMonth(newVal, oldVal){
      if (newVal == 0) {
        (this as any).date = "";
      } else {
        (this as any).date = (this as any).dateYear + '-' + newVal;
      }

    },
  },
  created() {
    if ((this as any).dateYear == 0 && (this as any).dateMonth == 0) {
      (this as any).date = "";
    } else {
      (this as any).date = (this as any).dateYear + '-' + (this as any).dateMonth;
    }
  }
});
</script>