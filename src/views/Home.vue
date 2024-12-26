<template>
  <div>
    <div class="logo-img d-flex justify-content-center">
      <img class="logo w-50" src="@/assets/logo.png" alt="Vue 3 Expense Tracker" />
    </div>
    <h1 class="fs-2 fw-bold text-center mb-5">Vue 3 Expense Tracker</h1>
    <div class="row">
      <div class="col-6">
        <h2 class="fw-bold">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div class="col-6">
        <h2 class="fw-bold">Register</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Username</label>
            <input v-model="registerUsername" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input v-model="registerPassword" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const registerUsername = ref('');
    const registerPassword = ref('');
    const userStore = useUserStore();
    const router = useRouter();

    const login = () => {
      userStore.login(username.value, password.value).then(() => {
        router.push('/expenses');
      });
    };

    const register = () => {
      userStore.register(registerUsername.value, registerPassword.value).then(() => {
        router.push('/');
      });
    };

    return {
      username,
      password,
      registerUsername,
      registerPassword,
      login,
      register
    };
  }
};
</script>