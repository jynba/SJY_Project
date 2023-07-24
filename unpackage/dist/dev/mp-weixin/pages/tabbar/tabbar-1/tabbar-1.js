"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "tabbar-1",
  setup(__props) {
    const { QQMapWX } = require("@/utils/qqmap-wx-jssdk.min.js");
    const latitude = common_vendor.ref(39.542);
    const longitude = common_vendor.ref(116.2529);
    const scale = common_vendor.ref(14);
    const marker = common_vendor.ref([
      // Define your marker(s) here if needed
    ]);
    const getLocation = () => {
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success() {
          let location = {
            longitude: longitude.value,
            latitude: latitude.value,
            province: "",
            city: "",
            area: "",
            street: "",
            address: ""
          };
          common_vendor.index.getLocation({
            type: "gcj02",
            geocode: true,
            success: function(res) {
              common_vendor.index.setStorageSync("latitude", latitude.value);
              common_vendor.index.setStorageSync("longitude", longitude.value);
              location.longitude = res.longitude;
              location.latitude = res.latitude;
              const qqmapsdk = new QQMapWX({
                key: "MMYBZ-OMSCU-UGCV3-GOGGH-YPT73-KYFFW"
                //申请的key
              });
              qqmapsdk.reverseGeocoder({
                location,
                success: function(res2) {
                  let info = res2.result;
                  location.province = info.address_component.province;
                  location.city = info.address_component.city;
                  location.area = info.address_component.district;
                  location.street = info.address_component.street;
                  location.address = info.address;
                  console.log(location);
                }
              });
            },
            fail: function(err) {
              common_vendor.index.showToast({
                title: "获取定位失败",
                icon: "none"
              });
            }
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      getLocation();
    });
    return (_ctx, _cache) => {
      return {
        a: latitude.value,
        b: longitude.value,
        c: scale.value,
        d: marker.value,
        e: common_vendor.o(($event) => _ctx.toMap())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02c5fac1"], ["__file", "D:/Projects/sjyProject/SJY_Project/pages/tabbar/tabbar-1/tabbar-1.vue"]]);
wx.createPage(MiniProgramPage);
