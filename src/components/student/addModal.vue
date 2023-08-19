<script setup>
import {ref, defineEmits, defineProps, computed } from "vue";
import { useStudentStore } from "@/store/student";
import { useFacultyStore } from "@/store/faculty";
import { useCountryStore } from "@/store/country";

import {storeToRefs} from 'pinia'

const facultyStore = useFacultyStore();
const studentStore = useStudentStore();
const countryStore = useCountryStore();

const {getStudentType } = storeToRefs(studentStore)
const {getAllFaculty} = storeToRefs(facultyStore)
const {allCountry} = storeToRefs(countryStore)

const emits = defineEmits({
  close: null,
});

const course = [1, 2, 3, 4, 5, 6];
const student = ref({
  name: "",
  last_name: "",
  phone: "",
  born: null,
  address: "",
  gender: null,
  student_type: null,
  faculty: null,
  country: null,
  course: null,
});
const genderOption = ref([
  {
    value: "0",
    label: "женшина",
  },
  {
    value: "1",
    label: "мужчина",
  },
]);


const closeModal = () => {
  emits('close')
  student.value.name = ''
  student.value.last_name = ''
  student.value.phone = ''
  student.value.address = ''
  student.value.gender = null
  student.value.born = null
  student.value.student_type = null
  student.value.faculty = null
  student.value.country = null
  student.value.course = null
}
const addStudent = () => {
  const res = JSON.parse(JSON.stringify(student.value));
  studentStore.addStudent({
    student: res,
    cb: closeModal
  });
};

console.log('mmmm');
</script>

<template>
  <div class="scrollable-modal-content" style="margin-top: 25px;">
    <div class="scrollable-content">
      <a-form
        @submit.prevent="addStudent"
        :model="student"
        :label-col="{
          span: 7,
        }"
        style="margin-top: 15px"
        :scroll="{ y: 500 }"
        :scrollToFirstRowOnChange="true"
      >
        <a-form-item label="Имя">
          <a-input
            v-model:value="student.name"
            style="width: 200px"
            :maxlength="25"
            placeholder="Имя"
          />
        </a-form-item>
        <a-form-item label="Фамилия">
          <a-input
            v-model:value="student.last_name"
            style="width: 200px"
            :maxlength="25"
            placeholder="Фамилия"
          />
        </a-form-item>
        <a-form-item label="Телефон">
          <a-input
            v-model:value="student.phone"
            style="width: 200px"
            :maxlength="15"
            placeholder="Номер телефона"
          />
        </a-form-item>

        <a-form-item label="Факультет">
          <a-select
            ref="select"
            allowClear
            placeholder="Факультет"
            v-model:value="student.faculty"
            style="width: 200px"
            :options="getAllFaculty.map(item => ({value: item.id, label: item.name}))">
          </a-select>
        </a-form-item>
        <a-form-item label="Страна">
          <a-select
            ref="select"
            allowClear
            placeholder="Страна"
            v-model:value="student.country"
            style="width: 200px"
            :options="allCountry.map(item => ({value: item.id, label: item.name}))"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="Курс">
          <a-select
            ref="select"
            allowClear
            placeholder="Курс"
            v-model:value="student.course"
            style="width: 150px">
            <a-select-option v-for="item in course" :value="item">{{
              item
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Тип студента">
          <a-select
            ref="select"
            allowClear
            placeholder="Тип студента"
            v-model:value="student.student_type"
            style="width: 150px"
            :options="getStudentType.map(item => ({value: item.id, label: item.type}))">
            <!-- <a-select-option v-for="item in student_types" :value="item.id">{{item.type}}</a-select-option> -->
          </a-select>
        </a-form-item>
        <a-form-item label="Пол">
          <a-select
            ref="select"
            placeholder="Пол"
            v-model:value="student.gender"
            style="width: 150px"
            allowClear
            :options="genderOption"></a-select>
        </a-form-item>
        <a-form-item name="born" label="Дата рождения">
          <a-date-picker
            :allowClear="false"
            v-model:value="student.born"
            placeholder="Дата рождения"
            style="width: 150px"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="Адрес">
          <a-textarea
            v-model:value="student.address"
            placeholder="Адрес студента"
            :maxlength="100"
            style="width: 250px"
            :rows="3"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 17 }">
          <a-button type="primary" html-type="submit" class="">Добавить</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped>
.scrollable-modal-content {
  max-height: 75vh; /* Set your desired maximum height for the modal */
}

.scrollable-content {
  max-height: calc(
    75vh - 60px
  ); /* Set your desired maximum height for scroll content */
  overflow-y: auto;
}
.ant-form-item {
  margin-bottom: 10px !important;
}
</style>
