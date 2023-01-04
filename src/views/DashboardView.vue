<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <audio autoplay>
    <source src="../assets/music/LetsGo.mp3" type="audio/mpeg" />
  </audio>
  <Navbar />

  <main class="app">
    <section class="greeting">
      <h2 class="title">Welkom {{ data() }}</h2>
      <h3>Elke vrijdag voor 10:00 bestellen</h3>
      <div class="actions">
        <button class="logout-button" @click="signOut()">Uitloggen</button>
      </div>
    </section>

    <section class="create-todo">
      <form id="new-todo-form" @submit.prevent="addTodo">
        <h4>Welke keuze heb je gemaakt?</h4>
        <input
          type="text"
          name="choice"
          id="choice"
          placeholder="De beroemde Kip van de Bakplaat🍗"
          required
          v-model="input_choice"
        />

        <h4>Wit of Bruin</h4>
        <div class="options">
          <label>
            <input
              type="radio"
              name="category"
              id="category1"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <img
              src="../assets/images/whiteBread.png"
              width="50px"
              class="bread-icon"
              alt="White bread"
            />
          </label>

          <label>
            <input
              type="radio"
              name="category"
              id="category2"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <img
              src="../assets/images/brownBread.png"
              width="50px"
              class="bread-icon"
              alt="Brown Bread"
            />
          </label>
        </div>

        <h4>Welke keuze heb je voor de saus?</h4>
        <input
          type="text"
          name="sauce"
          id="sauce"
          required
          placeholder="Welke saus wens je op je broodje?"
          v-model="input_sauce"
        />

        <h4>Uitzonderingen?</h4>
        <input
          type="text"
          name="exception"
          id="exception"
          placeholder="Toevallig iets wat je niet op je broodje wilt?"
          v-model="exception"
        />

        <input type="submit" value="Voeg broodje toe" />
      </form>
    </section>

    <section class="todo-list">
      <h2>Broodjes lijst</h2>
      <div class="list" id="todo-list">
        <div
          v-for="todo in todos_asc"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span
              :class="`bubble ${
                todo.category == 'business' ? 'business' : 'personal'
              }`"
            ></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
            <input type="text" v-model="todo.choice" />
            <input type="text" v-model="todo.sauce" />
            <input type="text" v-model="todo.exception" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { Navbar } from "../components";
import { getAuth } from "firebase/auth";
import router from "../router";

const auth = getAuth();

const data = () => {
  const email = auth.currentUser.email;
  return email.replace(/@yisual.com/, "");
};

const todos = ref([]);
const name = ref("");

const input_choice = ref("");
const input_sauce = ref("");
const input_exception = ref("");
const input_category = ref(null);

const signOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Sign Out completed");
      router.push("/");
    })
    .catch((error) => console.log(error));
};

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

const addTodo = () => {
  if (
    input_choice.value.trim() === "" ||
    input_sauce.value.trim() === "" ||
    input_category.value === null
  ) {
    return;
  }

  todos.value.push({
    content: data(),
    choice: input_choice.value,
    sauce: input_sauce.value,
    exception: input_exception.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<style>
@import "../assets/styles/dashboard.css";
</style>
