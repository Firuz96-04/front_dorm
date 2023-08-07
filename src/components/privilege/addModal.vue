<script setup>
import { usePrivilegeStore } from "@/store/privilege";
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
  description: ""
});
const privilegeStore = usePrivilegeStore();

const addPrivilege = () => {
    privilegeStore.addPrivilege({
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
    title="Добавить Привилегию"
    :onCancel="closeModal"
    :footer="null"
    width="400px"
  >
    <a-form :model="formState"
        class="my_form" 
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 15 }"
        @submit.prevent="addPrivilege"
    >
      <a-form-item label="Названия">
        <a-input
          v-model:value="formState.name"
          :maxlength="25"
          style="width: 250px"
        />
      </a-form-item>
      <a-form-item label="Названия">
        <a-textarea   
            v-model:value="formState.description"
            :maxlength="25"
            style="width: 300px" 
            placeholder="Basic usage" 
            :rows="4" />
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
