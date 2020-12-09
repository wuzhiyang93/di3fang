<template>
123
  <edittemplate :queryTemplateSkus="queryMobileIndexSkus"
                :queryTemplateCates="queryMobileIndexCates"
                :queryTemplateThematic="queryMobileIndexMobileThematic"
                :queryTemplateSkuDetail="queryMobileIndexSkuById"
                :queryTemplateThematicDetail="queryMobileIndexThematicById"
                :queryTemplate="queryMobileTemplateById"
                :updateTemplate="updateMobileIndexTemplate"
                :initId="this.$route.query.initId"
                addFlag="1" from="5"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryMobileIndexSkus,
    queryMobileIndexCates,
    queryMobileIndexMobileThematic,
    queryMobileIndexSkuById,
    queryMobileIndexThematicById,
    queryMobileTemplateById,
    updateMobileIndexTemplate
  } from '@/api/updatemobileindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryMobileIndexSkus: queryMobileIndexSkus,
        queryMobileIndexCates: queryMobileIndexCates,
        queryMobileIndexMobileThematic: queryMobileIndexMobileThematic,
        queryMobileIndexSkuById: queryMobileIndexSkuById,
        queryMobileIndexThematicById: queryMobileIndexThematicById,
        queryMobileTemplateById: queryMobileTemplateById,
        updateMobileIndexTemplate: updateMobileIndexTemplate
      }
    }
  }
</script>
