<template>
<a-layout-header class="header">
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal">
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
      </a-menu>
    </a-layout-header>
</template>

<script>
import {ref} from 'vue'
export default {
    setup() {
        const selectedKeys1 = ref(['1'])
        
        return {
            selectedKeys1
        }
    }
}
</script>

<style scoped>
.header {
    height: 48px;
    line-height: 48px;
}
</style>