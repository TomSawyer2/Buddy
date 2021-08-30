<template>
  <v-skeleton-loader
    v-bind="userInfo"
    v-bind:messageCenter="messageCenter"
    :loading="isLoading"
    style="background: white"
    class="mx-auto"
    type="list-item-avatar-two-line, article, actions"
  >
    <template v-slot:default>
      <div class="resume">
        <div class="base">
          <div class="profile">
            <v-avatar size="125">
              <img :src="userInfo.avatar" alt="个人照片" />
            </v-avatar>
            <div class="info-buddy">
              <h4 class="name">{{ userInfo.userName }}</h4>
              <small class="job">
                分站：{{
                  userInfo.substation.length ? userInfo.substation : "无"
                }}
                <br />
                编号：{{ userInfo.number.length ? userInfo.number : "无" }}
                <br />
              </small>
            </div>
          </div>
          <div class="about">
            <h3>个人信息</h3>
            <I>性别：{{ userInfo.sex.length ? userInfo.sex : "未填写" }}</I>
            <br />
            <I
              >毕业高中：{{
                userInfo.highSchool.length ? userInfo.highSchool : "未知"
              }}</I
            >
          </div>
          <div class="field">
            <h3>技术栈</h3>
            <v-chip-group
              v-if="userInfo.fields[0].length > 0"
              style="margin-left: 5px"
              column
            >
              <v-chip v-for="(field, index) in userInfo.fields" :key="index">{{
                field
              }}</v-chip>
            </v-chip-group>
            <v-chip v-else>暂无</v-chip>
          </div>
          <div class="contact">
            <h3>联系方式</h3>
            <div class="call">
              <i class="mdi mdi-phone"></i>
              <span>{{ userInfo.phoneNumber }}</span>
            </div>
            <div class="email">
              <i class="mdi mdi-email"></i>
              <span>{{
                userInfo.email.length ? userInfo.email : "未填写"
              }}</span>
            </div>
          </div>
        </div>

        <div class="func">
          <div class="interests">
            <h3>
              <i class="mdi mdi-heart buddy-i"></i>
              | 兴趣爱好
            </h3>
            <v-chip-group
              v-if="userInfo.hobby.length > 0"
              style="margin-left: 5px"
              column
            >
              <v-chip v-for="(hobby, index) in userInfo.hobby" :key="index" small>{{
                hobby
              }}</v-chip>
            </v-chip-group>
            <v-chip v-else>暂无</v-chip>
          </div>

          <div class="team-experience">
            <h3>
              <i class="mdi mdi-account-group buddy-i"></i>
              | 队内经历
            </h3>
            <p class="buddy-para">{{ userInfo.teamExperience }}</p>
          </div>

          <div class="buddy-resume">
            <h3>
              <i class="mdi mdi-file-account buddy-i"></i>
              | 履历
            </h3>
            <p class="buddy-para">{{ userInfo.resume }}</p>
          </div>

          <div class="notes">
            <h3>
              <i class="mdi mdi-star buddy-i"></i>
              | 备注
            </h3>
            <p class="buddy-para">{{ userInfo.notes }}</p>
          </div>
          <div class="btn-container">
            <v-btn
              depressed
              small
              style="width: 125px"
              @click="onAdd(userInfo.phoneNumber)"
              v-if="messageCenter == 0"
            >
              添加为Buddy
              <v-icon color="orange darken-4" right> mdi-plus </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </v-skeleton-loader>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BuddyDetail",
  props: ["userInfo", "isLoading", "messageCenter"],
  data() {
    return {
    };
  },
  methods: {
    onAdd(teacherPhoneNumber: string) {
      this.$emit("add", teacherPhoneNumber);
    },
  },
});
</script>

<style>
* {
  outline: none;
}

h3 {
  color: green;
  margin: 10px 0;
  text-transform: uppercase;
  font-size: 18px;
}

table.striped > tbody > tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.resume {
  background: #fbfbfb;
  display: flex;
}

.resume::before {
  content: "";
  width: 100%;
  height: 6px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.resume::after {
  content: "";
  display: block;
  clear: both;
}

.resume .base,
.resume .func {
  box-sizing: border-box;
  float: left;
}

.resume .base > div,
.resume .func > div {
  padding-bottom: 10px;
}

.resume .base > div:last-of-type,
.resume .func > div:last-of-type {
  padding-bottom: 0;
}

.resume .base {
  width: 200px;
  padding: 30px 15px;
  background: rgba(238, 238, 238, 0.6);
}

.resume .base .profile {
  background: maroon;
  padding: 30px 15px 5px 15px;
  margin: -30px -15px 45px -15px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resume .base .profile::after {
  content: "";
  position: absolute;
  background: maroon;
  width: 100%;
  height: 30px;
  bottom: -15px;
  left: 0;
  transform: skewY(-5deg);
  z-index: -1;
}

.resume .base .profile .photo img {
  width: 100%;
  border-radius: 50%;
}

.resume .base .profile .info-buddy {
  text-align: center;
  color: #fcfcfc;
}

.resume .base .profile .info-buddy .name {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 1.5em;
  font-weight: normal;
}

.resume .base .contact div {
  line-height: 24px;
}

.resume .base .contact div:hover i {
  color: blue;
}

.resume .base .contact div i {
  color: maroon;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  margin-right: 15px;
  transition-duration: 0.3s;
}

.resume .base .contact div span {
  position: relative;
}

.resume .base .contact div span::after {
  content: "";
  position: absolute;
  background: blue;
  height: 1px;
  width: 0;
  bottom: 0;
  left: 0;
  transition-duration: 0.3s;
}

.resume .func {
  width: 1300px;
  padding: 10px 10px;
}

.resume .func:hover > div {
  transition-duration: 0.3s;
}

.resume .func:hover > div:hover h3 {
  letter-spacing: 1.6px;
}

.resume .func:hover > div:hover h3 i {
  transform: scale(1.2);
}

.resume .func:hover > div:not(:hover) {
  opacity: 0.5;
}

.resume .func h3 {
  transition-duration: 0.3s;
  margin-top: 0;
}

@keyframes circle {
  from {
    box-shadow: 0 0 0 0px green;
  }
  to {
    box-shadow: 0 0 0 6px rgba(0, 128, 0, 0);
  }
}

.resume .func .interests-items {
  box-sizing: border-box;
  padding: 2px;
  width: 100%;
  border: 1px solid #cdcdcd;
  /* text-align: center; */
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  margin: 0 10px;
}

.resume .func .interests-items span:hover {
  color: blue;
  transition-duration: 0.3s;
}

.buddy-para {
  border: 1px solid #cdcdcd;
  min-height: 100px;
  padding: 5px;
  margin: 0 10px;
}

.buddy-para:hover {
  color: blue;
  transition-duration: 0.3s;
}

.buddy-i {
  font-size: 20px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  color: maroon;
  transition-duration: 0.3s;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
</style>
