<template>
  <editthematicforvisual :queryTemplateSkus="queryAllSkus"
                         :queryTemplateArticleList="queryArticleList"
                         :queryTemplateThematicList="queryThematicList"
                         :queryTemplateHelpList="queryHelpList"
                         :queryTemplateCategory="queryAllCategory"
                         :queryTemplateSkuById="querySkuById"
                         :queryTemplateArticleById="queryArticleById"
                         :queryTemplateThematicById="queryThematicById"
                         :queryTemplateHelpById="queryHelpById"
                         :queryTemplate="queryTemplate"
                         :queryCurrentTemplate="queryCurrentTemplate"
                         :id="this.$route.query.id"
                         :updateThematic="updateThematic"
                         addFlag="1"/>
</template>

<script>
  import editthematicforvisual from './editthematicforvisual'
  import {
    queryAllSkus,
    queryArticleList,
    queryThematicList,
    queryHelpList,
    queryAllCategory,
    querySkuById,
    queryArticleById,
    queryThematicById,
    queryHelpById,
    queryTemplate,
    queryCurrentTemplate,
    updateThematic
  } from '@/api/updatethematicforvisual';

  export default {
    components: {editthematicforvisual},
    data() {
      return {
        queryAllSkus: queryAllSkus,
        queryArticleList: queryArticleList,
        queryThematicList: queryThematicList,
        queryHelpList: queryHelpList,
        queryAllCategory: queryAllCategory,
        querySkuById: querySkuById,
        queryArticleById: queryArticleById,
        queryThematicById: queryThematicById,
        queryHelpById: queryHelpById,
        queryTemplate: queryTemplate,
        queryCurrentTemplate: queryCurrentTemplate,
        updateThematic: updateThematic
      }
    }
  }
</script>
