<script setup>
import { ref, reactive, computed } from "vue";
import { useBookingStore } from "@/store/booking";
import addModal from '@/components/booking/addModal.vue'
import { PlusOutlined, FileExcelFilled, PlusSquareOutlined } from "@ant-design/icons-vue"
const useBooking = useBookingStore();

const bookings = computed(() => useBooking.getAllBookings);

useBooking.setAllBooking();

const open = ref(false);

const book_filter = ref({
  student: null,
  faculty: null,
  building: null,
  room: null,
  gender: null
})
const showAddModal = () => {
  open.value = true
}
const columns = [
  {
    dataIndex: "rowIndex",
    key: "rowIndex",
    title: "#",
    fixed:'left',
    width: 40,
    align: "center"
  },
  {
    key: "student",
    name: "Студент",
    title: "Студент",
    children: [
      {
        dataIndex: "full_name",
        key: "full_name",
        name: "Студент",
        title: "Студент",
        fixed:'left',
        align: "center",
        width: 200,
      },

      {
        key: "country",
        name: "Страна",
        title: "Страна",
        align: "center",
        width: 150,
      },
      {
        key: "faculty",
        name: "Факультет",
        title: "Факультет",
        align: "center",
        width: 150,
      },
      {
        dataIndex: "course",
        key: "course",
        name: "Курс",
        title: "Курс",
        align: "center",
        width: 50,
      },
      {
        dataIndex: "gender",
        key: "gender",
        name: "Пол",
        title: "Пол",
        align: "center",
        width: 50,
      },
    ],
  },

  {
    key: "booking_place",
    name: "Место проживания",
    title: "Место проживания",
    children: [
      {
        key: "room",
        name: "Комната",
        title: "Комната",
        width: 100,
        align: "center"
      },
      {
        key: "building",
        name: "Здание",
        title: "Здание",
        width: 150,
        align: "center"
      },
      {
        key: "floor",
        name: "Этаж",
        title: "Этаж",
        width: 50,
        align: "center"
      },
    ],
  },
  {
    key: "booking_payment",
    title: "Стоимость проживание",
    children: [
      {
        key: "total_price",
        name: "Стоимость",
        title: "Стоимость",
        align: "center"
      },
      {
        key: "payed",
        name: "Оплатил",
        title: "Оплатил",
        align: "center"
      },
    ],
  },
  {
    key: "booking_date",
    title: "Дата проживание",
    children: [
      {
        key: "book_date",
        title: "Начало",
        align: "center"
      },
      {
        key: "book_end",
        title: "Конец",
        align: "center"
      },
    ],
  },

  {
    key: "action",
    title: "!!!",
    width: 80
  },
];

const closeAdd = () => {
  open.value = false
}

const localeConfig = ref({
  emptyText: 'refresh page'
});

</script>


<template>
   <!-- <a-button type="primary" @click="showAddModal">Заселить</a-button> -->
  <div>
    <a-row justify="start" style="margin-bottom: 10px;">
      <a-col :span="3"> 
        <a-input 
          v-model:value="book_filter.student" 
          placeholder="Студент"
          :maxlength="15"
          allowClear
          />
      </a-col>
      <a-col :span="4">
        <a-select 
           v-model:value="book_filter.faculty" 
           :options="[]"
           style="width: 100%"
           placeholder="Факультет"
           allowClear
           ></a-select>
      </a-col>
      <a-col :span="2">
        <a-select 
           v-model:value="book_filter.gender" 
           :options="[]"
           style="width: 100%"
           placeholder="Пол"
           allowClear
           ></a-select>
      </a-col>
      <a-col :span="3">
        <a-select 
           v-model:value="book_filter.building" 
           :options="[]"
           style="width: 100%"
           placeholder="Здания"
           allowClear
           ></a-select>
      </a-col>
      <a-col :span="2">
        <a-input 
          v-model:value="book_filter.room"
          placeholder="Комната"
          :maxlength="4"
          allowClear
          />
      </a-col>
  
    </a-row>

  <a-table
    :dataSource="bookings"
    :columns="columns"
    bordered
    :locale="localeConfig"
    :pagination="false"
    size="small"
    :scroll="{ y: 'calc(100vh - 200px)', x: 1500 }">

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
      
      <template v-else-if="obj.column.key === 'course'">
        <span>{{ obj.record.student.course }}</span>
      </template>
      <template v-else-if="obj.column.key === 'gender'">
        <span v-if="obj.record.gender == 1">М</span>
        <span v-else>Ж</span>
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
ss
    </template>
  </a-table>
</div>
  <Teleport to="body">
    <a-modal
    :maskClosable="false" v-model:open="open" footer=""  >
        <addModal @close="closeAdd"> </addModal>
    </a-modal>
  </Teleport>

</template>

<style scoped>
.ant-row .ant-col{
  background-color: rgb(29, 211, 150);
  margin-right: 15px;
}
</style>