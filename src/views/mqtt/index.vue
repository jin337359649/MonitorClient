<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="24">
            <h3>{{Description}}</h3>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form @submit.native.prevent class="demo-form-inline">
          <el-form-item label="校验码：">
            <el-input v-model="VerifyCode" placeholder="使用前先设置校验码"></el-input>
          </el-form-item>
          <el-form-item>
            <button class="pan-btn green-btn" @click="setVerifyCode">设置</button>
            <button class="pan-btn tiffany-btn" @click="getVerifyCode">刷新</button>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="24">
            <button class="pan-btn tiffany-btn resetTable" size="small" @click="getTableData">刷新列表</button>
            <button class="pan-btn tiffany-btn resetAll" size="small" @click="resetAll">重置全部</button>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <ul>
                    <li v-for="item in props.row.items" :key="item.time">
                      时间：{{item.timeStr}}
                      内容：{{item.content}}
                      结果：{{item.result}}
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column prop="key" label="编号"></el-table-column>
              <el-table-column prop="correct" label="正确"></el-table-column>
              <el-table-column prop="error" label="错误"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">重置</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  GetList,
  Reset,
  SetCode,
  GetCode,
  GetDescription
} from "@/api/mqttapi";

export default {
  mounted() {
    GetDescription().then(res => {
      this.Description = res.data;
    });

    this.getVerifyCode();
    this.getTableData();
  },
  data() {
    return {
      Description: "",
      VerifyCode: "",
      tableData: []
    };
  },
  methods: {
    RowClick(row, column, event) {
      var key = row.key;
    },
    getVerifyCode() {
      GetCode().then(res => {
        this.VerifyCode = res.data;
        this.$message("获取校验码成功");
      });
    },
    setVerifyCode() {
      SetCode({ code: this.VerifyCode });
      this.$message("设置校验码成功");
    },
    getTableData() {
      GetList().then(res => {
        this.tableData = res.data;
        this.$message("数据已更新");
      });
    },
    handleClick(row) {
      Reset({ key: row.key }).then(()=>{
        this.getTableData();
      });
      this.$message(`${row.key}已重置`);
    },
    resetAll() {
      Reset().then(()=>{
        this.getTableData();
      });
      this.$message(`已全部重置`);
    }
  }
};
</script>
<style scoped>
.el-main {
  position: relative;
}

.resetTable {
  position: absolute;
  z-index: 1;
  right: 0;
}

.resetAll {
  position: absolute;
  z-index: 1;
  right: 150px;
}
</style>
