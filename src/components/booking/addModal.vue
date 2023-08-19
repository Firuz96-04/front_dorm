<script setup>
import {ref, reactive, computed} from 'vue'
import qs from 'qs';
import { useStudentStore } from "@/store/student";
import {useBookingStore} from '@/store/booking'

const formState = reactive({
  student: null,
  room: null,
  privilege: 1
})

const value1 = ref(null)
const bookStore = useBookingStore()
const studentStore = useStudentStore()

const handleChange = value => {
  console.log(`selected ${value}`);
};

const filterOption = (input, option) => {
  
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const handleSearch = (elem) => {
  studentStore.setAllStudent(name=elem)

}
const students = computed(() => studentStore.getAllStudent)
const value = ref(undefined);
</script>

<template>
  <div style="margin-top: 25px;">
    <a-select
      v-model:value="formState.student"
      show-search
      :allowClear="true"
      placeholder="Select a person"
      style="width: 200px"
      :options="students"
      :field-names="{ value: 'id', label: 'name' }"
      :filter-option="filterOption"
      @change="handleChange"
      @search="handleSearch"
  ></a-select>
  <a-range-picker v-model:value="value1"  picker="date"/>
  {{ value1 }}
  {{ formState.student }}
  </div>
</template>

