<template>
  <div>
    <a-form
      @finish="onFinish"
      @submit.prevent="addBuilding"
      :model="building"
      :label-col="{
        span: 5,
      }"
      style="margin-top: 35px"
    >
      <a-form-item label="Здания">
        <a-input
          v-model:value="building.name"
          style="width: 60%"
          :maxlength="25"
        />
      </a-form-item>

      <a-form-item label="Комендант">
        <a-select
          v-model:value="building.principal"
          placeholder="комендант"
        >
          <a-select-option
            v-for="item in getAllPrincipal"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Этажность">
        <a-input-number type="number" id="inputNumber" v-model:value="building.floor_count" :min="1" :max="10" />
      </a-form-item>
      <a-form-item label="Адрес">
        <a-input v-model:value="building.address" :maxlength="100" />
      </a-form-item>
      <a-form-item label="Комментария">
        <a-textarea v-model:value="building.description" />
      </a-form-item>

      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, defineEmits, onMounted, reactive } from "vue";
import { usePrincipalStore } from "@/store/principal";
import { useBuildingStore } from "@/store/building";

const emit = defineEmits({
  close: null
})

const building = reactive({
  name: "",
  address: "",
  floor_count: 1,
  principal: null,
  description: "",
});

const principal = usePrincipalStore();
const buildingStore = useBuildingStore()

const addBuilding = () => {
  buildingStore.addBuilding({
   data: building,
   cb: closeForm
  })
};

const onFinish = () => {
  console.log("eeee");
};

const closeForm = () => {
  emit('close')
  building.name = ''
  building.address = ''
  building.floor_count = 1
  building.principal = null
  building.description = ''
} 
onMounted(() => {
  principal.setAllPrincipal();
});

const { getAllPrincipal } = storeToRefs(usePrincipalStore());

</script>
