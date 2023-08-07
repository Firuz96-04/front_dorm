<script setup>
import { useStudentStore } from "@/store/student";
import { ref, reactive, computed, defineEmits, defineProps } from "vue";
import { useBuildingStore } from "@/store/building";
import { useRoomTypeStore } from "@/store/room_type";
import { useRoomStore } from "@/store/room";

import { storeToRefs } from "pinia";

const buildingStore = useBuildingStore();
const roomtypeStore = useRoomTypeStore();
const roomStore = useRoomStore();

const emits = defineEmits({
  close: null,
});
const props = defineProps({
  my_open: {
    type: Boolean,
    default: false,
  },
});
const room_floor = ref(true);
const floor_count = ref(1);
const roomState = reactive({
  number: null,
  building: null,
  room_type: null,
  floor: null,
});
const buildings = computed(() => buildingStore.allBuilding);
const roomtypes = computed(() => roomtypeStore.AllRoomType);

buildingStore.setAllBuilding();
roomtypeStore.setAllRoomType();

const chooseBuild = (elem) => {
  const build = buildings.value.filter((item) => item.id == elem);
  const res = JSON.parse(JSON.stringify(build))[0];
  room_floor.value = false;
  floor_count.value = res.floor_count;
};

const closeModal = () => {
  emits("close");
  roomState.building = null
  roomState.number = null
  roomState.room_type = null
  roomState.floor = null
};
const onSubmit = () => {
  roomStore.addRoom({
    room: roomState,
    cb: closeModal,
  });
};
</script>

<template>
  <a-modal
    :maskClosable="false"
    :footer="null"
    width="400px"
    :open="my_open"
    @update:open="my_open = $event"
    :onCancel="closeModal"
  >
    <a-form
      :model="roomState"
      name="basic"
      layout="horizontal"
      :label-col="{ span: 7, offset: 0 }"
    >
      <a-form-item label="Номер" name="number">
        <a-input
          style="width: 120px"
          v-model:value="roomState.number"
          :maxlength="4"
        />
      </a-form-item>
      <a-form-item label="Тип комнаты">
        <a-select
          ref="select"
          v-model:value="roomState.room_type"
          style="width: 120px"
        >
          <a-select-option v-for="(item, idx) in roomtypes" :value="item.id">{{
            item.place
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Здания">
        <a-select
          ref="select"
          v-model:value="roomState.building"
          style="width: 150px"
          @change="chooseBuild"
        >
          <a-select-option
            v-for="(item, idx) in buildings"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="Этаж">
        <a-select
          ref="select"
          v-model:value="roomState.floor"
          style="width: 120px"
          :disabled="room_floor"
        >
          <a-select-option
            v-for="item in floor_count"
            :key="item"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-row justify="end">
        <a-button type="primary" @click.prevent="onSubmit">Добавит</a-button>
      </a-row>
    </a-form>
  </a-modal>
</template>
