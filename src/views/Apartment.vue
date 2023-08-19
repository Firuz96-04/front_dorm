<script setup>
import {ref, reactive, computed} from 'vue'
import { useRoomStore } from "@/store/room";

import addModal from '@/components/apartment/addModal.vue'



import { storeToRefs } from "pinia";

const roomStore = useRoomStore()

const addIsModal = ref(false)
const rooms = computed(() => roomStore.getAllRoom)


roomStore.setAllRoom()

const setRowClassName = (record, index) => {
  if (!record.is_full) {
        return 'my_style'; // Apply this class to the row
      }
      return ''; // No custom class is applied
     
}

const showKeys = (record) => {
  // console.log(record);
  return 1
}

const addRoom = () => {
  addIsModal.value = true
}

const closeAdd = () => {
  addIsModal.value = false
}

const closeEvent = () => {
    open.value = false
}
const columns = [
  {
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 50,
    align: 'center'
  },
  {
    name: "Номер",
    title: "Номер",
    dataIndex: "number",
    key: "number",
    width: 100,
    align: 'center'
  },
  {
    name: "Этаж",
    dataIndex: "floor",
    key: "floor",
    width: 100,
    align: 'center'
  },
  {
    name: "Тип комнаты",
    dataIndex: "room_type",
    key: "room_type",
    width: 100,
    align: 'center'
  },
  {
    name: "Здания",
    dataIndex: "building",
    key: "building",
    align: 'center',
    // width: 150,
    children: [
    {
        title: 'Названия',
        dataIndex: 'building_name',
        key: 'building_name',
        width: 250,
        align: 'center'
    },
    {
        title: 'Этажност',
        dataIndex: 'building_floor_count',
        key: 'building_floor_count',
        width: 100,
        align: 'center'
    }
    ]
  },
  {
    key: "action",
    dataIndex: "action",
    width: 150,
  },
];

</script>
<template>
   <div>
<a-button @click="addRoom">Добавит комнату</a-button>

<a-table
    :data-source="rooms"
    bordered
    :columns="columns"
    :pagination="false"
    :scroll="{ y: 500, x: 400 }"
    :rowClassName="setRowClassName"
    size="small"
    :rowKey="showKeys"
    class="my_table">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'rowIndex'">
          #
      </template>
      <template v-if="column.key === 'number'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'floor'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'building'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'room_type'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="record">
      <template v-if="record.column.dataIndex === 'rowIndex'">
        <span>{{ record.index + 1 }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'number'">
        <span>{{ record.text }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'floor'">
        <span>{{ record.text }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'room_type'">
        <span>{{ record.text.place }}</span>
      </template>
      <template v-else-if="record.column.dataIndex === 'action'">
            !!!!
      </template>
    </template>
    <template #footer>Footer</template>
  </a-table>
</div>
  <Teleport to="body">
        <addModal :my_open="addIsModal" @close="closeAdd"> </addModal>
  </Teleport>

</template>

<style scoped>
.ant-table-cell {
  padding: 0;
  margin: 0;
  /* background-color: #eea; */
}
.ant-table-row .ant-table-row-level-0 {
  padding: 0;
  margin: 0;
}
.ant-table .ant-table-small .ant-table-tbody tr{
  padding: 0 !important;

}

.my_table {
  background-color: #bbd;
  /* width: 80%; */
  margin: 0 auto;
}

/* .ant-table-cell{
  background-color: #bbd; */
/* } */
</style>