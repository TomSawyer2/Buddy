<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="生日"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DatePicker",
  props: ["date"],
  data() {
    return {
      activePicker: null,
      menu: false,
    };
  },
  methods: {
    save(date) {
      (this as any).$emit("save", (this as any).date);
      (this as any).menu = false;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => ((this as any).activePicker = "YEAR"));
    },
  },
});
</script>
