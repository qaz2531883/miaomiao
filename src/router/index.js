import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRoutor from './movie'
import MineRoutor from './mine'
import CinemaRoutor from './cinema'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes:[
		MovieRoutor,
		MineRoutor,
		CinemaRoutor,
		{
			path:'/*',
			redirect: '/movie'
		}
	]
	
})
