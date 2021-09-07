<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dateLocal"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateLocal"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateLocal"
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
  props: ["date", "label"],
  data() {
    return {
        menu: false,
        dateLocal: "",
    };
  },
  methods: {
    save (dateLocal) {
        (this as any).$emit("save", (this as any).dateLocal);
        (this as any).menu = false;
    },
  },
  mounted() {
    (this as any).dateLocal = (this as any).date.year + '-' + (this as any).date.month;
  }
});
</script>