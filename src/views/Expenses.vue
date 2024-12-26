<template>
    <div>
      <div class="logo-img d-flex justify-content-center">
        <img class="logo w-50" src="@/assets/logo.png" alt="Vue 3 Expense Tracker" />
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="fs-2 fw-bold">Vue 3 Expense Tracker</h1>
        <div class="wrapper">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h2>Add Expense</h2>
          <form @submit.prevent="addExpense">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Title</label>
              <input v-model="title" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Amount</label>
              <input v-model="amount" type="number" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Date</label>
              <input v-model="date" type="date" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Category</label>
              <input v-model="category" type="text" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
        <div class="col-8">
          <h2>Your Expenses</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense, key) in expenses" :key="key">
                <th scope="row">{{ key+1 }}</th>
                <td>{{ expense.title }}</td>
                <td>{{ expense.amount }} $</td>
                <td>{{ expense.date }}</td>
                <td><span class="badge text-bg-success">{{ expense.category }}</span></td>
                <td><button class="btn btn-outline-danger" @click="deleteExpense(expense._id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/userStore';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const title = ref('');
      const amount = ref('');
      const date = ref('');
      const category = ref('');
      const expenses = ref([]);
      const userStore = useUserStore();
      const router = useRouter();
  
      const fetchExpenses = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/expenses', {
            headers: { Authorization: userStore.token }
          });
          expenses.value = response.data;
        } catch(error) {
          if(error.response.status === 401) {
            router.push('/');
          }
        }
      };
  
      const addExpense = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/expenses', {
            title: title.value,
            amount: amount.value,
            date: date.value,
            category: category.value
          }, {
            headers: { Authorization: userStore.token }
          });
          expenses.value.push(response.data);
        } catch {
          alert('Failed to add expense');
        }
      };
  
      const deleteExpense = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/api/expenses/${id}`, {
            headers: { Authorization: userStore.token }
          });
          expenses.value = expenses.value.filter(exp => exp._id !== id);
        } catch {
          alert('Failed to delete expense');
        }
      };
  
      const logout = () => {
        userStore.clearUser();
        router.push('/');
      };
  
      fetchExpenses();
  
      return { title, amount, date, category, expenses, addExpense, deleteExpense, logout, fetchExpenses };
    }
  };
  </script>