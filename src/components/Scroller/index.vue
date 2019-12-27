<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		name: 'Scroller',
		props: {
			handleToScroll: {
				type: Function,
				default: function() {}
			},
			handleToTouchEnd: {
				type: Function,
				default: function() {}
			}
		},
		mounted() {
			var scroll = new BScroll(this.$refs.wrapper, {
				tap: true, // 滑动不触发点击事件
				probeType: 1 // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流
			});
			this.scroll = scroll;
			
			scroll.on('scroll', (pos)=>{
				this.handleToScroll(pos);
			});
			scroll.on('touchEnd', (pos)=>{
				this.handleToTouchEnd(pos);
			});
		},
		methods:{
			toScrollTop(y){
				this.scroll.scrollTo(0, y);
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		height: 100%;
	}
</style>
