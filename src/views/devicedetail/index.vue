<template>
  <el-container>
    <el-header><h1>消防车工况</h1></el-header>
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
          <div class="grid-content bg-purple">当前电流：{{ device.Ampere }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">当前SOC：{{ device.SOC }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电池最高温度：{{ device.TemperatrueLimitH }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电池最低温度：{{ device.TemperatrueLimitL }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">从板供电状态：{{ device.ElectricitySupply }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电流传感器电源状态：{{ device.ElectricityTrigger }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">从板通信状态：{{ device.Communication }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">最大单体电压：{{ device.MaxVolt }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">最大单体电压串数：{{ device.MaxVoltBunch }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">最小单体电压：{{ device.MinVolt }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">最小单体电压串数：{{ device.MinVoltBunch }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电池总压：{{ device.BatteryVolt }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">充电电流故障：{{ device.ChargeElectricityError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">充电电压故障：{{ device.ChargeVoltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">充电温度故障：{{ device.DischargeVoltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">放电电流故障：{{ device.DischargeTemperatureError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">放电电压故障：{{ device.DischargeElectricityError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">总压故障：{{ device.VoltageError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">单体过压故障：{{ device.VoltageHighError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">单体欠压故障：{{ device.VoltageLowError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">SOC故障：{{ device.SocError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">电流传感器故障：{{ device.ElectricityTriggerError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">温度传感器故障：{{ device.TemperatureTriggerError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">压差故障：{{ device.VoltageGapLowError }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">BMS从板故障：{{ device.BmsError }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">故障等级：{{ device.ErrorLevel }}</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getDevice } from "@/api/devices";

export default {
  data() {
    return {
      device: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let data = localStorage.getItem("qlmbackup");
      this.device = JSON.parse(data);
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
