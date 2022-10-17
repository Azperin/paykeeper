Vue.component('task-element',{
	props : ['task'],
	
	data : function () {
		return {
			currentDate: Date.now(),
		};
	},
	
	template : `
<li>
	<label :class='{islong:task.islong}'>
		<input type="checkbox"
			v-on:change="$emit('toggle', task)"
			v-bind:checked="task.done">
		<span>{{ task.text }}</span>
		<button :disabled="!task.done" @click="$emit('taskremove', task)">X</button>
		<small>{{ timeElapsed }}</small>
	</label>
</li>`,
	computed: {
		timeElapsed() {
			return Math.round((this.currentDate - this.task.date) / 1000);
		},
	},
	mounted() {
		setInterval(() => {
			this.currentDate = Date.now();
		}, 1000);
	},
});

new Vue({
	el: "#app",

	data: {
		todos: [
			{ text: "Learn JavaScript", done: false, islong: true, date: Date.now(), },
			{ text: "Learn Vue", done: false, islong: false, date: Date.now(), },
			{ text: "Play around in JSFiddle", done: true, islong: false, date: Date.now(), },
			{ text: "Build something awesome", done: true, islong: true, date: Date.now(), }
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
				date: Date.now(),
			});
			this.newTaskName = '';
		},
		deleteTask(task) {
			if (!task.done) return;
			this.todos = this.todos.filter(todo => todo !== task);
		}
	},
});