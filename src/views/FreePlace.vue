<script setup>
import { ref, reactive, computed } from "vue";
import { useBuildingStore } from "@/store/building";
import { useFreePlaceStore } from "@/store/free_place";
import addModal from '@/components/free/addFree.vue'

const buildStore = useBuildingStore();
const freeStore = useFreePlaceStore();
const addIsModal = ref(false)
const buildings = computed(() => buildStore.allBuilding);
const free_stores = computed(() => freeStore.getAllFreePlace);
let timeout;
const search = ref({
  building: null,
  room: null,
  floor: null,
  is_full: null,
  place: null,
});
const apartment = ref(null)
const room_status = ref([
  {
    value: 0,
    label: "свободно",
  },
  {
    value: 1,
    label: "занято",
  },
]);

const room_place = ref([
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
]);

const closeAddModal = () => addIsModal.value = false
freeStore.setAllFreePlace(search.value);
const floor_count = ref([]);
const handleSearchBuild = (elem) => {
  const build = buildings.value.filter((item) => item.id == elem);
  floor_count.value = build[0]?.floor_count;
  freeStore.setAllFreePlace(search.value);
};

const floorChange = (floor) => {
  freeStore.setAllFreePlace(search.value);
};

const isFullHandle = (elem) => {
  freeStore.setAllFreePlace(search.value);
};
const placeHandle = (elem) => {
  search.value.place = elem;
  freeStore.setAllFreePlace(search.value);
};

const handleRoom = (elem) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => {
    freeStore.setAllFreePlace(search.value);
  }, 500);
};
const bookHandle = (is_book, room) => {

    if (!is_book) {
          addIsModal.value = true
          apartment.value = JSON.parse(JSON.stringify(room))
    }

}
const columns = [
  {
    dataIndex: "rowIndex",
    key: "rowIndex",
    title: "#",
    fixed: "left",
    width: 40,
    align: "center",
  },
  {
    title: "Комната",
    dataIndex: "number",
    key: "number",
    width: 100,
    align: "center",
  },
  {
    title: "Этаж",
    dataIndex: "floor",
    key: "floor",
    width: 100,
    align: "center",
  },
  {
    title: "Здания",
    dataIndex: "building",
    key: "building",
    width: 150,
    align: "center",
  },
  {
    title: "Тип комнаты",
    dataIndex: "room_place",
    key: "room_place",
    width: 150,
    align: "center",
  },
  {
    title: "Кол. проживаюших",
    dataIndex: "person_count",
    key: "person_count",
    width: 150,
    align: "center",
  },
  {
    title: "Свободные места",
    dataIndex: "free_place",
    key: "free_place",
    width: 150,
    align: "center",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "!!!",
    width: 80,
    align: "center",
  },
];

// const my_row = (record) => {
//   return {
//     onClick: (event) => {
//       if (event.target.cellIndex !== columns.length - 1) {
//               // Handle row click event here
//               console.log("Row clicked:", record);
//             }
//     }
//  };
// }
</script>
<template>
  <a-row justify="start" style="margin-bottom: 10px;">
    <a-col :span="4">
      <a-select
        v-model:value="search.building"
        placeholder="Здания"
        style="width: 180px"
        allowClear
        @change="handleSearchBuild"
        :options="buildings.map((elem) => ({ value: elem.id, label: elem.name }))">
      </a-select>
    </a-col>
    <a-col :span="3">
      <a-select
        ref="select"
        placeholder="Этаж"
        v-model:value="search.floor"
        @change="floorChange"
        allowClear
        style="width: 150px"
      >
        <a-select-option
          v-for="item in floor_count"
          :key="item"
          :value="item"
          >{{ item }}</a-select-option
        >
      </a-select>
    </a-col>
    <a-col :span="3">
      <a-select
        v-model:value="search.is_full"
        placeholder="Статус"
        style="width: 150px"
        :options="room_status"
        allowClear
        @change="isFullHandle"
      ></a-select>
    </a-col>
    <a-col :span="3">
      <a-select
        ref="select"
        v-model:value="search.place"
        placeholder="Кол. мест"
        style="width: 150px"
        :options="room_place"
        allowClear
        @change="placeHandle"
      ></a-select>
    </a-col>
    <a-col :span="3">
      <a-input
        v-model:value="search.room"
        allowClear
        placeholder="Комната"
        @change="handleRoom"
        :maxlength="4"
      />
    </a-col>
  </a-row>

  <a-table
    :columns="columns"
    :data-source="free_stores"
    bordered
    :pagination="false"
    :scroll="{ y: 500 }"
    size="small"
    class="my_table">
    <template #headerCell="{ column }">
      <template v-if="column.name === 'number'">
        {{ column.name }}
      </template>
      <template v-if="column.key === 'action'"> !!! </template>
    </template>

    <template #bodyCell="obj">
      <template v-if="obj.column.key === 'rowIndex'">
        <span>
          {{ obj.index + 1 }}
        </span>
      </template>
      <template v-if="obj.column.dataIndex === 'number'">
        <span>{{ obj.text }} </span>
      </template>
      <template v-if="obj.column.dataIndex === 'action'">
        <a-button
          size="small"
          @click="bookHandle(obj.record.is_full, obj.record)"
          :class="!obj.record.is_full ? 'is_free' : 'is_busy'" type="text">
          <span v-if="!obj.record.is_full">Заселить</span>
          <span v-else>Занято</span>
        </a-button>
      </template>
    </template>
    <template #footer>Footer</template>
  </a-table>
  <Teleport to="body">
      <addModal :my_open="addIsModal" :room_data="apartment" @close="closeAddModal" />
  </Teleport>
</template>
<style scoped>
.is_free {
  background-color: #76c893;
  width: 80px;
}

.is_busy {
  background-color: #ff4d6d;
  width: 80px;
  cursor: auto
}
</style>
