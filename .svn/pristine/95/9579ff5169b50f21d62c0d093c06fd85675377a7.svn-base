<template>
  <edittemplate :queryTemplateSkus="queryAppIndexSkus"
                :queryTemplateCates="queryAppIndexCates"
                :queryTemplateThematic="queryAppIndexAppThematic"
                :queryTemplateSkuDetail="queryAppIndexSkuById"
                :queryTemplateThematicDetail="queryAppIndexThematicById"
                :queryTemplate="queryAppTemplateById"
                :updateTemplate="updateAppIndexTemplate"
                :initId="this.$route.query.initId"
                addFlag="1" from="1"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppIndexSkus,
    queryAppIndexCates,
    queryAppIndexAppThematic,
    queryAppIndexSkuById,
    queryAppIndexThematicById,
    queryAppTemplateById,
    updateAppIndexTemplate
  } from '@/api/updateappindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppIndexSkus: queryAppIndexSkus,
        queryAppIndexCates: queryAppIndexCates,
        queryAppIndexAppThematic: queryAppIndexAppThematic,
        queryAppIndexSkuById: queryAppIndexSkuById,
        queryAppIndexThematicById: queryAppIndexThematicById,
        queryAppTemplateById: queryAppTemplateById,
        updateAppIndexTemplate: updateAppIndexTemplate
      }
    }
  }
</script>
