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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="设备号">
        <template slot-scope="scope">{{ scope.row.g_JLYID }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="工况时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.g_ExpandTimeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="95">
        <template scope="scope">
          <router-link :to="{ path: '/example/device', query: { id: scope.row.g_JLYID}}">详情</router-link>
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
        Order: "g_lasttime",
        G_AuthCode:"0002"
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
    ShowDetail(id) {
      location.href = "/#/example/device?id="+id;
    }
  }
};
</script>
