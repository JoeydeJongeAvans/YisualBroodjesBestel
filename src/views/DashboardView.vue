<template>
	<main class="app">

		<section class="greeting">
			<h2 class="title">Welkom {{ data() }}</h2>
			<h3>Elke vrijdag voor 10:00 bestellen</h3>
			<div class="actions">
				<button class="delete" @click="signOut()">Uitloggen</button>
			</div>
		</section>

		<section class="create-todo">

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>Naam</h4>
				<input type="text" name="name" id="name" placeholder="Voer je naam in" v-model="input_content" />
				<h4>Welke keuze heb je gemaakt?</h4>
				<input type="text" name="choice" id="choice" placeholder="De beroemde Kip van de Bakplaat🍗"
					v-model="input_choice" />

				<h4>Bruin of Wit</h4>
				<div class="options">

					<label>
						<input type="radio" name="category" id="category1" value="business" v-model="input_category" />
						<span class="bubble business"></span>
						<div>Wit</div>
					</label>

					<label>
						<input type="radio" name="category" id="category2" value="personal" v-model="input_category" />
						<span class="bubble personal"></span>
						<div>Bruin</div>
					</label>
				</div>

				<h4>Welke keuze heb je voor de saus?</h4>
				<input type="text" name="sauce" id="sauce" placeholder="Welke saus wens je op je broodje?"
					v-model="input_sauce" />

				<h4>Uitzonderingen?</h4>
				<input type="text" name="exception" id="exception"
					placeholder="Toevallig iets wat je niet op je broodje wilt?" v-model="exception" />


				<input type="submit" value="Voeg broodje toe" />
			</form>
		</section>

		<section class="todo-list">
			<h2>Broodjes lijst</h2>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${todo.category == 'business'
						? 'business'
						: 'personal'
						}`"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
						<input type="text" v-model="todo.choice" />
						<input type="text" v-model="todo.sauce" />
						<input type="text" v-model="todo.exception" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

			</div>
		</section>

	</main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getAuth } from "firebase/auth";
import router from "../router";

const auth = getAuth();

const data = () => {
	const email = auth.currentUser.email
	return email
}

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_choice = ref('')
const input_sauce = ref('')
const input_exception = ref('')
const input_category = ref(null)

const signOut = () => {
	auth
		.signOut()
		.then(() => {
			console.log("Sign Out completed");
			router.push("/");
		})
		.catch((error) => console.log(error));
}

const todos_asc = computed(() => todos.value.sort((a, b) => {
	return a.createdAt - b.createdAt
}))

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
	if (input_content.value.trim() === '' || input_choice.value.trim() === '' || input_sauce.value.trim() === '' || input_category.value === null) {
		return
	}

	todos.value.push({
		content: input_content.value,
		choice: input_choice.value,
		sauce: input_sauce.value,
		exception: input_exception.value,
		category: input_category.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
	name.value = localStorage.getItem('name') || ''
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<style>
:root {
	--primary: #159F84;
	--business: #3A82EE;
	--personal: var(--primary);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--danger: #ff5b57;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
	--personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]),
button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: var(--dark);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.greeting .title {
	display: flex;
}

.greeting .title input {
	margin-left: 0.5rem;
	flex: 1 1 0%;
	min-width: 0;
}

.greeting .title,
.greeting .title input {
	color: var(--dark);
	font-size: 1.5rem;
	font-weight: 700;
}

.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}

.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked~.bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-todo .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #FFF;
	background-color: var(--primary);
	border-radius: 0.5rem;
	box-shadow: var(--personal-glow);
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}

.todo-list .list {
	margin: 1rem 0;
}

.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	flex: 1 1 0%;
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	display: flex;
	align-items: center;
}

.todo-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.todo-item .actions .delete {
	background-color: var(--danger);
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}

.delete {
	display: block;
    width: 10%;
    font-size: 14px;
    padding: 10px 10px 10px 10px;
    color: #FFF;
    background-color: var(--danger);
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
}
</style>