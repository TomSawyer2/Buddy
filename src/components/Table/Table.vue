<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            姓名
          </th>
          <th class="text-left">
            队员编号
          </th>
          <th class="text-left">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in queryData"
          :key="item.number"
        >
          <td>{{ item.userName }}</td>
          <td>{{ item.number?item.number:"无" }}</td>
          <td><v-btn small @click="submitNumber(item.number)">确定</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Table",
  props: ["queryData"],
  data() {
    return {
    };
  },
  methods: {
    submitNumber(number: any) {
        if (number) {
            (this as any).$emit("changeNumber", number);
        } else {
            (this as any).$emit("changeNumber", "无");
        }
    }
  },
  watch: {
  }
});
</script>