<template>
  <div class="app-container">
    <el-form :model="signset" :rules="rules" ref="form" label-position="right" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="title">
        <span slot="label">活动标题</span>
        <el-input maxlength="32" v-model="signset.title" style="width: 200px"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>设置连续签到</span>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus"
                   @click="addRow(signset.ruleInfos)">
          添加一级
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="signset.ruleInfos"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          style="line-height: 20px"
        >
          <el-table-column label="连续签到天数">
            <template slot-scope="scope">
              <el-input-number :step-strictly="true" v-model="scope.row.day" size="small" controls-position="right"
                               :min="1"
                               :max="999"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="送积分数">
            <template slot-scope="scope">
              <el-input-number :step-strictly="true" v-model="scope.row.point" size="small" controls-position="right"
                               :min="0"
                               :max="99999999"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-if="scope.$index!=0" size="mini" type="danger"
                         @click.native.prevent="deleteRow(scope.$index, signset.ruleInfos)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch
          style="vertical-align: sub"
          v-model="signset.status"
          active-value="0"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSignset()">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {queryqueryPointSignRule, updatePointSignRule} from '@/api/signset';

  export default {
    data() {
      return {
        isProcess: false,// 接口处理中
        listLoading: false,
        signset: {},
        rules: {
          title: [
            {
              required: true,
              message: '请输入活动标题',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
      }
    },
    created() {
      this.querySignSet()
    },
    methods: {
      querySignSet() {
        this.listLoading = true;
        queryqueryPointSignRule().then(res => {
          this.listLoading = false;
          this.signset = res.data;
        })
      },
      // 删除签到规则
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      // 添加签到规则
      addRow(signInData) {
        signInData.push({day: '', point: ''})
      },
      // 更新签到
      updateSignset() {
        this.$refs['form'].validate(valid => {

          if (!this.validateDay()) {
            this.$message({
              message: '签到的天数不能重复',
              type: 'error'
            })
            return;
          }

          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.signset.rule = JSON.stringify(this.signset.ruleInfos);
            updatePointSignRule(this.signset).then(() => {
              this.isProcess = false;
              this.querySignSet();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      },
      // 校验天数是否重复
      validateDay() {
        let allDays = new Array();

        for (let i = 0; i < this.signset.ruleInfos.length; i++) {
          if (allDays.indexOf(this.signset.ruleInfos[i].day) > -1) {
            return false;
          } else {
            allDays.push(this.signset.ruleInfos[i].day);
          }
        }

        return true;
      }
    }
  }
</script>
