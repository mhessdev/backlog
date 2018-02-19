var backlog = new Vue({
	el: '#backlog',
	data: {
		newTodo: {item: '', body: ''},
		newRequest: {item: '', body: ''},
		keyCount: {one: 0, two: 0},
		isFilled: {one: false, two: false},
		todos: [
			{ id: 1, item: 'Todo 1', body: 'This is a body 1', type: 'todo', created: '2018-1-1'},
			{ id: 2, item: 'Todo 2', body: 'This is a body 2', type: 'todo', created: '2018-1-1'}
		],
		completed:[
			{ id: 1, item: 'Completed 1', body: 'This completed body', type: 'request', created: 'created', compDate:  '2018-1-1'},
			{ id: 2, item: 'Completed 2', type: 'This completed body 2', created: 'request', compDate:  '2018-1-1'}
		],
		requests:[
			{ id: 1, item: 'Request 1', body: 'This request body', type: 'request', created: '2018-1-1'},
			{ id: 2, item: 'Request 2', body: 'This request body 2', type: 'todo', created: '2018-1-1'}
		],
	},
	methods: {
		addTodo: function (){
			// console.log(this.newTodo.item)
			if(this.newTodo.item.length < 3 || this.newTodo.body == '')
			{
				this.isFilled.one = true;
				return;
			}

			this.todos.push({
				item: this.newTodo.item,
				body: this.newTodo.body,
				created: new Date()
			});

			this.newTodo.item = '';
			this.newTodo.body = '';
			this.keyCount.one = 0;
			this.isFilled.one = false;
		},
		addRequest: function (){
			console.log(this.newRequest.item.length)
			if(this.newRequest.item.length < 3 || this.newRequest.body == '')
			{
				this.isFilled.two = true;
				return;
			}
			
			this.requests.push({
				item: this.newRequest.item,
				body: this.newRequest.body,
				created: new Date()
			});

			this.newRequest.item = '';
			this.newRequest.body = '';
			this.keyCount.two = 0;
			this.isFilled.two = false;
		},
		completeTodo: function(index){
			Vue.set(this.todos[index], 'compDate', new Date());
			console.log(this.todos[index]);
			this.$http.post('https://backlog-f6728.firebaseio.com/', this.todos[index]);
			this.completed.push(this.todos[index]);
			this.todos.splice(index, 1);
			// console.log('Added ' + this.completed[this.completed.length - 1].title);
		},
		completeRequest: function(index){
			Vue.set(backlog.requests[index], 'compDate', new Date());
			this.completed.push(this.requests[index]);
			this.requests.splice(index, 1);
			// console.log('Added');
		},
		uncomplete: function(index){
			Vue.delete(this.completed[index], 'compDate');
			if(this.completed[index].type == 'request')
			{
				this.requests.push(this.completed[index]);
				this.completed.splice(index, 1);
				return;
			}
			this.todos.push(this.completed[index]);
			this.completed.splice(index, 1);
		}
	}
	// computed: {
	// 	compClases:function(){
	// 		return{
	// 			error: this.isFilled.one,
	// 			isGood: 
	// 		}
	// 	}
	// }
	// watch:{
	// 	keyCountOne: function(){
	// 		if(this.keyCountOne > 3)
	// 		{

	// 		}
	// 	}
	// }
})


