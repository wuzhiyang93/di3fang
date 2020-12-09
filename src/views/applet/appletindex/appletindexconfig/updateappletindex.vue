<template>
  <edittemplate :queryTemplateSkus="queryAppletIndexSkus"
                :queryTemplateCates="queryAppletIndexCates"
                :queryTemplateThematic="queryAppletIndexThematic"
                :queryTemplateSkuDetail="queryAppletIndexSkuById"
                :queryTemplateThematicDetail="queryAppletIndexThematicById"
                :queryTemplate="queryAppletTemplateById"
                :updateTemplate="updateAppletIndexTemplate"
                :initId="this.$route.query.initId"
                addFlag="1" from="3"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppletIndexSkus,
    queryAppletIndexCates,
    queryAppletIndexThematic,
    queryAppletIndexSkuById,
    queryAppletIndexThematicById,
    queryAppletTemplateById,
    updateAppletIndexTemplate
  } from '@/api/updateappletindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppletIndexSkus: queryAppletIndexSkus,
        queryAppletIndexCates: queryAppletIndexCates,
        queryAppletIndexThematic: queryAppletIndexThematic,
        queryAppletIndexSkuById: queryAppletIndexSkuById,
        queryAppletIndexThematicById: queryAppletIndexThematicById,
        queryAppletTemplateById: queryAppletTemplateById,
        updateAppletIndexTemplate: updateAppletIndexTemplate
      }
    }
  }
</script>
