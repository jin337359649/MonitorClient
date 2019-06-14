<template>
  <el-container>
    <el-header>
      <h1>空调机工况</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">设备编号:{{ device.g_JLYID }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">工况上报时间：{{ device.g_LastTimeStr }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">油耗效率：{{ device.c_FuelEfficiency }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">工时：{{ device.c_Workinghours }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">油量：{{ device.c_FuelVolume }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">转速：{{ device.c_Revspeed }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">扭矩百分比：{{ device.c_Torque }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电压：{{ device.c_Voltage }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">水温：{{ device.c_WaterTemperature }}</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getGarbageCarById } from "@/api/devices";

export default {
  data() {
    return {
      device: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById({ id: this.$route.query.id }).then(result => {
        this.device = result.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
