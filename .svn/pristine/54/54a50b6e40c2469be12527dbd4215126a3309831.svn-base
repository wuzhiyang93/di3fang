<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="preparereateFristCate">添加一级分类
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            :data="firstCate"
            ref="firstCate"
            v-loading="listLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
            @cell-click="firstClick"
          >
            <el-table-column label="分类名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == '0'" type="success">显示</el-tag>
                <el-tag v-if="scope.row.status == '1'" type="info">隐藏</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="openUpdateFristWind(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="deleteDialog(scope.row.id,1)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="preparereateSecondCate">添加二级分类
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            :data="secondCate"
            ref="secondCate"
            v-loading="listLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
            @cell-click="secondClick"
          >
            <el-table-column>
              <template label="分类名称" slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == '0'" type="success">显示</el-tag>
                <el-tag v-if="scope.row.status == '1'" type="info">隐藏</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="openUpdateSecondWind(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="deleteDialog(scope.row.id,2)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="preparereateThreeCate">添加三级分类
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            :data="threeCate"
            ref="threeCate"
            v-loading="listLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
          >
            <el-table-column label="分类名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == '0'" type="success">显示</el-tag>
                <el-tag v-if="scope.row.status == '1'" type="info">隐藏</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="openUpdateThreeWind(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="deleteDialog(scope.row.id,3)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>


    <el-dialog :title="editType == 1 ? '新增一级分类' : '编辑一级分类'" :visible.sync="addFirstCateVisible">
      <el-form label-position="right" :model="firstForm" :rules="firstCateRules" ref="firstForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">分类名称</span>
          <el-input v-model="firstForm.name"/>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">分类排序</span>
          <template>
            <el-input-number size="small" v-model="firstForm.sort" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            style="vertical-align: sub"
            v-model="firstIsUse"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFirstCateVisible = false">取消</el-button>
        <el-button type="primary" @click="editType == 1 ? createFirstData() : updateFristCate()">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="editType == 1 ? '新增二级分类' : '编辑二级分类'" :visible.sync="addSecondCateVisible">
      <el-form label-position="right" :model="secondForm" :rules="secondCateRules" ref="secondForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">分类名称</span>
          <el-input v-model="secondForm.name"/>
        </el-form-item>
        <el-form-item prop="parentId">
          <span slot="label">上级分类</span>
          <el-select v-model="secondForm.parentId" style="width: 50%" filterable placeholder="请选择分类">
            <el-option
              v-for="item in firstCate"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">分类排序</span>
          <template>
            <el-input-number size="small" v-model="secondForm.sort" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            style="vertical-align: sub"
            v-model="secondIsUse"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSecondCateVisible = false">取消</el-button>
        <el-button type="primary" @click="editType == 1 ? createSecondData() : updateSecondCate()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="editType == 1 ? '新增三级分类' : '编辑三级分类'" :visible.sync="addThirdCateVisible"
               :before-close="handleClose">
      <el-form label-position="right" :model="threeForm" :rules="threeCateRules" ref="threeForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">分类名称</span>
          <el-input v-model="threeForm.name"/>
        </el-form-item>
        <el-form-item prop="parentId">
          <span slot="label">上级分类</span>
          <el-select v-model="threeForm.parentId" style="width: 50%" filterable placeholder="请选择分类">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-tooltip effect="dark" content="建议图片尺寸120px * 120px" placement="right">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :headers="headers"
              name="image"
              accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
              <img v-if="threeForm.url" :src="threeForm.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="cateId">
          <span slot="label">选择类目</span>
          <el-tree
            v-model="threeForm.cateId"
            style="max-height: 300px; overflow: auto; padding: 10px 0; border: 1px solid #DCDFE6; border-radius: 4px"
            @check="checkCate"
            :props="props"
            :load="loadNode"
            ref="tree"
            :check-strictly="true"
            :default-expand-all="true"
            :default-checked-keys=defaultCheckedKeys
            lazy
            node-key="id"
            show-checkbox>
          </el-tree>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">分类排序</span>
          <template>
            <el-input-number size="small" v-model="threeForm.sort" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            style="vertical-align: sub"
            v-model="threeIsUse"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="editType == 1 ? createThirdData() : updateThreeCate() ">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    queryAllMobileCate,  //查询
    addMobileCate, //添加
    queryAllCategory, //查找所有boss分类
    delMobileCate,//删除分类
    updateMobileCate, //更新手机分类
    queryMobileCateByParentId,//根据父类查询分类
    queryMobileCateById,//根据ID查询手机分类
  } from '@/api/categoryconfig';


  import {
    isEmpty, //非空
    digitsValidator //非负整数
  } from '@/utils/validate'


  import {getToken} from '@/utils/token'

  export default {
    data() {
      return {
        defaultCheckedKeys: [], //默认选择的 boss 分类数组
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        editType: 1,//操作类型  1 添加 2 修改
        isProcess: false,//接口处理中
        addFirstCateVisible: false,//一级分类编辑窗口显示标记
        addSecondCateVisible: false,//二级分类编辑窗口显示标记
        addThirdCateVisible: false, //三级分类编辑窗口显示标记
        listLoading: false,  //数据加载中
        firstIsUse: true, //添加一级分类是否使用
        secondIsUse: true, //添加二级分类是否使用
        threeIsUse: true, //添加三级分类是否使用
        allCate: [],//分类总数组
        allBossCate: [],//boss 分类总数组
        firstCate: [],//一级分类
        secondCate: [],//二级分类
        threeCate: [],//三级分类
        firstId: null,//一级分类
        secondId: null,//二级分类
        cateData: [],  //分类数组
        checkedKey: '', //添加三级分类时的类目id
        //一级分类表单
        firstForm: {
          name: '',
          parentId: "0",
          grade: 1,
          sort: '',
          isUse: '0',
          delFlag: '0'
        },
        //二级分类表单
        secondForm: {
          name: '',
          parentId: '',
          grade: 2,
          sort: '',
          isUse: '0',
          delFlag: '0'
        },
        //三级分类表单
        threeForm: {
          name: '',
          parentId: '',
          cateId: '',
          sort: '',
          grade: 3,
          url: '',
          isUse: '0',
        },
        //一级分类校验
        firstCateRules: { //添加一级分类校验规则
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
          sort: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ]
        },
        //二级分类校验
        secondCateRules: { //添加二级分类校验规则
          name: [
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入序号',
              trigger: 'blur'
            }
          ],
          parentId: [
            {
              required: true,
              message: '请选择上级分类',
              trigger: 'blur'
            }
          ],
        },
        //三级分类校验
        threeCateRules: {
          name: [
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入序号',
              trigger: 'blur'
            }
          ],
          parentId: [
            {
              required: true,
              message: '请选择上级分类',
              trigger: 'blur'
            }
          ],
          cateId: [
            {
              required: true,
              message: '请选择类目',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.getList();  //加载分类
      this.queryAllCategory();  //记载 boss 分类
    },

    methods: {
      //选择boss分类
      checkCate(even, b) {
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setChecked(even.id, true, false)
        this.threeForm.cateId = even.id;
      },
      //三级分类编辑窗口关闭时执行
      handleClose() {
        this.$refs.tree.setCheckedKeys([]);
        this.addThirdCateVisible = false;
      },
      //加载 el-tree 数据
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve(this.cateData);
        }
        if (node.level == 1 || node.level == 2) {
          let second = new Array();
          for (let i = 0; i < this.allBossCate.length; i++) {
            if (this.allBossCate[i].parentId == node.data.id) {
              let s = {
                id: this.allBossCate[i].id,
                name: this.allBossCate[i].name,
              }
              second.push(s);
            }
          }
          return resolve(second);
        }
        if (node.level == 3) {
          return resolve([]);
        }
      },
      //查找所有boss分类
      queryAllCategory() {
        queryAllCategory().then((response) => {
          if (response != null) {
            this.allBossCate = response;
            for (let i = 0; i < response.length; i++) {
              if (response[i].grade == 1) {
                let f = {
                  id: response[i].id,
                  name: response[i].name,
                }
                this.cateData.push(f);
              }
            }
          }
        })
      },
      //加载一级分类
      getList() {
        queryAllMobileCate().then((response) => {
          this.allCate = response;
          for (let i = 0; i < response.length; i++) {
            if (response[i].parentId == 0) {
              let temp = {
                id: response[i].id,
                name: response[i].name,
                status: response[i].isUse,
                sort: response[i].sort,
              }
              this.firstCate.push(temp);
            }
          }
          if (this.firstCate.length > 0) {
            this.firstId = this.firstCate[0].id;
            this.$refs.firstCate.setCurrentRow(this.firstCate[0]);
            this.loadSecondCate(this.firstCate[0].id);
          }
        })
      },
      //加载二级分类
      loadSecondCate(parentId) {
        this.secondCate = [];
        queryMobileCateByParentId(parentId).then((response) => {
          for (let i = 0; i < response.length; i++) {
            let temp = {
              name: response[i].name,
              id: response[i].id,
              status: response[i].isUse,
              sort: response[i].sort,
              parentId: response[i].parentId
            }
            this.secondCate.push(temp);
          }
          if (this.secondCate.length > 0) {
            this.secondId = this.secondCate[0].id;
            this.$refs.secondCate.setCurrentRow(this.secondCate[0]);
            this.loadThreeCate(this.secondCate[0].id)
          } else {
            this.threeCate = [];
          }
        });
      },
      //加载三级分类
      loadThreeCate(parentId) {
        this.threeCate = [];
        queryMobileCateByParentId(parentId).then((response) => {
          for (let i = 0; i < response.length; i++) {
            let temp = {
              name: response[i].name,
              id: response[i].id,
              status: response[i].isUse,
              sort: response[i].sort,
              parentId: response[i].parentId
            }
            this.threeCate.push(temp);
          }
          this.$refs.threeCate.setCurrentRow(this.threeCate[0]);
        });
      },
      //一级分类点击事件
      firstClick(row, column, cell) {
        this.firstId = row.id;
        this.secondCate = [];
        this.threeCate = [];
        // 查出二级分类
        queryMobileCateByParentId(row.id).then((secondCate) => {
          this.secondCate = secondCate;
          // 查询三级分类
          if (secondCate && secondCate.length > 0) {
            // 选中二级分类的第一个
            this.$refs.secondCate.setCurrentRow(secondCate[0]);
            this.secondId = secondCate[0].id;
            queryMobileCateByParentId(secondCate[0].id).then((threeCate) => {
              this.threeCate = threeCate;
              if (threeCate && threeCate.length > 0) {
                // 选中三级级分类的第一个
                this.$refs.threeCate.setCurrentRow(threeCate[0]);
              }
            })
          }
        });
      },
      //二级分类点击事件
      secondClick(row, column, cell) {
        this.secondId = row.id;
        this.threeCate = [];
        // 查询三级分类
        queryMobileCateByParentId(row.id).then((threeCate) => {
          this.threeCate = threeCate;
          if (threeCate && threeCate.length > 0) {
            // 选中三级级分类的第一个
            this.$refs.threeCate.setCurrentRow(threeCate[0]);
          }
        })
      },
      //删除分类
      deleteDialog(id, grade) {
        this.$confirm('确定要删除此分类吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;

          delMobileCate(id).then((response) => {
            this.isProcess = false;
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              if (grade == 1) {
                this.firstCate = [];
                this.getList();
              } else if (grade == 2) {
                this.firstClick({id: this.firstId}, '', {cellIndex: 0});
              } else if (grade == 3) {
                this.secondClick({id: this.secondId}, '', {cellIndex: 0});

              }
            }
          })
        })
      },
      //准备编辑一级分类
      openUpdateFristWind(row) {
        this.editType = 2;
        queryMobileCateById(row.id).then((response) => {
          this.firstForm = {
            id: response.id,
            name: response.name,
            sort: response.sort,
            status: response.status,
            grade: 1,
          }
        });
        if (this.firstForm.status == 1) {
          this.firstIsUse = false;
        } else {
          this.firstIsUse = true;
        }
        if (this.$refs["firstForm"]) {
          this.$refs["firstForm"].resetFields();
        }
        this.addFirstCateVisible = true;
      },
      //准备编辑二级分类
      openUpdateSecondWind(row) {
        this.editType = 2;
        queryMobileCateById(row.id).then((response) => {
          this.secondForm = {
            id: response.id,
            name: response.name,
            sort: response.sort,
            status: response.status,
            parentId: response.parentId,
            grade: 2,
          }
        });
        if (this.secondForm.status == 1) {
          this.secondIsUse = false;
        } else {
          this.secondIsUse = true;
        }
        if (this.$refs["secondForm"]) {
          this.$refs["secondForm"].resetFields();
        }
        this.addSecondCateVisible = true;
      },
      //准备编辑三级分类
      openUpdateThreeWind(id) {
        this.editType = 2;
        queryMobileCateById(id).then((response) => {
          this.threeForm = {
            id: response.id,
            name: response.name,
            parentId: response.parentId,
            cateId: response.cateId,
            sort: response.sort,
            url: response.url,
            isUse: response.status,
            grade: 3,

          }
          this.defaultCheckedKeys = [];
          this.defaultCheckedKeys.push(this.threeForm.cateId);
        });
        if (this.$refs["threeForm"]) {
          this.$refs["threeForm"].resetFields();
        }
        if (this.threeForm.status == 1) {
          this.threeIsUse = false;
        } else {
          this.threeIsUse = true;
        }
        this.addThirdCateVisible = true;
      },
      //编辑三级分类
      updateThreeCate() {
        this.threeForm.isUse = this.threeIsUse == true ? '0' : '1';
        this.$refs['threeForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            updateMobileCate(this.threeForm).then((response) => {
              this.threeForm.name = '';
              this.threeForm.sort = '';
              this.threeForm.parentId = '';
              this.threeForm.cateId = '';
              this.isProcess = false;
              this.$refs.tree.setCheckedKeys([]);
              this.addThirdCateVisible = false;
              if (response > 0) {
                this.secondClick({id: this.secondId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '编辑三级分类成功!'
                });
              }
            })
          }
        })
      },
      //编辑二级分类
      updateSecondCate() {
        this.secondForm.isUse = this.secondIsUse == true ? '0' : '1';
        this.$refs['secondForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            updateMobileCate(this.secondForm).then((response) => {
              this.secondForm.name = '';
              this.secondForm.sort = '';
              this.secondForm.parentId = '';
              this.isProcess = false;
              this.addSecondCateVisible = false
              if (response > 0) {
                this.firstClick({id: this.firstId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '编辑二级分类成功!'
                });
              }
            })
          }
        })
      },
      //编辑一级分类
      updateFristCate() {
        this.firstForm.isUse = this.firstIsUse == true ? '0' : '1';
        this.$refs['firstForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            updateMobileCate(this.firstForm).then((response) => {
              this.isProcess = false;
              this.addFirstCateVisible = false
              if (response > 0) {
                this.firstCate = [];
                this.getList();
                this.$message({
                  type: 'success',
                  message: '编辑一级分类成功!'
                });
              }
            })
          }
        })
      },
      //准备添加一级分类
      preparereateFristCate() {
        this.editType = 1;
        this.firstForm = {
          name: '',
          parentId: "0",
          grade: "1",
          sort: '',
          isUse: '0',
          delFlag: '0'
        };
        if (this.$refs["firstForm"]) {
          this.$refs["firstForm"].resetFields();
        }
        this.firstIsUse = true;
        this.addFirstCateVisible = true;
      },
      //准备添加二级分类
      preparereateSecondCate() {
        this.editType = 1;
        this.secondForm = {
          name: '',
          parentId: this.firstId,
          grade: "2",
          sort: '',
          isUse: '0',
          delFlag: '0'
        }
        if (this.$refs["secondForm"]) {
          this.$refs["secondForm"].resetFields();
        }
        this.secondIsUse = true;
        this.addSecondCateVisible = true;
      },
      //准备添加三级分类
      preparereateThreeCate() {
        this.editType = 1;
        this.threeForm = {
          name: '',
          parentId: this.secondId,
          cateId: '',
          sort: '',
          grade: '3',
          url: '',
          isUse: '0',
        };
        if (this.$refs["threeForm"]) {
          this.$refs["threeForm"].resetFields();
        }
        this.defaultCheckedKeys = [];
        this.threeIsUse = true;
        this.addThirdCateVisible = true;
      },
      //添加一级分类
      createFirstData() {
        this.firstForm.isUse = this.firstIsUse == true ? '0' : '1';
        this.$refs['firstForm'].validate(valid => {
          if (valid) {

            if (this.isProcess) {
              return;
            }
            this.isProcess = true;

            addMobileCate(this.firstForm).then((response) => {
              this.firstForm.name = '';
              this.firstForm.sort = '';
              this.isProcess = false;
              this.addFirstCateVisible = false
              if (response > 0) {
                this.firstCate = [];
                this.getList();
                this.$message({
                  type: 'success',
                  message: '添加一级分类成功!'
                });
              }
            })
          }
        })
      },
      //添加二级分类
      createSecondData() {
        this.secondForm.isUse = this.secondIsUse == true ? '0' : '1';
        this.$refs['secondForm'].validate(valid => {
          if (valid) {
            this.addSecondCateVisible = false
            this.addCate(this.secondForm);
          }
        })
      },
      //添加三级分类
      createThirdData() {
        this.threeForm.isUse = this.threeIsUse == true ? '0' : '1';
        this.$refs['threeForm'].validate(valid => {
          if (valid) {
            this.$refs.tree.setCheckedKeys([]);
            this.addThirdCateVisible = false
            this.addCate(this.threeForm);
          }
        })
      },
      //添加分类
      addCate(cateForm) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        addMobileCate(cateForm).then((response) => {
          this.isProcess = false;
          this.addFirstCateVisible = false
          if (response > 0) {
            if (cateForm.grade == '1') {
              this.firstCate = [];
              this.getList();
            } else if (cateForm.grade == '2') {
              this.firstClick({id: this.firstId}, '', {cellIndex: 0});
            } else if (cateForm.grade == '3') {
              this.secondClick({id: this.secondId}, '', {cellIndex: 0});
            }
            this.$message({
              type: 'success',
              message: cateForm.grade == '1' ? '添加一级分类成功' : cateForm.grade == '2' ? '添加二级分类成功' : '添加三级分类成功',
            });
          }
        })
      },
      //上传图片
      uploadSuccess(res) {
        this.threeForm.url = res;
      },
    }
  }
</script>
