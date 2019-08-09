<template>
  <el-container>
    <el-header>
      <h1>五征扫地车工况</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">设备编号:{{ device.g_JLYID }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">工况上报时间：{{ device.g_LastTimeStr }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">输出发动机转速：{{ CanData.RevSpeed }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">发动机输出扭矩百分比：{{ CanData.Rotate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">排气制动：{{ CanData.Deflate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">预热指示灯：{{ CanData.Preheat }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">工作小时：{{ CanData.WorkHour }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">累计油耗量：{{ CanData.OilConsumption }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">发动机水温：{{ CanData.WaterTemperlate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">机油压力：{{ CanData.OilPressure }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">燃油油耗率：{{ CanData.OilConsumePercent }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电压：{{ CanData.Voltage }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">油水分离灯：{{ CanData.OilWaterDiscrete }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">副发动机电压：{{ CanData.SVoltage }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">副发动机转速：{{ CanData.SRevSpeed }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">副发动机工时：{{ CanData.SWorkHour }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">副发动机水温：{{ CanData.SWaterTemperlate }}</div>
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
      device: {},
      CanData:{}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getById({ id: this.$route.query.id }).then(result => {
        debugger
        this.device = result.data;
        this.CanData = JSON.parse(result.data.g_Expand);
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
