<template>
  <div class="app-container">
    <el-button class="RunButton" @click="Run()" type="success" icon="el-icon-switch-button" circle></el-button>
    <div class="mymap">
      <div id="container" class="mymap"></div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/devices";
import AMap from "AMap"; //在页面中引入高德地图

export default {
  data() {
    return {
      lineArr: [],
      map: {},
      marker: {},
      startTime: moment().format("YYYY-MM-DD"),
      endTime: moment().format("YYYY-MM-DD")
    };
  },
  mounted() {
    this.Load();
  },
  methods: {
    Run() {
      this.marker.moveAlong(this.lineArr, 1000);
    },
    change() {
      this.map.clearMap();
      this.lineArr = [];
      this.Load();
    },
    Load() {
      this.$http
        .get(
          `Devices/GetHistoryLocation?id=${
            this.$route.params.jlyid
          }&startTime=${this.startTime}&endTime=${this.startTime}&count=40`
        )
        .then(({ data }) => {
          if (data.length === 0) {
            return false;
          }

          data = data.reverse();

          data.forEach(e => {
            this.lineArr.push([e.amapLongItude, e.amapLatItude]);
          });

          this.map = new AMap.Map("container", {
            zoom: 18,
            center: this.lineArr[0]
          });

          this.marker = new AMap.Marker({
            map: this.map,
            position: this.lineArr[0],
            icon: "./static/excavatorRun.png",
            offset: new AMap.Pixel(-13, -15),
            autoRotation: true,
            angle: -180
          });

          var passedPolyline = new AMap.Polyline({
            map: this.map,
            // path: lineArr,
            strokeColor: "#AF5", // 线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 // 线宽
            // strokeStyle: "solid"  //线样式
          });

          this.marker.on("moving", function(e) {
            passedPolyline.setPath(e.passedPath);
          });

          this.map.setFitView();
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