<template>
  <div>
    <el-container>
      <el-header class="airHeader">
        <h1>空调机工况</h1>
        <el-button type="primary" @click="toAirMachineCanHis">查看历史工况记录</el-button>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content">
              <label for>设备编号:</label>
              {{ device.g_JLYID }}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <label for>工况上报时间：</label>
              {{ device.g_LastTimeStr }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content">
              <label for>工作时间：</label>
              {{ device.c_Workinghours }} 小时
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>压力开关状态：</label>
              {{ device.pressureSwitch }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>蒸发传感器状态：</label>
              {{ device.evaporationSensor }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>回风传感器状态：</label>
              {{ device.reWindSensor }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content">
              <label for>电压状态：</label>
              {{ device.voltageState }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>电源电压：</label>
              {{ device.powerVoltage }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>设备温度：</label>
              {{ device.deviceTemprature }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>除霜温度：</label>
              {{ device.removeFrostTemprature }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content">
              <label for>回风温度：</label>
              {{ device.reWindTemprature }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>故障计次：</label>
              {{ device.errorCount }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>转速：</label>
              {{ device.respeed }} r/min
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>制冷总时间：</label>
              {{ device.totalCode }} h
            </div>
          </el-col>
        </el-row>
       <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content">
              <label for>工作状态：</label>
              {{ device.workState }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>制冷状态：</label>
              {{ device.coldState }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <label for>压缩机锁死次数：</label>
              {{ device.lockCount }}
            </div>
          </el-col>
        </el-row>
        <div id="GenderChart" style="float: left; width: 800px; height: 400px; margin-top: 20px;"></div>

        <el-table :data="device.errorCountDatas" border fit highlight-current-row>
          <el-table-column label="发生时间">
            <template slot-scope="scope">{{ scope.row.occurTime }}</template>
          </el-table-column>
          <el-table-column label="错误计数">
            <template slot-scope="scope">{{ scope.row.errorCount }}</template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
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
        this.initChart();
      });
    },
    toAirMachineCanHis() {
      this.$router.push({
        path: "AirMachineCanHis",
        query: { id: this.$route.query.id }
      });
    },
    initChart() {
      let myChart = echarts.init(document.getElementById("GenderChart"));

      const option = {
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

.el-row {
  height: 30px;
}

.grid-content > label {
  width: 135px;
  text-align: right;
  display: inline-block;
}

.airHeader button {
  float: right;
  margin-top: 20px;
  margin-right: 100px;
}

.airHeader h1 {
  display: inline-block;
}
</style>
