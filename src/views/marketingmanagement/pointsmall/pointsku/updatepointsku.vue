<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="140px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">积分商品名称</span>
        <el-input maxlength="64" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="积分商品副标题">
        <el-input maxlength="64" v-model="form.subTitle"/>
      </el-form-item>
      <el-form-item prop="code">
        <span slot="label">积分商品编号</span>
        <el-input maxlength="45" v-model="form.code"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">积分商品分类</span>
        <el-select v-model="form.cateId" filterable placeholder="请选择商品分类">
          <el-option
            v-for="item in pointcates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>积分商品图片</span>
        <el-upload
          ref="uploadImage"
          style="display: inline-block"
          :action="uploadApi"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :headers="headers"
          :file-list="updateImageList"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <el-tooltip effect="dark" content="建议图片尺寸800px * 800px" placement="right">
            <i class="el-icon-plus"></i>
          </el-tooltip>
        </el-upload>
        <el-dialog :visible.sync="imageDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item prop="point">
        <span slot="label">所需积分</span>
        <el-input style="width: 200px" maxlength="11" v-model="form.point"/>
      </el-form-item>
      <el-form-item prop="price">
        <span slot="label">参考价格</span>
        <el-input type="number" maxlength="20" v-model="form.price" style="width: 200px">
          <template slot="prepend">¥</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="stock">
        <span slot="label">库存</span>
        <el-input style="width: 200px" maxlength="11" v-model="form.stock"/>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch
          style="vertical-align: sub"
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="积分商品详情">
        <tinymce v-model="form.desc" :height="300"/>
      </el-form-item>
      <el-form-item label="移动端积分商品详情">
        <tinymce v-model="form.mobileDesc" :height="300"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePointSku">保存积分商品</el-button>
        <router-link to="/marketingmanager/pointsmall/pointsku">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import {getToken} from "@/utils/token";
  import {queryAllPointCatesForUpdate, queryPointSkuById, updatePointSku} from '@/api/updatepointsku';
  import {specstrValidator, digitsValidator, priceValidator} from '@/utils/validate';

  export default {
    components: {Tinymce},
    data() {
      return {
        updateImageList: [], // 商品图片列表
        dialogImageUrl: '', // 图片url
        uploadApi: process.env.UPLOAD_API,// 上传文件路由
        headers: { // 设置上传的请求头部
          Authorization: 'Bearer ' + getToken()
        },
        imageDialogVisible: false, // 是否展示放大图片
        isProcess: false, // 接口是否处理中
        pointcates: [], // 所有积分商城分类集合
        form: { // 修改form表单
          id: '', // 积分商品id
          name: '', // 名称
          subTitle: '', // 副标题
          code: '', // 编号
          cateId: '', // 分类id
          pics: '', // 图片地址
          point: '', // 所需积分
          price: '', // 参考价格
          stock: '', // 库存
          status: '1', // 是否发布 1 是 0 否
          desc: '', // 商品详情
          mobileDesc: '', // 移动端商品详情
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            }
          ],
          code: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
          cateId: [
            {
              required: true,
              message: '请选择所属分类',
              trigger: 'blur'
            }
          ],
          point: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
          price: [
            {
              required: true,
              trigger: 'blur',
              validator: priceValidator,
            }
          ],
          stock: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
        },
      }
    },
    created() {
      this.queryAllPointCatesForUpdate();
      this.queryPointSkuById(this.$route.query.id);
    },
    methods: {
      // 查询所有积分商城分类列表
      queryAllPointCatesForUpdate() {
        queryAllPointCatesForUpdate().then(res => {
          this.pointcates = res;
        });
      },
      // 根据id查询积分商品信息
      queryPointSkuById(id) {
        queryPointSkuById(id).then(res => {
          if (res.flag) {
            this.form = res.data;
            // 获取商品图片集合
            let imageArray = [];
            for (let i = 0; i < res.data.pics.split(',').length; i++) {
              let image = {};
              image.response = res.data.pics.split(',')[i];
              image.url = res.data.pics.split(',')[i];
              imageArray.push(image);
            }
            this.updateImageList = imageArray;
          }
        });
      },
      // 放大预览图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.imageDialogVisible = true
      },
      // 修改积分商品
      updatePointSku() {
        let imageList = [];
        for (let i = 0; i < this.$refs.uploadImage.uploadFiles.length; i++) {
          if (this.$refs.uploadImage.uploadFiles[i].status === 'success') {
            imageList.push(this.$refs.uploadImage.uploadFiles[i].response);
          }
        }
        if (imageList.length < 1) {
          this.$message({
            message: '请上传商品图片',
            type: 'warning'
          });
          return;
        }
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid && this.validateLength()) {
            this.form.pics = imageList.join(',').toString();
            this.isProcess = true;
            updatePointSku(this.form).then(res => {
              this.isProcess = false;
              if (res == -1) {
                this.$message({
                  message: '没有填写积分商品编号!',
                  type: 'error'
                })
              } else if (res == -2) {
                this.$message({
                  message: '积分商品编号已存在!',
                  type: 'error'
                })
              } else if (res == 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
                this.$router.push({path: '/marketingmanager/pointsmall/pointsku'})
              } else {
                this.$message({
                  message: '未知错误',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 验证积分商品详情长度
      validateLength() {
        if (this.form.desc.length > 65535 || this.form.mobileDesc.length > 65535) {
          this.$message({
            message: '积分商品详情不能超过65535',
            type: 'warning'
          });
          return false;
        }
        return true;
      },
    }
  }
</script>
