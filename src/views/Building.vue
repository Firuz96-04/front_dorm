<script setup >
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { useBuildingStore } from "@/store/building";
import addModal from '@/components/building/addModal.vue'

// const AddComponent = defineAsyncComponent(() => import('@/components/building/addModal.vue'))
const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();
const buildings = computed(() => buildingStore.allBuilding);
const open = ref(false);

  const goo = () => {
    open.value = true;
    };

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    dataIndex: "name",
    key: "name",
  },
  {
    dataIndex: "principal",
    key: "principal",
    title: "Комендант",
    width:'200px'
  },
  {
    dataIndex: "floor",
    key: "floor",
    title: "Кол. этаж",
  },
  {
    key: "action",
  },
];
const closeAdd = () => open.value = false


</script>

<template>
  <button @click="goo" class="btn"> click</button>
   <a-table
    :dataSource="buildings"
    :columns="columns"
    bordered
    :pagination="false"
    size="small"
    :scroll="{y: 'calc(100vh - 200px)'}">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Название </span>
      </template>
      <template v-if="column.key === 'action'"> !!!! </template>
    </template>

    <template #bodyCell="{ column, record }" >
      
        <template v-if="column.key === 'name'"  >
        <span>
          {{ record.name }}
        </span>
      </template>
      <template v-else-if="column.key === 'principal'">
            {{ `${record.principal.last_name}  ${record.principal.name} `}}
      </template>
      <template v-else-if="column.key === 'floor'">
        {{ record.floor_count }}
      </template>

    </template>
    <template #footer>
        <button>xxx</button>
    </template>
  </a-table>
  <Teleport to="body">
    <a-modal
    :maskClosable="false" v-model:visible="open" footer=""  >
        <addModal @close="closeAdd"> </addModal>
    </a-modal>
  </Teleport>

</template>

