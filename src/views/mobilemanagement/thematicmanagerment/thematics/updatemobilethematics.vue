<template>
  <edittemplate :queryTemplateSkus="queryMobileThematicSkus"
                :queryTemplateCates="queryMobileThematicCates"
                :queryTemplateThematic="queryMobileThematicMobileThematic"
                :queryTemplateSkuDetail="queryMobileThematicSkuById"
                :queryTemplateThematicDetail="queryMobileThematciThematicById"
                :queryTemplate="queryMobileThematicDetailById"
                :updateTemplate="updateMobileThematic"
                :initId="this.$route.query.initId"
                addFlag="1" from="6"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryMobileThematicSkus,
    queryMobileThematicCates,
    queryMobileThematicMobileThematic,
    queryMobileThematicSkuById,
    queryMobileThematciThematicById,
    queryMobileThematicDetailById,
    updateMobileThematic
  } from '@/api/updatemobilethematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryMobileThematicSkus: queryMobileThematicSkus,
        queryMobileThematicCates: queryMobileThematicCates,
        queryMobileThematicMobileThematic: queryMobileThematicMobileThematic,
        queryMobileThematicSkuById: queryMobileThematicSkuById,
        queryMobileThematciThematicById: queryMobileThematciThematicById,
        queryMobileThematicDetailById: queryMobileThematicDetailById,
        updateMobileThematic: updateMobileThematic
      }
    }
  }
</script>
