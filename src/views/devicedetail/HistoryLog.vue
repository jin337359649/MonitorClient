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
      <el-table-column label="在线时间">
        <template slot-scope="scope">{{ scope.row.g_LastTime }}</template>
      </el-table-column>
      <el-table-column label="数据包">
        <template slot-scope="scope">{{ scope.row.g_databackup }}</template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="TotalCount"
      :current-page="listQuery.CurrentPage"
      :page-size="listQuery.PageSize"
    ></el-pagination>
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
        Id: 1,
        StartTime: "",
        EndTime: "",
        CurrentPage: 1,
        PageSize: 10,
        Order: "g_lasttime desc"
      },
      TotalCount: 0
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
          this.TotalCount = response.data.totalCount;
          this.listLoading = false;
        })
        .catch(function(reason) {
          console.log(reason);
        });
    },
    ShowDetail(id, authCode) {
      switch (authCode) {
        case "0001":
          this.$router.push({ path: "FireCar", query: { id: id } });
          break;
        case "0002":
          this.$router.push({ path: "AirConditioner", query: { id: id } });
          break;
        case "0003":
          this.$router.push({ path: "GarbageCar", query: { id: id } });
          break;
      }
    }
  }
};
</script>
