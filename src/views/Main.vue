<template>
  <a-layout>
    <HeaderVue />
    <a-layout>
      <SidebarVue />
      <a-layout style="padding: 0 12px">
        <a-layout-content
          class="my_content"
          :style="{ padding: '24px', margin: 0 }">
            <RouterView/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import HeaderVue from '@/layouts/Header.vue'
import SidebarVue from '@/layouts/Sidebar.vue'
export default defineComponent({
  components: {
    HeaderVue,
    SidebarVue
  },
  setup() {
    return {
      collapsed: ref(false),
    };
  },
});
</script>


<style scoped>
.my_content {
  background: #cde;
  height: calc(100vh - 48px);
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>