<template>
  <div class="app-container">
    <el-button class="RunButton" @click="Run()" type="success" icon="el-icon-switch-button" circle></el-button>
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
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        id: "",
        Count: 80
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
}
</style>