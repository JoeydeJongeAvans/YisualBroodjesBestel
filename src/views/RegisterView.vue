<template>
    <div class="background"></div>
    <div class="navbar">
        <nav class="nav">
            <div class="nav-el" id="name_project">
                <img src="../assets/logo.png" width="30" class="me-2" alt="" />
                Yisual Broodjes website
            </div>
            <div class="nav-el">
                <a href="https://github.com/JoeydeJongeAvans/YisualBroodjesBestel" target="blank">GitHub Repo</a>
            </div>
        </nav>
    </div>
    <div id="content">
        <div class="container">
            <form @submit.prevent="register">
                <h2 class="mb-3">Register</h2>
                <div class="input">
                    <label for="email">Email address</label>
                    <input class="form-control" type="text" name="email" placeholder="email@adress.com" />
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input class="form-control" type="password" name="password" placeholder="password123" />
                </div>

                <div class="alternative-option mt-4">
                    Already have an account? <span @click="moveToLogin">Login</span>
                </div>

                <button type="submit" id="register_button" class="mt-4 btn-pers">
                    Register
                </button>
                <div class="alert alert-warning alert-dismissible fade show mt-5 d-none" role="alert" id="alert_2">

                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
            password: "123456",
        };
    },
    methods: {
        register(submitEvent) {
            // data update
            this.email = submitEvent.target.elements.email.value;
            this.password = submitEvent.target.elements.password.value;

            // firebase registration
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    console.log("Registration completed");
                    this.$router.push("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    let alert_2 = document.querySelector("#alert_2");
                    alert_2.classList.remove("d-none");
                    alert_2.innerHTML = errorMessage;
                    console.log(alert_2);
                });
        },
        moveToLogin() {
            this.$router.push("/");
        },
    },
};
</script>

<style>
/* CUSTOM STYLE */
#content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid lightgray;
    padding: 4rem 4rem;
    border-radius: 5px;
    background: #fefefe;
}

.background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: rgb(250, 250, 250);
}

.navbar {
    background: #fafafa;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 70px;
    box-shadow: 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}

.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff !important;
    background-clip: padding-box !important;
    border: 1px solid #ced4da !important;
    -webkit-appearance: none !important;
    -moz-appearance: none;
    appearance: none !important;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.form-control:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

.nav {
    width: 80%;
    min-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fafafa;
}

#name_project {
    font-weight: 700;
}

.container {
    width: 400px;
    max-width: 95%;
}

.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.input>label {
    text-align: start;
}

.input>input {
    margin-top: 6px;
    height: 38px !important;
}

/* From uiverse.io */
.btn-pers {
    position: relative;
    left: 50%;
    padding: 1em 2.5em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 700;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);
    margin-top: 10px;
}

.btn-pers:hover {
    background-color: #198754;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translate(-50%, -7px);
}

.btn-pers:active {
    transform: translate(-50%, -1px);
}

/*  */
.alternative-option {
    text-align: center;
}

.alternative-option>span {
    color: #0d6efd;
    cursor: pointer;
}

#sign_out {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style>