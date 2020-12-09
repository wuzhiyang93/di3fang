<template>
  <printordersbase :url="queryPrintStoreOrderDetails"/>
</template>

<script>
  import {
    queryPrintStoreOrderDetails
  } from '@/api/printstoreorders';

  import printordersbase from '../../../ordermanager/ordermanager/order/printordersbase'

  export default {
    components: {printordersbase},
    data() {
      return {
        queryPrintStoreOrderDetails: queryPrintStoreOrderDetails
      }
    },
  }
</script>
