<template>
  <a-table
    :columns="columns"
    :data-source="faculties"
    bordered
    :pagination="false"
    :scroll="{ y: 500 }"
    size="small"
    class="my_table">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'student_count'">
        {{ column.name }}
      </template>
      <template v-else-if="column.dataIndex === 'occupied_count'">
        <span>{{ text }}</span>
      </template>
      <template v-if="column.key === 'booking_count'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'student_count'">
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'booking_count'">
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'action'"> </template>
    </template>
    <!-- <template #footer>Footer</template> -->
    <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0"> </a-table-summary-cell>
          <a-table-summary-cell :index="1">{{ total.student_total }}</a-table-summary-cell>
          <a-table-summary-cell :index="2">{{ total.book_total }}</a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
</template>

<script setup>
import { useFacultyStore } from "@/store/faculty";
import { ref, reactive, computed } from "vue";
import {storeToRefs} from 'pinia'

const facultyStore = useFacultyStore();

facultyStore.facultyTotal();
const faculties = computed(() => facultyStore.allFacultyTotal);

const {total} = storeToRefs(facultyStore)
const columns = [
  {
    name: "Факультет",
    title: "Факультет",
    dataIndex: "name",
    key: "name",
  },
  {
    name: "Студенты",
    dataIndex: "student_count",
    key: "student_count",
  },
  {
    name: "Заселены",
    dataIndex: "booking_count",
    key: "booking_count",
  },
  {
    key: "action",
    dataIndex: "action",
  },
];
</script>
