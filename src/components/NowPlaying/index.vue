<template>
	<div class="movie_body" ref="movie_body">
		<Loading v-if="loading" />
		<Scroller v-else :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
			<ul>
				<li class='pullDown'>{{pullDownMsg}}</li>
				<li v-for="data in movieList" :key="data.id" @tap='toDetail(data.id)'>
					<div class="pic_show"><img :src="data.img | setWH('128.180')"></div>
					<div class="info_list">
						<h2>{{data.nm}} <img v-if="data.version" src="@/assets/maxs.png" /> </h2>
						<p>观众评 <span class="grade">{{data.sc}}</span></p>
						<p>主演: {{data.star}}</p>
						<p>{{data.showInfo}}</p>
					</div>
					<div class="btn_mall">
						购票
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	export default {
		name: 'nowPlaying',
		data() {
			return {
				movieList: [],
				pullDownMsg: '',
				loading: true,
				prveCityId: -1
			}
		},
		activated() {
			var cityId = this.$store.state.city.id;
			if(this.prveCityId === cityId){
				return;
			}
			this.pullDownMsg = '正在加载中';
			this.loading = true;
			this.getData(cityId);
		},
		methods: {
			getData(cityId) {
				this.axios.get('/ajax/movieOnInfoList?cityId=' + cityId).then((res) => {
					//console.log(res);
					//var msg = res.data.msg;
					var msg = res.statusText;
					if (msg === 'OK') {
						this.pullDownMsg = '加载成功';
						setTimeout(() => {
							this.movieList = res.data.movieList;
							this.pullDownMsg = '';
							this.loading = false;
							this.prveCityId = cityId;
						}, 1000)
						// 界面渲染完成之后执行的回调
						this.$nextTick(() => {
							//console.log('界面渲染完成之后执行的回调');
						})
					}
				})
			},
			handleToScroll(pos) {
				if (pos.y > 30) {
					this.pullDownMsg = '正在更新中';
				}
			},
			handleToTouchEnd(pos) {
				if (pos.y > 30) {
					this.getData(this.prveCityId);
				}
			},
			toDetail(id){
				//console.log(id);
				this.$router.push('/movie/detail/now/' + id);
			}
			
		}
	}
</script>

<style scoped>
	.movie_body .pullDown {
		margin: 0;
		padding: 0;
		border: none;
	}

	#content .movie_body {
		flex: 1;
		overflow: auto;
	}

	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}

	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}

	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}

	.movie_body .pic_show img {
		width: 100%;
	}

	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}

	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}

	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}

	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}

	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
</style>
