<script>
import {http} from "@/api/axios/interceptors";
export default {
  setup() {
    function signin() {
      return http.post("/api/token/", {
        email: "lll@gmail.com",
        password: "lll_12345",
      });
    }
    const login = async () => {
        // console.log(signin(), 'sing');
      try {
        const res = await signin();
        const { access, refresh } = res.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      login,
    };
  },
};
</script>

<template>
<h2>Home</h2>
<div style="background:#ECECEC; padding:30px">
  <a-card title="Card title" :bordered="false" style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
  <button @click="login">login</button>
</div>
</template>