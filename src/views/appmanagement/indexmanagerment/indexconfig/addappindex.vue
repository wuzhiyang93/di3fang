<template>
  <edittemplate :queryTemplateSkus="queryAppIndexSkus"
                :queryTemplateCates="queryAppIndexCates"
                :queryTemplateThematic="queryAppIndexAppThematic"
                :queryTemplateSkuDetail="queryAppIndexSkuById"
                :queryTemplateThematicDetail="queryAppIndexThematicById"
                :queryTemplate="queryInitAppIndex"
                :addTemplate="addAppIndex"
                :initId="this.$route.query.initId"
                addFlag="0" from="1"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppIndexSkus,
    queryAppIndexCates,
    queryAppIndexAppThematic,
    queryAppIndexSkuById,
    queryAppIndexThematicById,
    queryInitAppIndex,
    addAppIndex
  } from '@/api/addappindex';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppIndexSkus: queryAppIndexSkus,
        queryAppIndexCates: queryAppIndexCates,
        queryAppIndexAppThematic: queryAppIndexAppThematic,
        queryAppIndexSkuById: queryAppIndexSkuById,
        queryAppIndexThematicById: queryAppIndexThematicById,
        queryInitAppIndex: queryInitAppIndex,
        addAppIndex: addAppIndex
      }
    }
  }
</script>
