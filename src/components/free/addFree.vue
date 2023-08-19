<script setup>
import { ref, reactive, defineProps, onUpdated, onUnmounted, onDeactivated, onMounted, computed } from "vue";
import { usePrivilegeStore } from "@/store/privilege";
import { useFreePlaceStore } from "@/store/free_place";

const privilegeStore = usePrivilegeStore()
const placeStore = useFreePlaceStore()
let timeout;
const props = defineProps({
  my_open: {
    type: Boolean,
    default: false,
  },
  room_data: {
    type: Object,
    required: false,
  },
});

const emits = defineEmits({
  close: null,
});

const myClose = () => emits("close");
const apartment = ref({
  student: null,
  book_date: null,
  book_end: null,
  privilege: null,
});

const current_date = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  apartment.value.book_date = formattedDate
}

onUpdated(() => {
  privilegeStore.setAllPrivilege()
  

  apartment.value = { ...props.room_data };
  current_date()
});

const privileges = computed(() => privilegeStore.getAllPrivilege)

const addPlaceHandle = () => {
  const apart_data = {
    student: apartment.value.student,
    book_date: apartment.value?.book_date,
    privilege: apartment.value?.privilege,
    room: apartment.value?.room_id
  }

  placeStore.addFreeBook({
      apartment: apart_data,
      cb: myClose
    })
}

const free_students = computed(() => placeStore.getFreeStudent)

const studentHandle = (elem) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => {
    placeStore.setAllFreeStudent({
    search: elem
  })
  }, 500);
}

const filterOption = (input, option) =>  option.full_name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
onMounted(() => {
  console.log('this is onMounted');
})
onUnmounted(() => {
    console.log('is closed');
})

onDeactivated(() => {
  console.log('is closed');
})
</script>
<template>
  <a-modal
    :open="my_open"
    @update:open="my_open = $event"
    title="Заселить студента"
    :maskClosable="false"
    :footer="null"
    :onCancel="myClose"
    width="350px">
    <div style="margin-top: 15px">
      <a-form
        :model="apartment"
        name="basic"
        @submit.prevent="addPlaceHandle"
        :label-col="{ span: 7, offset: 0 }">
        <a-form-item label="Здания">
          <!-- <span>{{ apartment.building }}</span> -->
          <a-input v-model:value="apartment.building" :disabled="true" placeholder="Здания" />
        </a-form-item>
        <a-form-item label="Комната">
          <!-- <span>{{ apartments.number }}</span> -->
          <a-input
            style="width: 100px"
            v-model:value="apartment.number"
            :disabled="true"
            placeholder="Комната"
          />
        </a-form-item>
        <a-form-item label="Этаж">
          <a-input
            style="width: 100px"
            v-model:value="apartment.floor"
            :disabled="true"
            placeholder="Этаж"
          />
          <!-- <span>{{ apartment.floor }}</span> -->
        </a-form-item>

        <a-form-item label="Кол. мест">
          <!-- {{ apartment.free_place }} -->
          <a-input
            style="width: 100px"
            v-model:value="apartment.free_place"
            :disabled="true"
            placeholder="Здания"
          />
        </a-form-item>
        <a-form-item label="Студент">
          <a-select
            ref="select"
            placeholder="Поиск студента"
            allowClear
            v-model:value="apartment.student"
            show-search
            :options="free_students"
            :filter-option="filterOption"
            @search="studentHandle"
            :field-names="{ label: 'full_name', value: 'id'}"></a-select>
        </a-form-item>
        <a-form-item name="book_date" label="Начало">
          <a-date-picker
            :allowClear="false"
            v-model:value="apartment.book_date"
            placeholder="Начало"
            style="width: 150px"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="Привилегия">
          <a-select
            ref="select"
            allowClear
            placeholder="Привилегия"
            v-model:value="apartment.privilege"
            style="width: 150px"
            :options="privileges.map(item => ({ value: item.id, label: item.name }))">
          </a-select>
        </a-form-item>
        <!-- <a-form-item name="book_end" label="Конец">
      <a-date-picker v-model:value="apartments['book_end']" value-format="YYYY-MM-DD" />
    </a-form-item> -->
        <a-form-item :wrapper-col="{ offset: 17 }">
          <a-button type="primary" html-type="submit" class="">Добавить</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style scoped>
.ant-form-item {
  margin-bottom: 10px !important;
}
</style>
