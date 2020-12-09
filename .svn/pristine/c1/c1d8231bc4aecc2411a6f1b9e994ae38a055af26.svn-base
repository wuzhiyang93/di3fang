<template>
  <edittemplate :queryTemplateSkus="queryAppletThematicSkus"
                :queryTemplateCates="queryAppletThematicCates"
                :queryTemplateThematic="queryAppletThematicAppletThematic"
                :queryTemplateSkuDetail="queryAppletThematicSkuById"
                :queryTemplateThematicDetail="queryAppletThematciThematicById"
                :queryTemplate="queryInitAppletThematic"
                :addTemplate="addAppletThematic"
                :initId="this.$route.query.initId"
                addFlag="0" from="4"/>
</template>

<script>
  import edittemplate from '../../../template/edittemplate'
  import {
    queryAppletThematicSkus,
    queryAppletThematicCates,
    queryAppletThematicAppletThematic,
    queryAppletThematicSkuById,
    queryAppletThematciThematicById,
    queryInitAppletThematic,
    addAppletThematic
  } from '@/api/addappletthematics';

  export default {
    components: {edittemplate},
    data() {
      return {
        queryAppletThematicSkus: queryAppletThematicSkus,
        queryAppletThematicCates: queryAppletThematicCates,
        queryAppletThematicAppletThematic: queryAppletThematicAppletThematic,
        queryAppletThematicSkuById: queryAppletThematicSkuById,
        queryAppletThematciThematicById: queryAppletThematciThematicById,
        queryInitAppletThematic: queryInitAppletThematic,
        addAppletThematic: addAppletThematic
      }
    }
  }
</script>
