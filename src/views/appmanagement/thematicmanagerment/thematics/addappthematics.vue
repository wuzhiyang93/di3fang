<template>
  <edittemplate :queryTemplateSkus="queryAppThematicSkus"
                :queryTemplateCates="queryAppThematicCates"
                :queryTemplateThematic="queryAppThematicAppThematic"
                :queryTemplateSkuDetail="queryAppThematicSkuById"
                :queryTemplateThematicDetail="queryAppThematciThematicById"
                :queryTemplate="queryInitAppThematic"
                :addTemplate="addAppThematic"
                :initId="this.$route.query.initId"
                addFlag="0" from="2"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppThematicSkus,
    queryAppThematicCates,
    queryAppThematicAppThematic,
    queryAppThematicSkuById,
    queryAppThematciThematicById,
    queryInitAppThematic,
    addAppThematic
  } from '@/api/addappthematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppThematicSkus: queryAppThematicSkus,
        queryAppThematicCates: queryAppThematicCates,
        queryAppThematicAppThematic: queryAppThematicAppThematic,
        queryAppThematicSkuById: queryAppThematicSkuById,
        queryAppThematciThematicById: queryAppThematciThematicById,
        queryInitAppThematic: queryInitAppThematic,
        addAppThematic: addAppThematic
      }
    }
  }
</script>
