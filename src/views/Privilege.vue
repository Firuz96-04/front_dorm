<script setup>
import {ref, reactive, computed} from 'vue'
import { usePrivilegeStore } from "@/store/privilege";
import { PlusOutlined } from "@ant-design/icons-vue"
import addModal from "@/components/privilege/addModal.vue";

const privilegeStore = usePrivilegeStore()


const privileges = computed(() => privilegeStore.getAllPrivilege)
privilegeStore.setAllPrivilege()
const columns = [
{
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 50,
    align: 'center'
  },
  {
    name: "Названия",
    title: "Названия",
    dataIndex: "name",
    key: "name",
    align: "center",
    width:150
  },
  {
    name: "Описания",
    title: "Описания",
    dataIndex: "description",
    key: "description",
    align: "center",
    width:350
  },
  
  {
    key: "action",
    dataIndex: "action",
    width:100
  },
];

const handleOpen = () => {

}
</script>
<template>

<a-table
    :columns="columns"
    :data-source="privileges"
    bordered
    :pagination="false"
    :scroll="{ y: 500, x: 400 }"
    size="small"
    class="my_table">
    <template #headerCell="{ column }">
        <template v-if="column.key === 'rowIndex'">
          #
      </template>
      <template v-if="column.key === 'name'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'description'">
        {{ column.name }}
      </template>

      <template v-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="record">
        <template v-if="record.column.dataIndex === 'rowIndex'">
        <span>{{ record.index + 1 }}</span>
      </template>
      <template v-if="record.column.dataIndex === 'name'">
        <div style="text-align: left"><span>{{ record.text }}</span></div>
      </template>
      <template v-else-if="record.column.dataIndex === 'description'">
        <div style="text-align: left"><span>{{ record.text }}</span></div>
      </template>
      <template v-else-if="record.column.dataIndex === 'action'">

      </template>
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

          </a-col>
            
        </a-row>
      </div>
    </template>
  </a-table>


  <Teleport to="body">
        <addModal />
  </Teleport>
</template>

<style scoped>
.my_table {
    width: 900px;
    margin: 0 auto;
}
</style>