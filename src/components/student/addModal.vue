<script setup>
import {reactive, ref, defineProps, onUpdated, computed } from 'vue'
import { useFacultyStore } from "@/store/faculty";
const facultyStore = useFacultyStore();
const {visible} = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const faculty = ref([])
const rooms = ref(null)
// const isVisible = ref(visible);
facultyStore.setAllFaculty()
onUpdated(() => {
 
    facultyStore.setAllFaculty()

    faculty.value = computed(() => facultyStore.getAllFaculty);
    // console.log(facultyStore.getAllFaculty,'llllllllllllll');
    //  rooms = computed(() => facultyStore.getAllFaculty)

    // console.log(rooms, 'rooms');
//     if (visible.value) {
  
//         facultyStore.facultyTotal();
//   // Add any other methods or requests that should be called when visible === true
// }
})

const handleModalClose = () => {
    console.log('kkkk');
    // visible.value = false
}
</script>

<template>
  <a-modal  :open="visible"  title="Добавить студента">
    <span>student</span>
        {{faculty }} klll
  </a-modal>
</template>

<!-- :open="visible" @update:open="handleModalClose" -->

