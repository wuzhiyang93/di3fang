<template>
  <edittemplate :queryTemplateSkus="queryAppletIndexSkus"
                :queryTemplateCates="queryAppletIndexCates"
                :queryTemplateThematic="queryAppletIndexThematic"
                :queryTemplateSkuDetail="queryAppletIndexSkuById"
                :queryTemplateThematicDetail="queryAppletIndexThematicById"
                :queryTemplate="queryInitAppletIndex"
                :addTemplate="addAppletIndex"
                :initId="this.$route.query.initId"
                addFlag="0" from="3"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppletIndexSkus,
    queryAppletIndexCates,
    queryAppletIndexThematic,
    queryAppletIndexSkuById,
    queryAppletIndexThematicById,
    queryInitAppletIndex,
    addAppletIndex
  } from '@/api/addappletindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppletIndexSkus: queryAppletIndexSkus,
        queryAppletIndexCates: queryAppletIndexCates,
        queryAppletIndexThematic: queryAppletIndexThematic,
        queryAppletIndexSkuById: queryAppletIndexSkuById,
        queryAppletIndexThematicById: queryAppletIndexThematicById,
        queryInitAppletIndex: queryInitAppletIndex,
        addAppletIndex: addAppletIndex
      }
    }
  }
</script>
