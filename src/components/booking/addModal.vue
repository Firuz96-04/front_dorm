<script setup>

</script>

<template>
  <div style="margin-top: 25px;">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off">

    </a-form>
    <a-form-item
      label="Username"
      name="username"
    >
      <a-input />
    </a-form-item>

    <a-select
    v-model:value="value"
    show-search
    placeholder="input search text"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    @search="handleSearch"
    @change="handleChange"
  ></a-select>


    <a-form-item name="date-picker" label="DatePicker" v-bind="config">
      <a-date-picker  value-format="YYYY-MM-DD" />
    </a-form-item>
  </div>
</template>

