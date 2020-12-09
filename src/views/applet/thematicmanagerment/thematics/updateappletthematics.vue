<template>
  <edittemplate :queryTemplateSkus="queryAppletThematicSkus"
                :queryTemplateCates="queryAppletThematicCates"
                :queryTemplateThematic="queryAppletThematicAppletThematic"
                :queryTemplateSkuDetail="queryAppletThematicSkuById"
                :queryTemplateThematicDetail="queryAppletThematciThematicById"
                :queryTemplate="queryAppletThematicDetailById"
                :updateTemplate="updateAppletThematic"
                :initId="this.$route.query.initId"
                addFlag="1" from="4"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppletThematicSkus,
    queryAppletThematicCates,
    queryAppletThematicAppletThematic,
    queryAppletThematicSkuById,
    queryAppletThematciThematicById,
    queryAppletThematicDetailById,
    updateAppletThematic
  } from '@/api/updateappletthematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppletThematicSkus: queryAppletThematicSkus,
        queryAppletThematicCates: queryAppletThematicCates,
        queryAppletThematicAppletThematic: queryAppletThematicAppletThematic,
        queryAppletThematicSkuById: queryAppletThematicSkuById,
        queryAppletThematciThematicById: queryAppletThematciThematicById,
        queryAppletThematicDetailById: queryAppletThematicDetailById,
        updateAppletThematic: updateAppletThematic
      }
    }
  }
</script>
