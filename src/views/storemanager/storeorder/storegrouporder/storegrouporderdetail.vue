<template>
  <orderdetailbase :url="queryOrderById"/>
</template>

<script>
  import orderdetailbase from '../../../ordermanager/ordermanager/order/orderdetailbase'
  import {
    queryGroupOrderById
  } from '@/api/storegrouporderdetail';

  export default {
    components: {orderdetailbase},
    data() {
      return {
        queryOrderById: queryGroupOrderById
      }
    }
  }
</script>
