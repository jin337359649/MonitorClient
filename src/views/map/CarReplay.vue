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
      map: {},
      marker: {},
      query: {
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        id: "",
        Count: 80
      }
    };
  },
  mounted() {
    this.query.id = this.$route.query.id;

    const ctr = this;
    this.Load();
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
        });

        this.map = new AMap.Map("container", {
          resizeEnable: true,
        });

        var passedPolyline = new AMap.Polyline({
          map: ctr.map,
          path: ctr.lineArr,
          strokeColor: "#AF5", // 线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 // 线宽
          // strokeStyle: "solid"  //线样式
        });

        this.marker = new AMap.Marker({
          map: this.map,
          position: this.lineArr[0],
          icon: "./static/excavatorRun.png",
          offset: new AMap.Pixel(-13, -15),
          autoRotation: true,
          angle: -180
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