<template>
    <a-table :columns="columns" :data-source="data"
        bordered :pagination="false"  :scroll="{ x: 900, y: table_size }" size="small"
        class="my_table"
        >
        {{ table_size }}
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <div :style="{background:'#dde', textAlign:'center'}">{{ column.name }}</div>  
        </template>
       
      </template>
      
      <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
          <span>{{ text }}</span>
      </template>

      <template v-if="column.dataIndex === 'tags'">
        <span>{{ text.name }}</span>111
      </template>

     </template>
    <template #title class="ant-table-title">
        <div class="main_title">1</div>
    </template>
    <template #footer>Footer</template>
        </a-table>
  </template>
  <script>
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import {usePrincipalStore} from '@/store/principal'
  const columns = [{
    name: 'Имя',
    title:'Имя',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
   {
    title: 'Фамилия',
    dataIndex: 'last_name',
    key: 'last_name',
    width: 200,
  },
    {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    width: 400,
  },
  {
    title: 'Action',
    key: 'action',
    width: 200,
  }];
  const data = [
    {
    id: 1,
    name: 'John',
    last_name: 'Brown',
    phone: '',
    address: 'New York No. 1 Lake Park',
}, 

];
  export default defineComponent({
    components: {
      SmileOutlined,
      DownOutlined,
    },
    setup() {
    const  table_size = ref(600)

    const principal = usePrincipalStore()

    principal.setAllPrincipal()
        return {
        data,
        columns,
        table_size
      };
    },
  }
  
  );
  </script>

<style>
.ant-table-title {
    padding: 0 !important;
    border: none !important;
    border-radius: inherit !important
    
    
}
.ant-table-row{
  cursor: pointer;
}
.main_title {
    display: block;
    background: rgb(238, 170, 188);
    /* margin: 0 auto; */
    padding: 5px;
}

.my_table{
  background-color: #bbc;
}
</style>