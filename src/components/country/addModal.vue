<script setup>
import { useCountryStore } from "@/store/country";
import { reactive, ref, defineEmits, defineProps } from "vue";

const emits = defineEmits({
  close: null,
});
const props = defineProps({
  my_open: {
      type: Boolean,
      default: false
  }
})

const formState = reactive({
  name: "",
});
const countryStore = useCountryStore();

const addCountry = () => {
  countryStore.addCountry({
    data: formState,
    cb: closeModal,
  });

};
const closeModal = () => {
  emits("close");
  formState.name = ''
  
};
</script>

<template>
  <a-modal
    :maskClosable="false"
    :open="my_open"
    @update:open="my_open = $event"
    title="Добавить Страну"
    :onCancel="closeModal"
    :footer="null"
    width="400px"
  >
    <a-form :model="formState"
        class="my_form" 
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 15 }"
        @submit.prevent="addCountry"
    >
      <a-form-item label="Страна">
        <a-input
          v-model:value="formState.name"
          :maxlength="25"
          style="width: 250px"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 15 }">
          <a-button type="primary" html-type="submit">Добавить</a-button>
        </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.my_form {
  margin-top: 40px;
}
</style>
