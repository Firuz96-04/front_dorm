<template>
  <a-layout-sider width="200" style="background: #bd1">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      class="sidebar"
      :style="{ height: '100%', borderRight: 0 }">
      <a-menu-item v-for="(item, i) in routers" :key="i">
        <div class="sidebar__menu">
          <font-icon
            class="sidebar__icon"
            v-if="item.icon !== ''"
            :icon="item.icon"
          />
          <div class="sidebar__link">
            <router-link :to="{ name: item.path }">
              <div class="sidebar__title">{{ item.name }}</div>
            </router-link>
          </div>
        </div>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { ref } from "vue";

import { UserOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
  },
  setup() {
    const selectedKeys = ref(["1"]);

    const routers = [
      { name: "Главная", path: "main", icon: "fa-solid fa-house" },
      { name: "Заселить", path: "booking", icon: "fa-user-plus" },
      { name: "Студенты", path: "student", icon: "fa-solid fa-users" },
      { name: "Факультеты", path: "faculty", icon: "fa-landmark" },
      { name: "Страны", path: "country", icon: "fa-solid fa-globe" },
      { name: "Комнаты", path: "apartment", icon: "fa-door-closed" },
      { name: "Здании", path: "building", icon: "fa-solid fa-building" },
      {
        name: "Коменданты",
        path: "principal",
        icon: "fa-solid fa-user-secret",
      },
      { name: "Привилегии", path: "privilege", icon: "fa-certificate" },
    ];
    return {
      selectedKeys,
      routers,
    };
  },
};
</script>

<style lang="scss" scoped>

.sidebar {
  color: rgb(59, 59, 203);

  &__menu {
    display: flex;
    justify-content: flex-start;
    // text-align: left;
    align-items: center
  }

  &__link {
    display: flex;
  }
  
  &__title {
    font-weight: 500;
    font-size: 18px;
    font-family: "Roboto", sans-serif;
  }

  &__icon {
    display: block;
    margin-right: 15px;
    width: 25px;
    height: 25px;
    // line-height: 25px;
  }
}
</style>
