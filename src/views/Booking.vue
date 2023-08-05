<script setup>
import { ref, reactive, computed } from "vue";
import { useBookingStore } from "@/store/booking";

const useBooking = useBookingStore();

const bookings = computed(() => useBooking.getAllBookings);

useBooking.setAllBooking();

const columns = [
  {
    dataIndex: "rowIndex",
    key: "rowIndex",
    title: "#",
    width: 50,
  },
  {
    dataIndex: "full_name",
    key: "full_name",
    name: "Студент",
    title: "Студент",
  },

  {
    key: "country",
    name: "Страна",
    title: "Страна",
  },
  {
    key: "faculty",
    name: "Факультет",
    title: "Факультет",
  },
  {
    key: "room",
    name: "Комната",
    title: "Комната",
    width: 100,
  },
  {
    key: "building",
    name: "Здание",
    title: "Здание",
    width: 150,
  },
  {
    key: "floor",
    name: "Этаж",
    title: "Этаж",
    width: "5%",
  },
  {
    dataIndex: "gender",
    key: "gender",
    name: "Пол",
    title: "Пол",
    width: '5%'
  },
  {
    key: "created_at",
    name: "Дата Заселение",
    title: "Дата Заселение",
    width: 100,
  },
  {
    key: "action",
  },
];
</script>
<template>
  <!-- {{ bookings }} -->
  <a-table
    :dataSource="bookings"
    :columns="columns"
    bordered
    :pagination="false"
    size="small"
    :scroll="{ y: 'calc(100vh - 200px)', x: '100' }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> {{ column.name }} </span>
      </template>
      <template v-if="column.key === 'country'">
        <span>{{ column.name }}</span>
      </template>
    </template>

    <template #bodyCell="obj">
      <template v-if="obj.column.key === 'rowIndex'">
        <span>
          {{ obj.index + 1 }}
        </span>
      </template>
      <template v-if="obj.column.key === 'full_name'">
        <span>
          {{ obj.record.student?.full_name }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'country'">
        <span>
          {{ obj.record.student.country.name }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'faculty'">
        <span>
          {{ obj.record.student.faculty.name }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'room'">
        <span>
          {{ obj.record.room.number }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'building'">
        <span>
          {{ obj.record.room.building }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'floor'">
        <span>
          {{ obj.record.room.floor }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'gender'">
        <span v-if="obj.record.gender == 1">М</span>
        <span v-else>Ж</span>

      </template>
      <template v-else-if="obj.column.key === 'created_at'">
        <span>
          {{ obj.record.created_at }}
        </span>
      </template>
    </template>
    <template #footer>
      <button>xxx</button>
    </template>
  </a-table>
</template>
