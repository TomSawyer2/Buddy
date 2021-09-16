<template>
  <div class="block">
    <el-date-picker
      v-model="date"
      value-format="yyyy-MM"
      type="month"
      class="dateChoose d-flex justify-end"
      style="width: 100%"
      placeholder="选择毕业年月"
      :editable="false"
    >
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MonthPicker",
  props: ["dateYear", "dateMonth", "label"],
  data() {
    return {
      date: "",
    };
  },
  methods: {
    save(date) {
      (this as any).$emit("save", (this as any).date);
    },
  },
  watch: {
    dateYear(newVal, oldVal) {
      if (newVal == 0) {
        (this as any).date = "";
      } else {
        (this as any).date = newVal + "-" + (this as any).dateMonth;
      }
    },
    dateMonth(newVal, oldVal) {
      if (newVal == 0) {
        (this as any).date = "";
      } else {
        (this as any).date = (this as any).dateYear + "-" + newVal;
      }
    },
    date(newV, oldV) {
      (this as any).save(newV);
    },
  },
  created() {
    if ((this as any).dateYear == 0 && (this as any).dateMonth == 0) {
      (this as any).date = "";
    } else {
      (this as any).date =
        (this as any).dateYear + "-" + (this as any).dateMonth;
    }
  },
});
</script>
