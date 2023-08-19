<script setup>
import {ref, reactive, computed} from 'vue'
import { useStudentStore } from "@/store/student";
import { useFacultyStore } from "@/store/faculty";
import { useCountryStore } from "@/store/country";
import addModal from '@/components/student/addModal.vue'
import {storeToRefs} from 'pinia'

const columns = [
{
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 50,
    fixed: 'left'
  },
  {
    name: "Имя",
    title: "Имя",
    dataIndex: "name",
    key: "name",
    align: 'center',
    fixed: 'left'
  },
  {
    name: "Фамилия",
    dataIndex: "last_name",
    key: "last_name",
    align: 'center'
  },
  {
    name: "Страна",
    dataIndex: "country",
    key: "country",
    align: 'center'
  },
  {
    name: "Факультет",
    dataIndex: "faculty",
    key: "faculty",
    align: 'center'
  },
  {
    name: "Телефон",
    dataIndex: "phone",
    key: "phone",
    align: 'center'
  },
  {
    name: "Дата рождения",
    dataIndex: "born",
    key: "born",
    width: 100,
    align: 'center'
  },
  {
    name: "Тип студента",
    dataIndex: "student_type",
    key: "student_type",
    align: 'center'
  },

  {
    name: "Курс",
    dataIndex: "course",
    key: "course",
    width: 50,
    align: 'center'
  },
  {
    name: "Пол",
    dataIndex: "gender",
    key: "gender",
    width: 50,
    align: 'center'
  },
  {
    name: "Добавлен",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
    align: 'center'
  },
  {
    key: "action",
    dataIndex: "action",
  },
]

const studentStore = useStudentStore()
const countryStore = useCountryStore()
const facultyStore = useFacultyStore()
const studentParams = ref({
    page: 1
})
studentStore.setAllStudent()
studentStore.studentCategory()
const addIsModal = ref(false)
const courses = [1,2,3,4,5,6]

// const students = computed(() => studentStore.getAllStudent )
const {getAllStudent} = storeToRefs(studentStore)
const pagination = computed(() => studentStore.getPagination)
const country = computed(() => countryStore.allCountry)
const faculty = computed(() => facultyStore.getAllFaculty)
const typeStudent = computed(() => studentStore.getStudentType)

const showAdd = () => {
  addIsModal.value = true
  console.log('add modal');
}


const student_filter = ref({
  search: null,
  country: null,
  faculty: null,
  type: null
})
const current1 = ref(1)

const onShowSizeChange = (elem) => { console.log(elem, 'elem') }

const pageSize = ref([
  '4','8','16','32'
])

const handleCountry = () => {
    console.log('country');
}

const handleFaculty = () => {
    console.log('faculty');
}
const handleType = () => {
    console.log('type');
}

const handleCourse = () => {
    console.log('course');
}

const showHandle = (elem) => console.log(elem, 'show total');

const closeAddModal = () => addIsModal.value = false
const handleChange = (page, range) => {
  // console.log('44');
  studentStore.setAllStudent(studentParams.value)
  
}

const pageSizeOptions = ref([
        { value: 10, label: '10 items' },
        { value: 20, label: '20 items' },
        { value: 30, label: '30 items' },
        { value: 50, label: '50 items' }, 
])

const bugg = () => {
  console.log('ee');
}
</script>
<template>

    <a-row justify="start" style="margin-bottom: 10px;">
      <a-col :span="3">
          <a-input style="width: 150px" v-model:value="student_filter.search" placeholder="Студент" />
      </a-col>
      <a-col :span="4">
        <a-select
        ref="select"
        v-model:value="student_filter.country"
        style="width: 180px"
        placeholder="Страна"
        :options="country.map(item => ({value: item.id, label: item.name}))"
        allowClear
        @change="handleCountry"></a-select>
     </a-col>
      <a-col :span="4">
        <a-select
        ref="select"
        v-model:value="student_filter.faculty"
        style="width: 180px"
        placeholder="Факультет"
        :options="faculty.map(item => ({value: item.id, label: item.name}))"
        allowClear
        @change="handleFaculty"></a-select>
      </a-col>
      <a-col :span="4">
        <a-select
        ref="select"
        v-model:value="student_filter.type"
        style="width: 180px"
        placeholder="Тип студента"
        :options="typeStudent.map(item => ({value: item.id, label: item.type}))"
        allowClear
        @change="handleType"></a-select>
      </a-col>
      <a-col :span="4">
        <a-select
        ref="select"
        v-model:value="student_filter.course"
        style="width: 100px"
        placeholder="Курс"
        allowClear
        @change="handleCourse">
        <a-select-option v-for="item in courses" :value="item">{{ item }}</a-select-option>
      </a-select>
      </a-col>
      <a-col :span="4">
        <a-button @click="showAdd">Добавить</a-button>  
      </a-col>
      
    </a-row>

<a-table
    class="custom-table"
    :data-source="getAllStudent"
    bordered
    :columns="columns"
    :pagination="false"
    :scroll="{ y: 500, x: 1400 }"
    size="small">
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
      <template v-else-if="column.key === 'created_at'">
        {{ column.name }}
      </template>
      <template v-else-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="record" >
      <template  v-if="record.column.dataIndex === 'rowIndex'">
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
    <template #footer>
      <div class="custom-page-size-dropdown">
      <span>Items per page: </span>
      <select :v-model="4" @change="handlePageSizeChange">
        <option v-for="option in pageSizeOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
      </select>
      </div>
      {{  }}
      <a-pagination
      v-model:current="studentParams.page"
      :total="pagination.total"
      :pageSize="pagination.page_size"
      :show-ellipsis="true"
      @change="handleChange"
      size="small"
    />

    </template>
  </a-table>

  <Teleport to="body">
    <a-modal :maskClosable="false" v-model:open="addIsModal" footer=""  >
        <addModal @close="closeAddModal"> </addModal>
    </a-modal>
  </Teleport>

</template>

<style scoped>
.ant-table-tbody .ant-table-row:nth-child(even) {
  background-color: gray;
}

.ant-table-tbody >tr >td {
  background-color: rgb(40, 40, 191); 
}

</style>