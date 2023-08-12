<template>
  <a-layout-sider width="200">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      class="sidebar"
      :style="{ height: '100%', borderRight: 0 }">
      <a-menu-item v-for="(item, i) in routers" :key="i">
        <!-- :class="{'ant-menu-item-selected': item.path == 'booking'  }" -->
        <div class="sidebar__menu ">
          <font-icon
            class="sidebar__icon"
            v-if="item.icon !== ''"
            :icon="item.icon"
          />
          <div class="sidebar__link" >
            <RouterLink  :to="item.path"        >
              <div class="sidebar__title">{{ item.name }}</div>
            </RouterLink>
          </div>

        </div>
        
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'
const selectedKeys = ref(["1"]);

const router = useRouter()
const route = useRoute()
const routers = [
  { name: "Главная", path: "/main", icon: "fa-solid fa-house" },
  { name: "Free", path: "/free-place", icon: "fa-user-plus" },
  { name: "Заселить", path: "/booking", icon: "fa-user-plus" },
  { name: "Студенты", path: "/student", icon: "fa-solid fa-users" },
  { name: "Факультеты", path: "/faculty", icon: "fa-landmark" },
  { name: "Страны", path: "/country", icon: "fa-solid fa-globe" },
  { name: "Комнаты", path: "/apartment", icon: "fa-door-closed" },
  { name: "Здании", path: "/building", icon: "fa-solid fa-building" },
  {name: "Коменданты", path: "/principal", icon: "fa-solid fa-user-secret"},
  { name: "Привилегии", path: "/privilege", icon: "fa-certificate" },
];

onMounted(() => {
  // console.log(route.params,' route');
  // console.log(route.name,' route');
})

computed(() => {
  console.log(route.name,' computed');
})

</script>

<style lang="scss" scoped>

.sidebar {
  color: rgb(59, 59, 203);

  &__menu {
    display: flex;
    justify-content: flex-start;
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
