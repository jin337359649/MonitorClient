<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">{{ scope.row.g_JLYID }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.g_LastTimeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="95">
        <template scope="scope">
          <el-button type="text" size="small" @click="ShowDetail( scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/devices";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        CurrentPage: 1,
        PageSize: 10,
        Order: "g_lasttime"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.listLoading = false;
        })
        .catch(function(reason) {
          console.log(reason);
        });
    },
    ShowDetail(data) {
      localStorage.setItem("qlmbackup", JSON.stringify(data));
      location.href = "/#/example/device";
    }
  }
};
</script>
