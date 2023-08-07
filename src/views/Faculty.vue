<script setup>
import { useFacultyStore } from "@/store/faculty";
import {computed } from "vue";
import {storeToRefs} from 'pinia'
import { PlusOutlined, FileExcelOutlined } from "@ant-design/icons-vue"

const facultyStore = useFacultyStore();

facultyStore.facultyTotal();
const faculties = computed(() => facultyStore.allFacultyTotal);

const {total} = storeToRefs(facultyStore)
const columns = [
  {
    name: "Факультеты",
    title: "Факультеты",
    dataIndex: "name",
    key: "name",
    width: 200,
    align: "center"
  },
  {
    dataIndex: "students",
    title: "Студенты",
    key: "students",
    children: [
      {
      name: "Не Заселены",
      dataIndex: "student_count",
      key: "student_count",
      align: "center",
      width: 120,
    },
    {
      name: "Заселены",
      dataIndex: "booking_count",
      key: "booking_count",
      align: "center",
      width: 120,
    },
    ]
  },
  
  {
    key: "action",
    dataIndex: "action",
    width: 100,
  },
];
</script>
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
        <div style="text-align: left"><span>{{ text }}</span></div>
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
    <template #title>
      <div>
        <a-row>
          <a-col :span="5">
              <a-button type="text" style="background-color: #168aad; width: 50px; color: #fff; font-size: 18px; line-height: 16px;">
                <template #icon>
                  <PlusOutlined style="font-size: 18px; line-height: 18px" />
                </template>
              </a-button>
          </a-col>
          <a-col :span="14">col-8</a-col>
          <a-col :span="5">
            <div style="display: flex; justify-content: center;">
            <a-button type="text" style="background-color: #008000; display: block;">
                <template #icon>
                  <FileExcelOutlined style="font-size: 18px; line-height: 18px; color: #fff;"  />
                </template>
              </a-button>
            </div>
            </a-col>
            
        </a-row>
      </div>
    </template>
  </a-table>
  
</template>
<style scoped>
.my_table {
  width: 60%;
  margin: 0 auto;
}
</style>
