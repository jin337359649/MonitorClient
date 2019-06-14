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
      <el-table-column label="设备号">
        <template slot-scope="scope">{{ scope.row.g_JLYID }}</template>
      </el-table-column>
      <el-table-column label="在线时间">
        <template slot-scope="scope">{{ scope.row.g_LastTime }}</template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">{{ scope.row.g_Address }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="工况时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.g_ExpandTimeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="95">
        <template slot-scope="scope">
          <a @click="ShowDetail(scope.row.g_JLYID,scope.row.authCode)">详情</a>
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
    ShowDetail(id,authCode) {
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
