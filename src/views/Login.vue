<template>
  <h2>Login</h2>
  <div> 
    <div>
        <form @submit.prevent="login">
            <input name="email" placeholder="email" v-model="user.email"><br>
            <input name="password" type="password" placeholder="password" v-model="user.password"> <br>
        <button type="submit">send</button>    
        </form>
    </div>
    <hr>
    <button @click="handler"> click</button>

    {{ name }}

    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:open="open" title="Basic Modal" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script>
import axios from 'axios';
import {ref, reactive} from 'vue'
export default {
  setup() {

    const name = ref('message')
    const open = ref(false)
    const user = reactive({
        email:null,
        password: null
    })

    const handler = () => {
        console.log('message');
        name.value = 'firuz'
    }

    const showModal = () => {
      open.value = true
    }
    const login = async () => {
        let data = JSON.parse(JSON.stringify(user))
        const message = await axios.post('http://127.0.0.1:8000/api/token/', {
            email: 'lll@gmail.com',
            password: 'lll_12345'
        })

        console.log(message);
        console.log(message.data);
    }
    return {
        handler,
        login,
        showModal,
        name,
        user,
        open
    };
  },
};
</script>
