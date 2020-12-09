<template>
  <edittemplate :queryTemplateSkus="queryMobileIndexSkus"
                :queryTemplateCates="queryMobileIndexCates"
                :queryTemplateThematic="queryMobileIndexMobileThematic"
                :queryTemplateSkuDetail="queryMobileIndexSkuById"
                :queryTemplateThematicDetail="queryMobileIndexThematicById"
                :queryTemplate="queryInitMobileIndex"
                :addTemplate="addMobileIndex"
                :initId="this.$route.query.initId"
                addFlag="0" from="5"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryMobileIndexSkus,
    queryMobileIndexCates,
    queryMobileIndexMobileThematic,
    queryMobileIndexSkuById,
    queryMobileIndexThematicById,
    queryInitMobileIndex,
    addMobileIndex
  } from '@/api/addmobileindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryMobileIndexSkus: queryMobileIndexSkus,
        queryMobileIndexCates: queryMobileIndexCates,
        queryMobileIndexMobileThematic: queryMobileIndexMobileThematic,
        queryMobileIndexSkuById: queryMobileIndexSkuById,
        queryMobileIndexThematicById: queryMobileIndexThematicById,
        queryInitMobileIndex: queryInitMobileIndex,
        addMobileIndex: addMobileIndex
      }
    }
  }
</script>
