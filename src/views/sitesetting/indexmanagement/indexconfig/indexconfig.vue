<template>
  <div class="app-container">
    <div v-for="i in templates" class="template_box clearfix">
      <img :src="templateImage.filter(x=>x.value)[0].imgUrl" width="100%">
      <p style="margin-top:10px; color: #666">{{i.name}}</p>
      <div style="display: flex; justify-content: space-between">
        <el-button type="success" size="medium" icon="el-icon-edit-outline" @click="toEditTemplate(i.id)">模板编辑
        </el-button>
        <el-button v-if="i.isUse=='0'" type="primary" size="medium" icon="el-icon-finished"
                   @click="useTemplate(i.id)">使用此模板
        </el-button>
        <el-button v-if="i.isUse=='1'" type="primary" size="medium" icon="el-icon-finished" plain
                   disabled>当前模板
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    queryAllTemplate,
    setUseTemplate
  } from '@/api/indexconfig';

  export default {
    data() {
      return {
        templateImage: [
          {
            value: '1',
            imgUrl: require('@/assets/img/template1_image.jpg'),
          },
          {
            value: '2',
            imgUrl: require('@/assets/img/template2_image.jpg')
          },
          {
            value: '3',
            imgUrl: require('@/assets/img/template3_image.jpg')
          }
        ],
        templates: [],// 模版
      }
    },
    created() {
      this.queryAllTemplate()
    },
    methods: {
      //  查询所有模版
      queryAllTemplate() {
        queryAllTemplate().then(res => {
          this.templates = res;
        })
      },
      useTemplate(id) {
        this.$confirm('确定使用此模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setUseTemplate(id).then(() => {
            this.queryAllTemplate();
            this.$message({
              type: 'success',
              message: '设置模板成功!'
            })
          })
        })
      },
      toEditTemplate(id) {
        if (id == 1) {
          let routeData = this.$router.resolve({
            name: 'templateone',
          })
          window.open(routeData.href, '_blank')
        } else if (id == 2) {

        } else if (id == 3) {
        }
      }
    }
  }
</script>
