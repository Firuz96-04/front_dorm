<script setup>
import { ref, computed } from "vue";
import { useCountryStore } from "@/store/country";
import { storeToRefs } from "pinia";
import addModal from "@/components/country/addModal.vue";
import { EditOutlined, DeleteOutlined, PlusOutlined, FileExcelFilled } from "@ant-design/icons-vue"
const countryStore = useCountryStore();

const columns = [
  {
    name: "Страны",
    title: "Страны",
    dataIndex: "name",
    key: "name",
    align: "center",
    width:200
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
        width:120
      },
      {
        name: "Заселены",
        dataIndex: "booking_count",
        key: "booking_count",
        align: "center",
        width:120
      },
    ]
    },
  
  {
    key: "action",
    dataIndex: "action",
    width:100
  },
];
const addIsModal = ref(false)
countryStore.countryTotal();

const add = () => {
  countryStore.addCountry({ name: "gfdgdf" });
};
const countries = computed(() => countryStore.allCountryTotal);
const handleOpen = () => {
  addIsModal.value = true;
};
const handleClose = () => {
  console.log('handleClose');
  addIsModal.value = false;
};

const {total} = storeToRefs(countryStore)
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="countries"
    bordered
    :pagination="false"
    :scroll="{ y: 500, x: 400 }"
    size="small"
    class="my_table">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'student_count'">
        {{ column.name }}
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
      <template v-else-if="column.dataIndex === 'action'">
        <a-button type="text" :style="{ background: '#adc' }">
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>
        <a-button type="text">
          <template #icon>
            <delete-outlined />
          </template>
        </a-button>
      </template>
    </template>
    <!-- <template #footer>
      </template> -->
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
              <a-button @click="handleOpen" type="text" style="background-color: #168aad; width: 50px; color: #fff; font-size: 18px; line-height: 16px;">
                <template #icon>
                  <PlusOutlined style="font-size: 18px; line-height: 18px" />
                </template>
              </a-button>
          </a-col>
          <a-col :span="14">col-8</a-col>
          <a-col :span="5">
            <div style="display: flex; height: 100%; align-items: center; justify-content: flex-end; ">
                  <FileExcelFilled  style="font-size: 26px; line-height: 18px; color: #77af36; cursor: pointer;"   />
            </div>
          </a-col>
            
        </a-row>
      </div>
    </template>
  </a-table>
  <Teleport to="body">
    
      <addModal :my_open="addIsModal" @close="handleClose"></addModal>

  </Teleport>
</template>

<style scoped>
.my_table {
  width: 60%;
  margin: 0 auto;
}
.ant-table-tbody tr {
  cursor: pointer;
}

.ant-btn {
  background-color: "#bbc";
}
</style>
