<template>
  <communitybuyorderbase :url="queryCommunityOrderById"/>
</template>

<script>
  import communitybuyorderbase from '../communitybuyorder/communitybuyorderbase'
  import {
    queryCommunityOrderById
  } from '@/api/communitybuyorderdetail';

  export default {
    components: {communitybuyorderbase},
    data() {
      return {
        queryCommunityOrderById: queryCommunityOrderById
      }
    }
  }
</script>
