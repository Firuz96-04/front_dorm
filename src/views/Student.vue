<script setup>
import {ref, reactive, computed} from 'vue'
import { useStudentStore } from "@/store/student";
import { storeToRefs } from "pinia";


const columns = [
{
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 50
  },
  {
    name: "Имя",
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    name: "Фамилия",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    name: "Страна",
    dataIndex: "country",
    key: "country",
  },
  {
    name: "Факультет",
    dataIndex: "faculty",
    key: "faculty",
  },
  {
    name: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    name: "Дата рождение",
    dataIndex: "born",
    key: "born",
    width: 100
  },
  {
    name: "Тип студента",
    dataIndex: "student_type",
    key: "student_type",
  },

  {
    name: "Курс",
    dataIndex: "course",
    key: "course",
    width: 50
  },
  {
    name: "Пол",
    dataIndex: "gender",
    key: "gender",
    width: 50
  },
  {
    key: "action",
    dataIndex: "action",
  },
]

const studentStore = useStudentStore()

studentStore.setAllFaculty()


const students = computed(() => studentStore.getAllStudent )

</script>
<template>
<a-table
    class="custom-table"
    :data-source="students"
    bordered
    :columns="columns"
    :pagination="false"
    :scroll="{ y: 500, x: 400 }"
    size="small"

    >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'rowIndex'">
          #
      </template>
      <template v-else-if="column.key === 'name'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'last_name'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'country'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'faculty'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'phone'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'born'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'student_type'">
        {{ column.name }}
      </template> 
      <template v-else-if="column.key === 'course'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'gender'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="record">
      <template v-if="record.column.dataIndex === 'rowIndex'">
        <span>{{ record.index + 1 }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'name'">
        <span>{{ record.text }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'last_name'">
        <span>{{ record.text }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'country'">
        <span>{{ record.text.name }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'faculty'">
        <span>{{ record.text.name }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'student_type'">
        <span>{{ record.text.type }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'gender'">
        <span v-if="record.text == 0">Ж</span>
        <span v-else>М</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'action'">
            !!!!
      </template>
    </template>
    <template #footer>Footer 33</template>
  </a-table>

</template>

<style scoped>
.ant-table-tbody .ant-table-row:nth-child(even) {
  background-color: gray;
}

</style>