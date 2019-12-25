<template>
	<div class="city_body">
		<div class="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
					<li v-for="data in cityHotList" :key="data.id">{{data.name}}</li>
				</ul>
			</div>
			<div class="city_sort" ref="city_sort">
				<div v-for="data in cityList" :key="data.index">
					<h2>{{data.index}}</h2>
					<ul>
						<li v-for="item in data.list" :key="item.id">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="city_index">
			<ul>
				<!-- (data,index)里面的index为下标 -->
				<li v-for="(data,index) in cityList" :key="data.index" @touchstart="toIndex(index)">{{data.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'city',
		data(){
			return {
				cityList : [],
				cityHotList : []
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			formatCityList(cities) {
				var cityList = []; // 城市
				var cityHotList = []; //热门城市
				for (var i = 0; i < cities.length; i++) {
					// 城市
					var firstCase = cities[i].py.substring(0, 1).toUpperCase(); // 获取首字母并转成大写
					if (isExist(firstCase)) { // 数组已存在该字母，直接添加
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].index === firstCase) {
								cityList[j].list.push({
									name: cities[i].nm,
									id: cities[i].id
								});
							}
						}
					} else { // 数组不存在该字母，添加该字母数组
						cityList.push({
							index: firstCase,
							list: [{
								name: cities[i].nm,
								id: cities[i].id
							}]
						});
					}
					
					// 热门城市
					if (cities[i].isHot == 1) {
						cityHotList.push({
							id: cities[i].id,
							name: cities[i].nm
						});
					}
				}

				// 按字母排序
				cityList.sort((n1, n2) => {
					if (n1.index > n2.index) {
						return 1;
					} else if (n1.index < n2.index) {
						return -1;
					} else {
						return 0;
					}
				});

				// 城市数组是否存在该字母
				function isExist(firstCase) {
					for (var i = 0; i < cityList.length; i++) {
						if (cityList[i].index === firstCase) {
							return true;
						}
					}
					return false;
				}
				return {cityList,cityHotList};
			},
			getData() {
				this.axios.get('/api/cityList').then((res) => {
					console.log(res);
					var msg = res.data.msg;
					if (msg === 'ok') {
						var cities = res.data.data.cities;
						var {cityList, cityHotList} = this.formatCityList(cities);
						this.cityList = cityList;
						this.cityHotList = cityHotList;
					}
				})
			},
			toIndex(index){
				var h2 = this.$refs.city_sort.getElementsByTagName('h2');
				this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
			}

		}

	}
</script>

<style scoped>
	#content .city_body {
		margin-top: 45px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}

	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}

	.city_body .city_hot {
		margin-top: 20px;
	}

	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}

	.city_body .city_sort div {
		margin-top: 20px;
	}

	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}

	.city_body .city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}

	.city_body .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border-left: 1px #e6e6e6 solid;
	}
</style>
