<script setup>
import {useCountryStore} from '@/store/country'
import { reactive, ref, defineEmits} from 'vue';

const emits = defineEmits({
    close: null
})

const country = reactive({
    name: ''
})
const countryStore = useCountryStore()

const addCountry = () => {
    countryStore.addCountry({
        data: country,
        cb: closeModal
    })
    // console.log(country);
}
const closeModal = () => {
    emits('close')
    console.log('modalka');
}
</script>

<template>
<div>
    <a-form
    :model="country"
    @submit.prevent="addCountry"
    class="my_form">
    <a-form-item label="Страна">
      <a-input v-model:value="country.name" :maxlength="25" style="width: 250px;"/>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  </div>    
</template>

<style scoped>
.my_form {
    margin-top: 40px;
}
</style>