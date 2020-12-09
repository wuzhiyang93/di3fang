<template>
  <orderdetailbase :url="queryOrderById"/>
</template>

<script>
  import orderdetailbase from '../order/orderdetailbase'
  import {
    queryGroupOrderById
  } from '@/api/nopayorderdetail';

  export default {
    components: {orderdetailbase},
    data() {
      return {
        queryOrderById: queryGroupOrderById
      }
    }
  }
</script>
