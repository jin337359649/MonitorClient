<template>
  <el-container>
    <el-header>
      <h1>环卫车工况</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <label for>设备编号：</label>
            {{ device.g_JLYID }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>是否定位：</label>
            {{ device.gpsState }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>锁车状态：</label>
            {{ device.lockState }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>发动机状态：</label>
            {{ device.engineState }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <label for>油耗效率：</label>
            {{ device.c_FuelEfficiency }} L/H
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>工时：</label>
            {{ device.c_Workinghours }} H
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>油量：</label>
            {{ device.c_FuelVolume }} L
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>转速：</label>
            {{ device.c_Revspeed }} r/min
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <label for>扭矩百分比：</label>
            {{ device.c_Torque }} %
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>电压：</label>
            {{ device.c_Voltage }} V
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <label for>水温：</label>
            {{ device.c_WaterTemperature }} ℃
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <label for>数据采集时间：</label>
            {{ device.g_LastTimeStr }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <label for>车辆位置：</label>
            {{ device.g_Address }}
          </div>
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
      getGarbageCarById({ id: this.$route.query.id }).then(result => {
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

.el-row {
  height: 30px;
}

.grid-content > label {
  width: 125px;
  text-align: right;
  display: inline-block;
}
</style>
