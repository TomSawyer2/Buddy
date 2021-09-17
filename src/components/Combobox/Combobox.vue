<template>
  <v-combobox
    v-model="localModel"
    :items="items"
    :search-input.sync="search"
    @change="handleChange"
    hide-selected
    :hint="hint"
    :label="label"
    multiple
    persistent-hint
    hide-no-data
    small-chips
    clearable
    deletable-chips
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-if="ismobile == 1">
            没有选项。 重新选中该输入框创建新标签。
          </v-list-item-title>
          <v-list-item-title v-else>
            没有匹配的选项。 按下 <kbd>enter</kbd> 创建新标签。
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Combobox",
  props: ["items", "model", "hint", "label"],
  data() {
    return {
      search: null,
      localModel: [],
      ismobile: 0,
    };
  },
  created() {
    (this as any).localModel = (this as any).model;
  },
  mounted() {
    (this as any).ismobile = localStorage.getItem('ismobile');
  },
  methods: {
    handleChange() {
      (this as any).$emit("childrenItems", (this as any).localModel);
    },
  },
  watch: {
    model(newVal, oldVal) {
      (this as any).localModel = (this as any).model;
    },
  },
});
</script>
