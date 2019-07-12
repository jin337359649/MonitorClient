<template>
  <div class="app-container">
    <el-form @submit.native.prevent class="demo-form-inline">
      <el-form-item label="终端号：">
        <el-input v-model="listQuery.Code" placeholder="请输入终端号"></el-input>
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
      <el-table-column label="设备号">
        <template slot-scope="scope">{{ scope.row.g_JLYID }}</template>
      </el-table-column>
      <el-table-column label="在线时间">
        <template slot-scope="scope">{{ scope.row.g_LastTimeStr }}</template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">{{ scope.row.g_Address }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="工况时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.g_ExpandTimeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="165">
        <template slot-scope="scope">
          <el-button type="text" @click="ShowDetail(scope.row.g_JLYID,scope.row.authCode)">详情</el-button>
          <el-button type="text" @click="ShowLog(scope.row.g_JLYID)">日志</el-button>
          <el-button type="text" @click="CarReplay(scope.row.g_JLYID)">轨迹</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="fetchData"
      :current-page.sync="listQuery.CurrentPage"
      layout="prev, pager, next"
      :total="totalCount"
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
        CurrentPage: 1,
        PageSize: 10,
        Order: "g_lasttime desc",
        Code: "",
        G_AuthCode: this.$store.getters.AuthCode
      },
      totalCount: 0
    };
  },
  mounted() {
    this.fetchData();
    console.log(this.$store.getters)
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      console.log(this.listQuery);
      getList(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.listLoading = false;
          this.totalCount = response.data.totalCount;
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
          this.$router.push({ path: "GarbageCar", query: { id: id } });
          break;
        case "0003":
          this.$router.push({ path: "AirConditioner", query: { id: id } });
          break;
      }
    },
    ShowLog(id) {
      this.$router.push({ path: "ShowLog", query: { id: id } });
    },
    CarReplay(id) {
      this.$router.push({ path: "CarReplay", query: { id: id } });
    }
  }
};
</script>
