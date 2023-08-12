<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import { useBuildingStore } from "@/store/building";
import addModal from "@/components/building/addModal.vue";

const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();
const buildings = computed(() => buildingStore.allBuilding);
const open = ref(false);

const showAddModal = () => {
  open.value = true;
};

const columns = [
  {
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 40,
    align: "center",
  },
  {
    dataIndex: "name",
    key: "name",
    width: 100,
    align: "center"
  },
  {
    dataIndex: "principal",
    key: "principal",
    title: "Комендант",
    width: 100,
    align: "center"
  },
  {
    dataIndex: "address",
    key: "address",
    title: "Адрес",
    align: "center",
    width: 200,
  },
  {
    dataIndex: "floor_count",
    key: "floor_count",
    title: "Этажность",
    align: "center",
    width: 70,
  },
  {
    key: "action",
    width: 70,
  },
];
const closeAdd = () => (open.value = false);
</script>

<template>
  <div>
    <a-button
      type="text"
      style="background-color: #7678ed; color: #fff; font-weight: 500"
      @click="showAddModal">Добавит</a-button>
    <a-table
      :dataSource="buildings"
      :columns="columns"
      bordered
      :pagination="false"
      size="small"
      :scroll="{ y: 'calc(100vh - 200px)' }"
      class="my_table">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'rowIndex'">#</template>
        <template v-if="column.key === 'name'">
          <span> Названия </span>
        </template>
        <template v-if="column.key === 'action'"> !!!! </template>
      </template>

      <template #bodyCell="record">
        <template v-if="record.column.dataIndex === 'rowIndex'">
          <span>{{ record.index + 1 }}</span>
        </template>
        <template v-if="record.column.key === 'name'">
          <span>
            <div style="text-align: left"><span>{{ record.text }}</span></div>
          </span>
        </template>
        <template v-else-if="record.column.key === 'principal'">
          <div style="text-align: left"><span>
          {{ `${record.text.last_name}  ${record.text.name}` }}</span></div>
        </template>
        <template v-if="record.column.key === 'address'">
          <span>
            <div style="text-align: left"><span>{{ record.text }}</span></div>
          </span>
        </template>
        <template v-else-if="record.column.key === 'floor_count'">
          {{ record.text }}
        </template>
      </template>
      <template #footer>
        <button>aaa</button>
      </template>
    </a-table>
  </div>
  <Teleport to="body">
    <a-modal :maskClosable="false" v-model:open="open" footer="">
      <addModal @close="closeAdd"> </addModal>
    </a-modal>
  </Teleport>
</template>

<style scoped>
.my_table {
  margin: 0 auto;
}
</style>
