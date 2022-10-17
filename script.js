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
			v-on:change="$emit('toggle', task)"
			v-bind:checked="task.done">
		<span>{{ task.text }}</span>
		<button :disabled="!task.done" @click="$emit('taskremove', task)">X</button>
		<small>{{ seconds_elapsed }}</small>
	</label>
</li>`,
	mounted() {
		setInterval(() => {
			this.seconds_elapsed++;
		}, 1000);
	},
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
		newTaskName: '',
		data_is_loaded: true,
	},

	methods: {
		toggle(todo) {
			todo.done = !todo.done;
		},
		addTask() {
			if (this.newTaskName.length < 10) return;
			this.todos.push({
				text: this.newTaskName,
				done: false,
				islong: false, // каким параметром определяется это свойство ?
			});
			this.newTaskName = '';
		},
		deleteTask(task) {
			if (!task.done) return;
			this.todos = this.todos.filter(todo => todo !== task);
		}
	},
});