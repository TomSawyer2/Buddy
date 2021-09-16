<template>
  <div class="block">
    <el-date-picker
      v-model="date"
      value-format="yyyy-MM-dd"
      type="date"
      class="dateChoose d-flex justify-end"
      style="width: 100%"
      placeholder="选择出生日期"
      :editable="false"
    >
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DatePicker",
  props: ["dateOrigin"],
  data() {
    return {
      activePicker: null,
      date: "",
    };
  },
  methods: {
    save(date) {
      (this as any).$emit("save", date);
    },
  },
  mounted() {
    (this as any).date = (this as any).dateOrigin;
  },
  watch: {
    menu(val) {
      val && setTimeout(() => ((this as any).activePicker = "YEAR"));
    },
    dateOrigin(newV, oldV) {
      (this as any).date = newV;
    },
    date(newV, oldV) {
      (this as any).save(newV);
    },
  },
});
</script>

<style>
.dateChoose .el-input__inner {
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0px;
  padding: 0px 30px;
}
</style>
