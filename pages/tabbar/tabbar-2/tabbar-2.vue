<template>
	<view class="jy-ditu">
		<map style="width:100%;height:100%;" :latitude="latitude" :longitude="longitude" :scale="scale"
			:markers="marker">
		</map>
		<view class="jy-bottom">
			123
			<van-uploader :after-read="afterRead" />
			<van-button type="primary" />
		</view>
	</view>
</template>

<script setup>
	// import QQMapWX from "@/utils/qqmap-wx-jssdk.min.js";
	// const { QQMapWX } = require('@/utils/qqmap-wx-jssdk.min.js');
	import {
		ref,
		onMounted
	} from 'vue';
	const latitude = ref(39.542); //纬度
	const longitude = ref(116.2529); //经度
	const scale = ref(14); //地图缩放程度
	const marker = ref([
		// Define your marker(s) here if needed
	]);
	const getLocation = () => {
		console.log("正在获取当前位置...");
		// 获取用户是否开启 授权获取当前的地理位置、速度的权限。
		uni.getSetting({
			success(res) {
				console.log(res)
				// 如果没有授权
				if (!res.authSetting['scope.userLocation']) {
					// 则拉起授权窗口
					uni.authorize({
						scope: 'scope.userLocation',
						success() {
							//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
							uni.getLocation({
								type: 'wgs84',
								success: function(res) {
									console.log(res)
									latitude.value = res.latitude;
									longitude.value = res.longitude;
								},
								fail(error) {
									console.log('失败', error)
								}
							})
						},
						fail(error) {
							//点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
							console.log('拒绝授权', error)
							uni.showModal({
								title: '提示',
								content: '若点击不授权，将无法使用位置功能',
								cancelText: '不授权',
								cancelColor: '#999',
								confirmText: '授权',
								confirmColor: '#f94218',
								success(res) {
									console.log(res)
									if (res.confirm) {
										// 选择弹框内授权
										uni.openSetting({
											success(res) {
												console.log(res.authSetting)
											}
										})
									} else if (res.cancel) {
										// 选择弹框内 不授权
										console.log('用户点击不授权')
									}
								}
							})
						}
					})
				} else {
					// 有权限则直接获取
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							console.log(res)
							latitude.value = res.latitude;
							longitude.value = res.longitude;
						},
						fail(error) {
							console.log('失败', error)
						}
					})
				}
			},
			fail(error) {
				console.log(error, 'error')
			}
		})
	}
	const afterRead = (file) => {
		// 此时可以自行将文件上传至服务器
		console.log(file);
	};
	onMounted(() => {
		getLocation(); //获取当前定位
	});
</script>

<style scoped lang="scss">
	@include b(ditu) {
		width: 100vw;
		height: 565rpx;

		@include b(bottom) {
			margin: 1rem;
		}
	}
</style>