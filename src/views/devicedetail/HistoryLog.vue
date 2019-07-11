<template>
  <div class="app-container">
    <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
      <el-form-item label="起始：">
        <el-date-picker
            v-model="listQuery.StartTime"
            align="right"
            type="date"
            placeholder="起始"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="至：">
        <el-date-picker
            v-model="listQuery.EndTime"
            align="right"
            type="date"
            placeholder="至"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="pan-btn green-btn" @click="fetchData">查询</el-button>
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
        <template slot-scope="scope">{{ scope.row.lasttime_str }}</template>
      </el-table-column>
      <el-table-column label="数据包">
        <template slot-scope="scope">{{ scope.row.hex_backup }}</template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="TotalCount"
      :current-page="listQuery.CurrentPage"
      :page-size="listQuery.PageSize"
      @current-change="fetchData"
    ></el-pagination>
  </div>
</template>

<script>
import { getHistoryLog } from "@/api/devices";
import moment from 'moment'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        Id: 1,
        StartTime: moment().startOf('month').format("YYYY-MM-DD"),
        EndTime: moment().format("YYYY-MM-DD"),
        CurrentPage: 1,
        PageSize: 10,
        Order: "g_lasttime desc"
      },
      TotalCount: 0
    };
  },
  created() {
    this.fetchData();
    this.listQuery.Id = this.$route.query.id;
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getHistoryLog(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.TotalCount = response.data.totalCount;
          this.listLoading = false;
        })
        .catch(function(reason) {
          console.log(reason);
        });
    }
  }
};
</script>
