Vue.component('task-element',{
	props : ['task'],
	
	data : function () {
		var d = {seconds_elapsed: null}; 
		return d;
	},
	template : `
<li>
	<label :class='{islong:task.islong}'>
		<input type="checkbox"
			v-on:change="toggle(task)"
			v-bind:checked="task.done">
		<span>{{ task.text }}</span>
		<small>{{ seconds_elapsed }}</small>
	</label>
</li>`,
});

new Vue({
	el: "#app",

	data: {
		todos: [
			{ text: "Learn JavaScript", done: false, islong: true},
			{ text: "Learn Vue", done: false, islong: false},
			{ text: "Play around in JSFiddle", done: true, islong: false},
			{ text: "Build something awesome", done: true, islong: true}
		],
		data_is_loaded: true,
	},

	methods: {
		toggle: function(todo){
			todo.done = !todo.done
		},
	},
});