<template>
<div>
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-isDetailShow
        style="width: 30%; padding-top: 0px; margin-top: 0px"
      ></v-text-field>
  <v-data-table
    :headers="headers"
    :items="queryData"
    sort-by="userName"
    :search="search"
    class="elevation-1"
    :footer-props="footer_props"
    :loading="loading"
    loading-text="加载中..."
  >
    <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="500px"
          style="z-index: 100000"
        >
          <v-card>
            <v-card-text class="pt-4">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.userName"
                      label="姓名"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.number"
                      label="队员编号"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="updateInfo"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px" style="z-index: 100000">
          <v-card>
            <v-card-title class="text-h5">您确定要删除{{editedItem.userName}}的相关信息？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="todetail(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "AdminTable",
    props: ["queryData"],
    data() {
        return {
            search: "",
            loading: false,
            headers: [
                {
                text: '姓名',
                align: 'start',
                sortable: false,
                value: 'userName',
                },
                { text: '队员编号', value: 'number' },
                { text: '操作', value: 'actions', sortable: false },
            ],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {
                userName: '',
                number: null,
            },
            defaultItem: {
                userName: '',
                number: null,
            },
            footer_props: {
                'items-per-page-options': [5],
                'show-current-page': true,
                'show-first-last-page': true
            },
        };
    },
    mounted() {
        (this as any).loading = true;
    },
    methods: {
        todetail(item: any) {
            (this as any).dialog = true;
            (this as any).editedIndex = (this as any).queryData.indexOf(item);
            (this as any).editedItem = Object.assign({}, item);
            // (this as any).$emit("todetailById", );
        },

        deleteItem (item) {
            (this as any).editedIndex = (this as any).queryData.indexOf(item);
            (this as any).editedItem = Object.assign({}, item);
            (this as any).dialogDelete = true;
        },

        deleteItemConfirm () {
            (this as any).loading = true;
            (this as any).$emit("deleteUserChild", (this as any).editedItem);
            // (this as any).queryData.splice((this as any).editedIndex, 1);
            (this as any).closeDelete();
        },

        close () {
            (this as any).dialog = false;
            (this as any).$nextTick(() => {
                (this as any).editedItem = Object.assign({}, (this as any).defaultItem);
                (this as any).editedIndex = -1;
            })
        },

        closeDelete () {
            (this as any).dialogDelete = false;
            (this as any).$nextTick(() => {
                (this as any).editedItem = Object.assign({}, (this as any).defaultItem);
                (this as any).editedIndex = -1;
            })
        },

        updateInfo () {
            (this as any).loading = true;
            (this as any).$emit("updateUserInfoChild", (this as any).editedItem);
            (this as any).close();
        },
    },
    watch: {
        dialog (val) {
            val || (this as any).close()
        },
        dialogDelete (val) {
            val || (this as any).closeDelete()
        },
        queryData(newV, oldV) {
            (this as any).queryData = newV;
            (this as any).loading = false;
        }
    },

    


});
</script>

<style>
</style>