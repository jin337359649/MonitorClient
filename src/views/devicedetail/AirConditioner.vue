<template>
  <div>
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
            <div class="grid-content bg-purple">工作时间：{{ device.c_Workinghours }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">压力开关状态：{{ device.pressureSwitch }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">蒸发传感器状态：{{ device.evaporationSensor }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">回风传感器状态：{{ device.reWindSensor }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">电压状态：{{ device.voltageState }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">电源电压：{{ device.powerVoltage }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">设备温度：{{ device.deviceTemprature }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">除霜温度：{{ device.removeFrostTemprature }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">回风温度：{{ device.reWindTemprature }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">故障计次：{{ device.errorCount }}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">转速：{{ device.chargeElectricityError }}</div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <div id="GenderChart" style="float: left; width: 800px; height: 400px; margin-top: 20px;"></div>

    <el-table
      :data="device.errorCountDatas"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="发生时间">
        <template slot-scope="scope">{{ scope.row.occurTime }}</template>
      </el-table-column>
      <el-table-column label="错误计数">
        <template slot-scope="scope">{{ scope.row.errorCount }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAirConditionerById } from "@/api/devices";
import echarts from "echarts";

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
      getAirConditionerById({ id: this.$route.query.id }).then(result => {
        this.device = result.data;
        initChart();
      });
    },
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("GenderChart"));

      option = {
        title: {
          text: "实时电压图",
          subtext: "数据来自设备上报",
          x: "center",
          align: "right"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          name: "时间(min)",
          data: this.device.timeList
        },
        yAxis: {
          type: "value",
          name: "电压值(V)"
        },
        series: [
          {
            name: "电压值",
            data: this.device.voltageList,
            type: "line"
          }
        ]
      };

      myChart.setOption(option);
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
