<template>
  <el-container>
    <el-header>
      <h1>消防车工况</h1>
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
          <div class="grid-content">当前电流：{{ device.ampere }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">当前SOC：{{ device.soc }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电池最高温度：{{ device.temperatrueLimitH }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电池最低温度：{{ device.temperatrueLimitL }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">从板供电状态：{{ device.electricitySupply }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电流传感器电源状态：{{ device.electricityTrigger }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">从板通信状态：{{ device.communication }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">最大单体电压：{{ device.maxVolt }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">最大单体电压串数：{{ device.maxVoltBunch }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">最小单体电压：{{ device.minVolt }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">最小单体电压串数：{{ device.minVoltBunch }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电池总压：{{ device.batteryVolt }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">充电电流故障：{{ device.chargeElectricityError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">充电电压故障：{{ device.chargeVoltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">充电温度故障：{{ device.dischargeVoltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">放电电流故障：{{ device.dischargeTemperatureError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">放电电压故障：{{ device.dischargeElectricityError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">总压故障：{{ device.voltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">单体过压故障：{{ device.voltageHighError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">单体欠压故障：{{ device.voltageLowError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">SOC故障：{{ device.socError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">电流传感器故障：{{ device.electricityTriggerError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">温度传感器故障：{{ device.temperatureTriggerError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">压差故障：{{ device.voltageGapLowError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">BMS从板故障：{{ device.bmsError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">故障等级：{{ device.errorLevel }}</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getFireCarById } from "@/api/devices";

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
      getFireCarById({ id: this.$route.query.id }).then(result => {
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
