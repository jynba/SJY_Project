<template>
  <view class="">
    <view class="ditu">
      <map style="width:100%;height:100%;" :latitude="latitude" :longitude="longitude" :scale="scale"
           :markers="marker" @markertap="toMap()">
      </map>
    </view>
  </view>
</template>

<script setup>
// import QQMapWX from "@/utils/qqmap-wx-jssdk.min.js";
const { QQMapWX } = require('@/utils/qqmap-wx-jssdk.min.js');
import { ref, onMounted } from 'vue';

const latitude = ref(39.542); //纬度
const longitude = ref(116.2529); //经度
const scale = ref(14); //地图缩放程度
const marker = ref([
  // Define your marker(s) here if needed
]);

const getLocation = () => {
  const _this = this;
  uni.authorize({
    scope: 'scope.userLocation',
    success() {
      let location = {
        longitude: longitude.value,
        latitude: latitude.value,
        province: "",
        city: "",
        area: "",
        street: "",
        address: "",
      };
      uni.getLocation({
        type: 'gcj02',
        geocode: true,
        success: function (res) {
          uni.setStorageSync('latitude', latitude.value);
          uni.setStorageSync('longitude', longitude.value);
          location.longitude = res.longitude;
          location.latitude = res.latitude;
          const qqmapsdk = new QQMapWX({
            key: 'MMYBZ-OMSCU-UGCV3-GOGGH-YPT73-KYFFW' //申请的key
          });
          qqmapsdk.reverseGeocoder({
            location,
            success: function (res) {
              let info = res.result;
              location.province = info.address_component.province;
              location.city = info.address_component.city;
              location.area = info.address_component.district;
              location.street = info.address_component.street;
              location.address = info.address;
              console.log(location);
            },
          });
        },
        fail: function (err) {
          uni.showToast({
            title: '获取定位失败',
            icon: 'none'
          })
        }
      })
    }
  })
};

onMounted(() => {
  getLocation(); //获取当前定位
});
</script>

<style scoped>
.ditu {
  width: 100vw;
  height: 565rpx;
}
</style>