<script setup>
import { useFacultyStore } from "@/store/faculty";
import {computed, ref } from "vue";
import {storeToRefs} from 'pinia'
import { PlusOutlined, FileExcelFilled } from "@ant-design/icons-vue"
import addModal from '@/components/faculty/addModal.vue'

const facultyStore = useFacultyStore();
const addIsModal = ref(false)
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
      name: "Кол. студентов",
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

const showAddModal = () => addIsModal.value = true

const closeAddModal = () => addIsModal.value = false
const exportToExcel = () => {
  alert('Excel')
}
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
    <template #footer>Footer</template>
    <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0"> </a-table-summary-cell>
          <a-table-summary-cell :index="1"><div style="text-align: center; font-size: 14px; font-weight: 500;"> {{ total.student_total }}</div> </a-table-summary-cell>
          <a-table-summary-cell :index="2"><div style="text-align: center; font-size: 14px; font-weight: 500;">{{ total.book_total }}</div></a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
    <template #title>
      <div>
        <a-row>
          <a-col :span="5">
              <a-button @click="showAddModal" type="text" style="background-color: #168aad; width: 50px; color: #fff; font-size: 18px; line-height: 16px;">
                <template #icon>
                  <PlusOutlined style="font-size: 18px; line-height: 18px" />
                </template>
              </a-button>
          </a-col>
          <a-col :span="14">col-8</a-col>
          <a-col :span="5">
            <div style="display: flex; height: 100%; align-items: center; justify-content: flex-end; ">
                  <FileExcelFilled @click="exportToExcel" style="font-size: 26px; line-height: 18px; color: #77af36; cursor: pointer;"   />
            </div>
          </a-col>
            
        </a-row>
      </div>
    </template>
  </a-table>
  <Teleport to="body">
    <addModal :my_open="addIsModal" @close="closeAddModal"/>
  </Teleport>
</template>
<style scoped>
.my_table {
  width: 60%;
  margin: 0 auto;
}
</style>
