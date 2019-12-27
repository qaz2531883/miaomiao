const state = {
	nm : window.localStorage.getItem('cityName') || '北京',
	id : window.localStorage.getItem('cityId') || 1
};

const mutations = {
	CHANGE_CITY(state, value){
		state.nm = value.nm;
		state.id = value.id;
	}
};

const actions = {
	
};

export default{
	namespaced : true,
	state,
	mutations,
	actions
}