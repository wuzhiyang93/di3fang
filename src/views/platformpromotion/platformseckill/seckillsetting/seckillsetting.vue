<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="toTabPage">
      <el-tab-pane label="秒杀活动设置" name="0"></el-tab-pane>
      <el-tab-pane label="秒杀活动图片" name="1"></el-tab-pane>
      <el-tab-pane label="秒杀活动列表" name="2"></el-tab-pane>
    </el-tabs>

    <el-alert title="操作说明：" type="warning" :closable="false">
      <p>1. 每日开展多场秒杀多活动，场次由平台进行设置，以整点为场次开始时间，每日最多设置12场</p>
      <p>2. 商家可自由选择参加场次</p>
      <p>3. 每场秒杀活动固定1小时结</p>
    </el-alert>

    <el-form label-position="right" label-width="100px" style="margin-top: 20px">
      <el-form-item label="秒杀时间">
        <el-date-picker
          v-model="timeValue"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          :picker-options="pickerOptions1"
          @change="querySeckillScenes"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="场次设置">
        <div class="timeContent">
          <a v-for="time in times" :class="{cur:time.selected}" href="javascript:;" @click="changeScene(time)">{{time.showValue}}</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">保存秒杀活动</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {
    formatDate  //时间格式化
  } from '@/utils/index';

  import {
    querySeckillScenes,
    updateSeckillScene
  } from '@/api/seckillsetting';


  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        times: [
          {value: 0, showValue: '00:00', selected: false, id: 0, skuNum: 0},
          {value: 1, showValue: '01:00', selected: false, id: 0, skuNum: 0},
          {value: 2, showValue: '02:00', selected: false, id: 0, skuNum: 0},
          {value: 3, showValue: '03:00', selected: false, id: 0, skuNum: 0},
          {value: 4, showValue: '04:00', selected: false, id: 0, skuNum: 0},
          {value: 5, showValue: '05:00', selected: false, id: 0, skuNum: 0},
          {value: 6, showValue: '06:00', selected: false, id: 0, skuNum: 0},
          {value: 7, showValue: '07:00', selected: false, id: 0, skuNum: 0},
          {value: 8, showValue: '08:00', selected: false, id: 0, skuNum: 0},
          {value: 9, showValue: '09:00', selected: false, id: 0, skuNum: 0},
          {value: 10, showValue: '10:00', selected: false, id: 0, skuNum: 0},
          {value: 11, showValue: '11:00', selected: false, id: 0, skuNum: 0},
          {value: 12, showValue: '12:00', selected: false, id: 0, skuNum: 0},
          {value: 13, showValue: '13:00', selected: false, id: 0, skuNum: 0},
          {value: 14, showValue: '14:00', selected: false, id: 0, skuNum: 0},
          {value: 15, showValue: '15:00', selected: false, id: 0, skuNum: 0},
          {value: 16, showValue: '16:00', selected: false, id: 0, skuNum: 0},
          {value: 17, showValue: '17:00', selected: false, id: 0, skuNum: 0},
          {value: 18, showValue: '18:00', selected: false, id: 0, skuNum: 0},
          {value: 19, showValue: '19:00', selected: false, id: 0, skuNum: 0},
          {value: 20, showValue: '20:00', selected: false, id: 0, skuNum: 0},
          {value: 21, showValue: '21:00', selected: false, id: 0, skuNum: 0},
          {value: 22, showValue: '22:00', selected: false, id: 0, skuNum: 0},
          {value: 23, showValue: '23:00', selected: false, id: 0, skuNum: 0},
        ],// 前端场次
        seckillScenes: [],//后端查出来的秒杀场次
        activeName: '0',
        isProcess: false, // 接口是否处理中
        timeValue: formatDate(new Date(), 'yyyy-MM-dd 00:00:00')
      }
    },
    created() {
      this.querySeckillScenes()
    },
    methods: {
      // 查询秒杀场次
      querySeckillScenes() {
        querySeckillScenes(this.timeValue).then(res => {
          this.seckillScenes = res;
          this.setTimes();
        })
      },
      // 设置前端的场次
      setTimes() {
        this.times = [
          {value: 0, showValue: '00:00', selected: false, id: 0, skuNum: 0},
          {value: 1, showValue: '01:00', selected: false, id: 0, skuNum: 0},
          {value: 2, showValue: '02:00', selected: false, id: 0, skuNum: 0},
          {value: 3, showValue: '03:00', selected: false, id: 0, skuNum: 0},
          {value: 4, showValue: '04:00', selected: false, id: 0, skuNum: 0},
          {value: 5, showValue: '05:00', selected: false, id: 0, skuNum: 0},
          {value: 6, showValue: '06:00', selected: false, id: 0, skuNum: 0},
          {value: 7, showValue: '07:00', selected: false, id: 0, skuNum: 0},
          {value: 8, showValue: '08:00', selected: false, id: 0, skuNum: 0},
          {value: 9, showValue: '09:00', selected: false, id: 0, skuNum: 0},
          {value: 10, showValue: '10:00', selected: false, id: 0, skuNum: 0},
          {value: 11, showValue: '11:00', selected: false, id: 0, skuNum: 0},
          {value: 12, showValue: '12:00', selected: false, id: 0, skuNum: 0},
          {value: 13, showValue: '13:00', selected: false, id: 0, skuNum: 0},
          {value: 14, showValue: '14:00', selected: false, id: 0, skuNum: 0},
          {value: 15, showValue: '15:00', selected: false, id: 0, skuNum: 0},
          {value: 16, showValue: '16:00', selected: false, id: 0, skuNum: 0},
          {value: 17, showValue: '17:00', selected: false, id: 0, skuNum: 0},
          {value: 18, showValue: '18:00', selected: false, id: 0, skuNum: 0},
          {value: 19, showValue: '19:00', selected: false, id: 0, skuNum: 0},
          {value: 20, showValue: '20:00', selected: false, id: 0, skuNum: 0},
          {value: 21, showValue: '21:00', selected: false, id: 0, skuNum: 0},
          {value: 22, showValue: '22:00', selected: false, id: 0, skuNum: 0},
          {value: 23, showValue: '23:00', selected: false, id: 0, skuNum: 0},
        ]

        if (this.seckillScenes.length > 0) {
          this.seckillScenes.forEach(seckillScene => {
            const selectedTime = this.times.filter(time => time.value == seckillScene.scene)
            if (selectedTime && selectedTime.length > 0) {
              selectedTime[0].selected = true;
              selectedTime[0].id = seckillScene.id;
              selectedTime[0].skuNum = seckillScene.skuNum
            }
          })
        }
      },
      // 改变场次的选中状态
      changeScene(time) {

        // 比当前时间段小的不给编辑
        if (parseInt(new Date().getHours()) >= parseInt(time.value) && formatDate(new Date(), 'yyyy-MM-dd 00:00:00') == this.timeValue) {
          return;
        }

        if (time.skuNum != 0 && time.selected) {
          this.$confirm('该场次已有商家参与，若关闭则商家对应的秒杀活动将失效，请谨慎操作！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            time.selected = !time.selected;
            if (time.selected) {
              const seleteds = this.times.filter(x => x.selected)
              if (seleteds.length > 12) {
                time.selected = false;
                this.$message({
                  type: 'error',
                  message: '每日最多设置12场!'
                })
              }
            }
          })
        } else {
          time.selected = !time.selected;
          if (time.selected) {
            const seleteds = this.times.filter(x => x.selected)
            if (seleteds.length > 12) {
              time.selected = false;
              this.$message({
                type: 'error',
                message: '每日最多设置12场!'
              })
            }
          }
        }
      },
      toTabPage() {
        if (this.activeName === '1') {
          this.$router.push({path: '/platformpromotion/platformseckill/panicbuypic'})
        }
        if (this.activeName === '2') {
          this.$router.push({path: '/platformpromotion/platformseckill/seckills'})
        }
      },
      updateData() {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        updateSeckillScene(this.getUpdateDate(), this.timeValue).then((res) => {
          this.isProcess = false;
          this.querySeckillScenes();
          if (res == 1) {
            this.$message({
              type: 'success',
              message: '秒杀设置成功!'
            })
          } else if (res == -1) {
            this.$message({
              type: 'error',
              message: '每日最多设置12场!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '系统错误请重试!'
            })
          }
        })
      },
      // 获得更新的数据
      getUpdateDate() {
        const seckillScenes = new Array();
        const selecteds = this.times.filter(time => time.selected);
        if (selecteds && selecteds.length > 0) {
          selecteds.forEach(selected => {
            seckillScenes.push({id: selected.id, scene: selected.value, seckillTime: this.timeValue})
          })
        }
        return seckillScenes;
      }
    }
  }
</script>
