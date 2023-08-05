<script setup>
import { useStudentStore } from "@/store/student";
import { ref, reactive, computed, defineEmits } from "vue";
import { useBuildingStore } from "@/store/building";
import { useRoomTypeStore } from "@/store/room_type";
import {storeToRefs} from 'pinia'

const buildingStore = useBuildingStore();
const roomtypeStore = useRoomTypeStore();
const emits = defineEmits({
  close: null,
});
const room_floor = ref(true)
const floor_count = ref(1)
const formState = reactive({
  number:null,
  building: null,
  room_type: null,
  floor: null
});
const buildings = computed(() => buildingStore.allBuilding);
const roomtypes = computed(() => roomtypeStore.AllRoomType);

buildingStore.setAllBuilding();
roomtypeStore.setAllRoomType();

// const studentStore = useStudentStore()
// const student = ref(undefined)

// studentStore.setAllFaculty()
// const all_student = computed(() => studentStore.getAllStudent )

// const filterOption = (input, option) => {
//   console.log(option, 'op[tion]');
//   return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
// };

// const handleChange = value => {
//   console.log(`selected`);
// };
const chooseBuild = (elem) => {
  console.log(elem, 'elem');

    // const floor = buildings.value[elem]?.floor_count
    // console.log(floor, 'loor');
    // room_floor.value = false
    // floor_count.value = floor
}
</script>

<template>
  <div style="margin-top: 25px">
    <a-form
      :model="formState"
      name="basic"
      layout="horizontal"
      :label-col="{span: 7, offset: 0}">
      <a-form-item label="Номер" name="number">
      <a-input style="width: 120px;"/>
    </a-form-item>
    <a-form-item label="Тип комнаты">
      <a-select
        ref="select"
        v-model:value="formState.room_type"
        style="width: 120px;"
      >
        <a-select-option v-for="(item, idx) in roomtypes" :value="item.id">{{item.place}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Здания">
      <a-select
        ref="select"
        v-model:value="formState.building"
        style="width: 150px;"
        @change="chooseBuild"
      >
        <a-select-option v-for="(item, idx) in buildings" :key="item.id" :value="item.id">{{
          item.name
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Этаж">
      <a-select
        ref="select"
        v-model:value="formState.floor"
        style="width: 120px;"
        :disabled="room_floor"
      >
        <a-select-option v-for="item in floor_count"  :key="item" :value="item">{{item}}</a-select-option>
      </a-select>
    </a-form-item>
    </a-form>

  </div>
</template>
