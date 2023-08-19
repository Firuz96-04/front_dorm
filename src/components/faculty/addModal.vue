<script setup>
import { defineProps, defineEmits, ref, reactive } from "vue";
import {useFacultyStore} from '@/store/faculty'


const facultyStore = useFacultyStore()

const props = defineProps({
  my_open: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits({
  close: null,
});

const formState = reactive({
    name: ''
})

const myClose = () =>  {
    emits("close");
    formState.name = ''
}

const addFaculty = () => {
    facultyStore.addFaculty({
        faculty: formState,
        cb: myClose
    })
}
</script>
<template>

  <a-modal
    :open="my_open"
    @update:open="my_open = $event"
    title="Добавить Факультет"
    :maskClosable="false"
    :footer="null"
    :onCancel="myClose"
    width="450px">
    <div style="margin-top: 15px">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit.prevent="addFaculty">
        <a-form-item label="Названия" name="name">
          <a-input v-model:value="formState.name" :maxlength="40" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 14 }">
          <a-button type="primary" html-type="submit">Добавить</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
