<script setup >
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { useBuildingStore } from "@/store/building";
import addModal from '@/components/building/addModal.vue'

// const AddComponent = defineAsyncComponent(() => import('@/components/building/addModal.vue'))
const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();
const buildings = computed(() => buildingStore.allBuilding);
const open = ref(false);

  const showAddModal = () => {
    open.value = true;
    };

const columns = [
  {
    dataIndex: "name",
    key: "name",
    width: 200
  },
  {
    dataIndex: "principal",
    key: "principal",
    title: "Комендант",
    width: 200
  },
  {
    dataIndex: "floor",
    key: "floor",
    title: "Кол. этаж",
    width: 100
  },
  {
    key: "action",
    width: 100
  },
];
const closeAdd = () => open.value = false


</script>

<template>

  <div style="width: 800px; margin: 0 auto;">
    <a-button type="text" style="background-color: #7678ed; color: #fff; font-weight: 500;" @click="showAddModal">Добавит</a-button>
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
  </div>
  <Teleport to="body">
    <a-modal
    :maskClosable="false" v-model:open="open" footer=""  >
        <addModal @close="closeAdd"> </addModal>
    </a-modal>
  </Teleport>

</template>

