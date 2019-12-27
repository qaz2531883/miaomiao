import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function() {
	var defaults = { // 默认值
		title: '',
		content: '',
		left: '',
		right: '',
		leftOnclick: null,
		rightOnclick: null
	};

	var MyComponent = Vue.extend(MessageBox);
	
	return function(value) { //配置参数
		for (var attr in value) {
			defaults[attr] = value[attr];
		}
		var vm = new MyComponent({
			el: document.createElement('div'),
			data: {
				title: defaults.title,
				content: defaults.content,
				left: defaults.left,
				right: defaults.right
			},
			methods: {
				leftOnclick() {
					defaults.leftOnclick && defaults.leftOnclick.call(this);
					document.body.removeChild(vm.$el);
				},
				rightOnclick() {
					defaults.rightOnclick && defaults.rightOnclick.call(this);
					document.body.removeChild(vm.$el);
				}
			}
		});
		document.body.appendChild(vm.$el);
	}
})()
