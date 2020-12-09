<template>
  <communitybuyorderlistbase :detailPath="detailPath" :mobile="this.$route.query.mobile"
                             :queryUrl="queryCommunityBuyOrderList"
                             :exportAllUrl="exportAllCommunityBuyOrder"
                             :exportCheckedUrl="exportCheckedCommunityBuyOrder"/>
</template>

<script>
  import communitybuyorderlistbase from '../communitybuyorder/communitybuyorderlistbase'
  import {
    queryCommunityBuyOrderList,
    exportAllCommunityBuyOrder,
    exportCheckedCommunityBuyOrder
  } from '@/api/communitybuyorderlistforhead';

  export default {
    components: {communitybuyorderlistbase},
    data() {
      return {
        detailPath: '/marketingmanager/communitygroupbuy/communitybuyorderdetailforhead',
        queryCommunityBuyOrderList: queryCommunityBuyOrderList,
        exportAllCommunityBuyOrder: exportAllCommunityBuyOrder,
        exportCheckedCommunityBuyOrder: exportCheckedCommunityBuyOrder
      }
    }
  }
</script>
