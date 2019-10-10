<template>
  <div class="app-container">
    <div class="block">
      <el-date-picker
        v-model="query.timeScope"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['7:00:00', '20:00:00']"
        @change="change"
      ></el-date-picker>
    </div>
    <el-button class="RunButton" @click="Run()" type="warning" icon="el-icon-loading" circle></el-button>
    <div class="mymap">
      <div id="container" class="mymap"></div>
    </div>
  </div>
</template>

<script>
import { getHistoryLocation } from "@/api/devices";
import AMap from "AMap"; //在页面中引入高德地图
import moment from "moment";

export default {
  data() {
    return {
      lineArr: [],
      pathParam: [],
      map: {},
      marker: {},
      query: {
        startTime: moment().format("YYYY-MM-DD 07:00:00"),
        endTime: moment().format("YYYY-MM-DD 20:00:00"),
        timeScope: "",
        id: "",
        Count: 250
      },
      graspRoad: {}
    };
  },
  mounted() {
    this.query.id = this.$route.query.id;

    const ctr = this;

    AMap.plugin("AMap.GraspRoad", function() {
      //异步加载插件
      ctr.Load();
    });
  },
  methods: {
    Run() {
      this.marker.moveAlong(this.lineArr, 2000);
    },
    change() {
      this.map.clearMap();
      this.lineArr = [];
      this.pathParam = [];
      this.query.startTime = this.query.timeScope[0];
      this.query.endTime = this.query.timeScope[1];
      this.Load();
    },
    Load() {
      const ctr = this;
      getHistoryLocation(this.query).then(response => {
        var data = response.data;
        if (data.length === 0) {
          return false;
        }

        data.forEach(e => {
          this.lineArr.push([e.amapLongItude, e.amapLatItude]);
          this.pathParam.push({
            x: e.amapLongItude,
            y: e.amapLatItude,
            sp: e.g_Speed,
            ag: e.g_Direct,
            tm: e.timeSign
          });
        });

        if (!this.graspRoad.driving) {
          this.graspRoad = new AMap.GraspRoad();
        }
        this.graspRoad.driving(this.pathParam, function(error, result) {
          if (!error) {
            var path2 = [];
            var newPath = result.data.points;
            for (var i = 0; i < newPath.length; i += 1) {
              path2.push([newPath[i].x, newPath[i].y]);
            }
            ctr.lineArr = path2;
          }

          ctr.map = new AMap.Map("container", {
            resizeEnable: true
          });

          var passedPolyline = new AMap.Polyline({
            map: ctr.map,
            path: ctr.lineArr,
            strokeColor: "#AF5", // 线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 // 线宽
            // strokeStyle: "solid"  //线样式
          });

          ctr.marker = new AMap.Marker({
            map: ctr.map,
            position: ctr.lineArr[0],
            icon: "./static/excavatorRun.png",
            offset: new AMap.Pixel(-13, -15),
            autoRotation: true,
            angle: -180
          });

          ctr.marker.on("moving", function(e) {
            passedPolyline.setPath(e.passedPath);
          });

          ctr.map.setFitView();
        });
      });
    }
  }
};
</script>

<style scoped>
.mymap {
  width: 100%;
  min-height: 500px;
  height: 100%;
}

.RunButton {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 1;
}
</style>