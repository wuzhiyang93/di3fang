<template>
  <communitybuyorderlistbase :detailPath="detailPath" :queryUrl="queryCommunityBuyOrderList"
                             :exportAllUrl="exportAllCommunityBuyOrder"
                             :exportCheckedUrl="exportCheckedCommunityBuyOrder"/>
</template>

<script>
  import communitybuyorderlistbase from './communitybuyorderlistbase'
  import {
    queryCommunityBuyOrderList,
    exportAllCommunityBuyOrder,
    exportCheckedCommunityBuyOrder
  } from '@/api/communitybuyorderlist';

  export default {
    components: {communitybuyorderlistbase},
    data() {
      return {
        detailPath: '/marketingmanager/communitygroupbuy/communitybuyorderdetail',
        queryCommunityBuyOrderList: queryCommunityBuyOrderList,
        exportAllCommunityBuyOrder: exportAllCommunityBuyOrder,
        exportCheckedCommunityBuyOrder: exportCheckedCommunityBuyOrder
      }
    }
  }
</script>
