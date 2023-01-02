<template>

  <div class="background"></div>
  <div class="navbar">
    <nav class="nav">
      <div class="nav-el" id="name_project">
        <img src="../assets/logo.png" width="50px" class="me-2" alt="logo-Yisual" />
        Yisual Broodjes website
      </div>
      <div class="nav-el">
        <img src="../assets/images/github.png" width="50px" class="me-2" alt="logo-Yisual" />
        <a href="https://github.com/JoeydeJongeAvans/YisualBroodjesBestel" target="blank">GitHub Repo</a>
      </div>
    </nav>
  </div>
  <div id="content">
    <div class="container">
      <form @submit.prevent="login">
        <h2 class="mb-3">Login</h2>
        <div class="input">
          <label for="email">Email address</label>
          <input class="form-control" type="text" name="email" placeholder="email@adress.com" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input class="form-control" type="password" name="password" placeholder="password123" />
        </div>
        <div class="alternative-option mt-4">
          You don't have an account? <span @click="moveToRegister">Register</span>
        </div>
        <button type="submit" class="mt-4 btn-pers" id="login_button">
          Login
        </button>
        <div class="alert alert-warning alert-dismissible fade show mt-5 d-none" role="alert" id="alert_1">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </form>
    </div>
  </div>
  <footer class="footer" >
	<div class="waves">
		<div class="wave" id="wave1"></div>
		<div class="wave" id="wave2"></div>
		<div class="wave" id="wave3"></div>
		<div class="wave" id="wave4"></div>
	</div>

	<p style="opacity: 0.75;">Gemaakt door 🤍 Joey de</p>

</footer>
</template>

<style>
@import '../assets/styles/login.css';
@import '../assets/styles/footer.css';
</style>
  
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(submitEvent) {
      this.email = submitEvent.target.elements.email.value;
      this.password = submitEvent.target.elements.password.value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          let alert_1 = document.querySelector("#alert_1");
          alert_1.classList.remove("d-none");
          alert_1.innerHTML = errorMessage;
          console.log(alert_1);
        });
    },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

