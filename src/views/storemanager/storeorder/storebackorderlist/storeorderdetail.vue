<template>
  <orderdetailbase :url="queryOrderById"/>
</template>

<script>
  import orderdetailbase from '../../../ordermanager/ordermanager/order/orderdetailbase'
  import {
    queryOrderById
  } from '@/api/storebackorderlist';

  export default {
    components: {orderdetailbase},
    data() {
      return {
        queryOrderById: queryOrderById
      }
    }
  }
</script>
