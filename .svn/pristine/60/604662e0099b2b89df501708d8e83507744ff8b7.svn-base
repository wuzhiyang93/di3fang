<template>
  <edittemplate :queryTemplateSkus="queryMobileThematicSkus"
                :queryTemplateCates="queryMobileThematicCates"
                :queryTemplateThematic="queryMobileThematicMobileThematic"
                :queryTemplateSkuDetail="queryMobileThematicSkuById"
                :queryTemplateThematicDetail="queryMobileThematciThematicById"
                :queryTemplate="queryInitMobileThematic"
                :addTemplate="addMobileThematic"
                :initId="this.$route.query.initId"
                addFlag="0" from="6"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryMobileThematicSkus,
    queryMobileThematicCates,
    queryMobileThematicMobileThematic,
    queryMobileThematicSkuById,
    queryMobileThematciThematicById,
    queryInitMobileThematic,
    addMobileThematic
  } from '@/api/addmobilethematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryMobileThematicSkus: queryMobileThematicSkus,
        queryMobileThematicCates: queryMobileThematicCates,
        queryMobileThematicMobileThematic: queryMobileThematicMobileThematic,
        queryMobileThematicSkuById: queryMobileThematicSkuById,
        queryMobileThematciThematicById: queryMobileThematciThematicById,
        queryInitMobileThematic: queryInitMobileThematic,
        addMobileThematic: addMobileThematic
      }
    }
  }
</script>
