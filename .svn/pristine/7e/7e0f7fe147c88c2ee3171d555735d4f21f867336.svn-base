<template>
  <edittemplate :queryTemplateSkus="queryAppThematicSkus"
                :queryTemplateCates="queryAppThematicCates"
                :queryTemplateThematic="queryAppThematicAppThematic"
                :queryTemplateSkuDetail="queryAppThematicSkuById"
                :queryTemplateThematicDetail="queryAppThematciThematicById"
                :queryTemplate="queryAppThematicDetailById"
                :updateTemplate="updateAppThematic"
                :initId="this.$route.query.initId"
                addFlag="1" from="2"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppThematicSkus,
    queryAppThematicCates,
    queryAppThematicAppThematic,
    queryAppThematicSkuById,
    queryAppThematciThematicById,
    queryAppThematicDetailById,
    updateAppThematic
  } from '@/api/updateappthematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppThematicSkus: queryAppThematicSkus,
        queryAppThematicCates: queryAppThematicCates,
        queryAppThematicAppThematic: queryAppThematicAppThematic,
        queryAppThematicSkuById: queryAppThematicSkuById,
        queryAppThematciThematicById: queryAppThematciThematicById,
        queryAppThematicDetailById: queryAppThematicDetailById,
        updateAppThematic: updateAppThematic
      }
    }
  }
</script>
