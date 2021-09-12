<template>
  <div
    v-bind:style="{ height: pageHeight + 'px' }"
    class="mainBox"
  >
    <v-form
      style="width: 70%"
      class="mt-10"
    >
    <v-expansion-panels popout>
      <v-expansion-panel>
        <v-expansion-panel-header>用户信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <AdminTable v-if="haveMajors && haveBooks && haveFields" :queryData="userData" :majorItems="majorItems" :bookItems="bookItems" :fieldItems="fieldItems" @deleteUserChild="deleteUserFunc" @updateUserInfoChild="updateUserInfoFunc" @getMajorsChild="getMajorsFunc" @getBooksChild="getBooksFunc" @getFieldsChild="getFieldsFunc" style="width: 100%; max-height: 2000px" class="tableFooter"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>功能2</v-expansion-panel-header>
        <v-expansion-panel-content>
          功能2
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-form>
  </div>
</template>

<script lang="ts">
import { getUserList, updateUserInfo, deleteUser, getMajors, getFields, getBooks } from "../apis";
import AdminTable from "@/components/Admin/AdminTable.vue";
import {
  setToken,
  getToken,
  removeToken,
  setPhone,
  setAvatarSrc,
  setUserName,
  removePhone,
  removeAvatarSrc,
  removeUserName,
} from "../utils/storage";
export default {
  components: { AdminTable },
  data: () => ({
    pageHeight: 0,
    userData: [],
    majorItems: [],
    bookItems: [],
    fieldItems: [],
    haveMajors: false,
    haveBooks: false,
    haveFields: false,
  }),
  async mounted() {
    // 自动调节组件高度
    (this as any).pageHeight = document.documentElement.clientHeight;
    (this as any).haveBooks = false;
    (this as any).haveMajors = false;
    (this as any).haveFields = false;
    (this as any).getUserListFunc();
    await (this as any).getMajorsFunc();
    await (this as any).getBooksFunc();
    await (this as any).getFieldsFunc();
  },
  methods: {
      async getUserListFunc() {
          await getUserList()
            .then((res : any) => {
                (this as any).userData = res.data.data;
                (this as any).$message.success("成功获取用户信息！");
            })
            .catch((err : any) => {
                (this as any).$message.error("获取用户失败，请重试~");
            })
      },
      async deleteUserFunc(item: any) {
        await deleteUser({ id: item.id })
          .then((res : any) => {
            (this as any).$message.success("删除用户成功！");
            (this as any).getUserListFunc();
          })
          .catch((err : any) => {
            (this as any).$message.error("删除用户失败，请重试~");
          })
      },
      async updateUserInfoFunc(item: any) {
        await updateUserInfo(item)
          .then((res : any) => {
            (this as any).$message.success("用户信息更新成功！");
            (this as any).getUserListFunc();
          })
          .catch((err : any) => {
            (this as any).$message.error("用户信息更新失败，请重试~");
          })
      },
      async getMajorsFunc () {
        await getMajors()
          .then((res: any) => {
            (this as any).majorItems = res.data.data;
            (this as any).haveMajors = true;
          })
          .catch((err: any) => {
            console.log(err);
          })
      },
      async getBooksFunc () {
        await getBooks()
          .then((res: any) => {
            (this as any).bookItems = res.data.data;
            (this as any).haveBooks = true;
          })
          .catch((err: any) => {
            console.log(err);
          })
      },
      async getFieldsFunc () {
        await getFields()
          .then((res: any) => {
            (this as any).fieldItems = res.data.data;
            (this as any).haveFields = true;
          })
          .catch((err: any) => {
            console.log(err);
          })
      }
  },
};
</script>

<style>
.mainBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-left: 56px;
  overflow-x: auto;
}

.tableFooter .v-data-footer{
  justify-content: flex-end;
}
</style>