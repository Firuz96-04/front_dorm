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
    fixed: 'left',
  },
  {
    dataIndex: "full_name",
    key: "full_name",
    name: "Студент",
    title: "Студент",
    width: '17%',
    fixed: 'left',
  },
  {
    key: "country",
    name: "Страна",
    title: "Страна",
    width: '13%'
  },
  {
    key: "faculty",
    name: "Факультет",
    title: "Факультет",
    width: '15%'
  },
  {
    key: "place",
    title: "Место проживание",
    children: [
    {
    key: "room",
    name: "Комната",
    title: "Комната",
    width:100
  },
  {
    key: "building",
    name: "Здание",
    title: "Здание",
    width: 150
  },
  {
    key: "floor",
    name: "Этаж",
    title: "Этаж",
    width:50
  },
    ]
  },

  {
    key: 'date',
    title: 'Дата проживание',
    children: [
    {
    key: 'book_date',
    name: "начало",
    title: "начало",
    width: '10%'
  },
  {
    key: 'book_end',
    name: "конец",
    title: "конец",
    width: '10%'
  },
    ]
  },
  {
    key: 'total_price',
    title: "Стоимость проживание",
    children: [
    {
    key: 'total_price',
    name: "total_price",
    title: "Долг",
    width: '10%'
  },
  {
    key: 'payed',
    name: "payed",
    title: "Заплатил",
    // fixed: 'right',
    width: '10%'
  },
    ]
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
    :scroll="{ y: 'calc(100vh - 200px)', x:1400 }"
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
      <template v-else-if="obj.column.key === 'book_date'">
        <span>
          {{ obj.record.book_date }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'book_end'">
        <span>
          {{ obj.record.book_end }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'total_price'">
        <span>
          {{ obj.record.total_price }}
        </span>
      </template>
      <template v-else-if="obj.column.key === 'payed'">
        <span>
          {{ obj.record.payed }}
        </span>
      </template>
      
    </template>
    <template #footer>
      <button>xxx</button>
    </template>
  </a-table>
</template>
