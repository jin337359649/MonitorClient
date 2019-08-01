<template>
  <el-container>
    <el-header>
      <h1>五征扫地车工况</h1>
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
          <div class="grid-content bg-purple">输出发动机转速：{{ device.revSpeed }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">发动机输出扭矩百分比：{{ device.rotate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">排气制动：{{ device.deflate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">预热指示灯：{{ device.preheat }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">工作小时：{{ device.workHour }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">累计油耗量：{{ device.oilConsumption }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">发动机水温：{{ device.waterTemperlate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">机油压力：{{ device.oilPressure }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">燃油油耗率：{{ device.oilConsumePercent }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电压：{{ device.voltage }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">油水分离灯：{{ device.oilWaterDiscrete }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">副发动机电压：{{ device.sVoltage }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">副发动机转速：{{ device.sRevSpeed }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">副发动机工时：{{ device.sWorkHour }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">副发动机水温：{{ device.sWaterTemperlate }}</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getById } from "@/api/devices";

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
