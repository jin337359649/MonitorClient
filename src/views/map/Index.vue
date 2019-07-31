<template>
  <div class="app-container">
    <div class="mymap">
      <div id="container" class="mymap"></div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/devices"
import AMap from "AMap" //在页面中引入高德地图

export default {
  data() {
    return {
      CarList: [],
      map: {},
      listQuery: {
        CurrentPage: 1,
        PageSize: 9999,
        Order: "g_lasttime",
        G_AuthCode: this.$store.getters.AuthCode
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
          this.CarList = response.data.items;

          let data = response.data.items.filter(x => x.amapLatItude);

          if (data.length == 0) {
            return false;
          }

          this.map = new AMap.Map("container", {
            zoom: 12,
            center: [data[0].amapLongItude, data[0].amapLatItude]
          });

          this.CarList.forEach(e => {
            const marker = this.GetMarker(e);
            this.map.add(marker);
          });
        })
        .catch(function(reason) {
          console.log(reason);
        });
    },
    ShowDetail(id) {
      location.href = "/#/example/device?id=" + id;
    },
    GetMarker(car) {
      var marker = new AMap.Marker({
        icon: "./static/excavator.png",
        position: new AMap.LngLat(car.amapLongItude, car.amapLatItude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        //label: {content:car.car_Number,offset:new AMap.Pixel(15, 25),}
        title: car.car_Number,
        clickable: true
      });

      const router = this.$router;

      // marker.on("click", function() {
      //   router.push({
      //     name: "device",
      //     params: { id: car.car_Jlyid }
      //   });
      // });

      return marker;
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
</style>