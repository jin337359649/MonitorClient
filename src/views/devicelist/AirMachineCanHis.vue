<template>
  <div class="app-container">
    <el-form @submit.native.prevent class="demo-form-inline">
      <el-form-item label="时间：">
        <el-date-picker
          v-model="listQuery.timeScope"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['7:00:00', '20:00:00']"
          @change="fetchData"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="pan-btn green-btn" @click="fetchData">查询</el-button>
        <el-button class="pan-btn green-btn" @click="exportData">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="在线时间">
        <i class="el-icon-time" />
        <template slot-scope="scope">{{ scope.row.g_LastTimeStr }}</template>
      </el-table-column>
      <el-table-column label="工时">
        <template slot-scope="scope">{{ scope.row.c_Workinghours }}</template>
      </el-table-column>
      <el-table-column label="蒸汽传感器">
        <template slot-scope="scope">{{ scope.row.evaporationSensor }}</template>
      </el-table-column>
      <el-table-column label="回风传感器">
        <template slot-scope="scope">{{ scope.row.reWindSensor }}</template>
      </el-table-column>
      <el-table-column label="电源电压状态">
        <template slot-scope="scope">{{ scope.row.voltageState }}</template>
      </el-table-column>
      <el-table-column label="压力开关">
        <template slot-scope="scope">{{ scope.row.pressureSwitch }}</template>
      </el-table-column>
      <el-table-column label="电源电压">
        <template slot-scope="scope">{{ scope.row.powerVoltage }}</template>
      </el-table-column>
      <el-table-column label="设备温度">
        <template slot-scope="scope">{{ scope.row.deviceTemprature }}</template>
      </el-table-column>
      <el-table-column label="除霜温度">
        <template slot-scope="scope">{{ scope.row.removeFrostTemprature }}</template>
      </el-table-column>
      <el-table-column label="回风温度">
        <template slot-scope="scope">{{ scope.row.reWindTemprature }}</template>
      </el-table-column>
      <el-table-column label="转速">
        <template slot-scope="scope">{{ scope.row.respeed }}</template>
      </el-table-column>
      <el-table-column label="制冷总时间">
        <template slot-scope="scope">{{ scope.row.totalCold }}</template>
      </el-table-column>
      <el-table-column label="压缩机锁死次数">
        <template slot-scope="scope">{{ scope.row.lockCount }}</template>
      </el-table-column>
      <el-table-column label="工作状态">
        <template slot-scope="scope">{{ scope.row.workState }}</template>
      </el-table-column>
      <el-table-column label="制冷状态">
        <template slot-scope="scope">{{ scope.row.coldState }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="fetchData"
      :current-page.sync="listQuery.CurrentPage"
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
    <iframe id="downLoadIframe" src="" style="display:none" frameborder="0"></iframe>
  </div>
</template>

<script>
import { queryAirMachineData, exportAirMachineData } from "@/api/devices";
import moment from "moment";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        CurrentPage: 1,
        PageSize: 10,
        Order: "g_lasttime desc",
        Code: "",
        timeScope: [
          moment().format("YYYY-MM-DD 07:00:00"),
          moment().format("YYYY-MM-DD 20:00:00")
        ],
        startTime: moment().format("YYYY-MM-DD 07:00:00"),
        endTime: moment().format("YYYY-MM-DD 20:00:00"),
        Id: this.$route.query.id
      },
      totalCount: 0
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      this.listQuery.startTime = this.listQuery.timeScope[0];
      this.listQuery.endTime = this.listQuery.timeScope[1];
      queryAirMachineData(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.listLoading = false;
          this.totalCount = response.data.totalCount;
        })
        .catch(function(reason) {
          console.log(reason);
        });
    },
    exportData() {
      this.listQuery.startTime = this.listQuery.timeScope[0];
      this.listQuery.endTime = this.listQuery.timeScope[1];

      exportAirMachineData(this.listQuery)
        .then(response => {
          document.getElementById("downLoadIframe").src = `${this.$store.getters.apiUrl}/AirControl/DownLoadExcel?path=${response.data}`;
        })
        .catch(function(reason) {
          console.log(reason);
        });
    }
  }
};
</script>
