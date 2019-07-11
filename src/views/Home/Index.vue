<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in categories" :key="item.id">
      <h3 class="medium" @click="ShowDevice(item.AuthCode)">{{ item.CategoryName }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { getCategories } from "@/api/devices.js";

export default {
  mounted: function() {
    getCategories().then(res => {
      this.categories = res.Data;
    });
  },
  data: function() {
    return {
      categories: []
    };
  },
  methods: {
    ShowDevice(authCode) {
      this.$store.dispatch("SetAuthCode", authCode).then(() => {
        this.$router.push({ path: "devices" });
      });
    }
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 30px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

