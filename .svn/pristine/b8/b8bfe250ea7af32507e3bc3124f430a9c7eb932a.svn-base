<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="toAddProvince">添加省份
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            ref="provinceList"
            :data="provinceList"
            v-loading="provinceListLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
            @cell-click="provinceClick"
          >
            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="toUpdateProvince(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="toDeleteProvinceById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="toAddCity">添加城市
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            ref="cityList"
            :data="cityList"
            v-loading="cityListLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
            @cell-click="cityClick"
          >
            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="toUpdateCity(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="toDeleteCityById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button class="filter-item" style="width: 100%" type="primary" icon="el-icon-plus"
                   @click="toAddDistrict">添加区县
        </el-button>
        <div style="border: 1px solid #ebebeb; margin-top: 20px; border-radius: 4px">
          <el-table
            ref="districtList"
            :data="districtList"
            v-loading="districtListLoading"
            height="554"
            style="border-radius: 4px"
            fit
            highlight-current-row
          >
            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                           @click="toUpdateDistrict(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                           @click="toDeleteDistrictById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="DiaType==1?'新增省份':'修改省份'" :visible.sync="provinceVisible">
      <el-form label-position="right" :model="provinceForm" :rules="provinceRules" ref="provinceForm"
               label-width="100px">
        <el-form-item prop="name">
          <span slot="label">省份名称</span>
          <el-input v-model="provinceForm.name"/>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">排序</span>
          <template>
            <el-input-number v-model="provinceForm.sort" size="small" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="provinceVisible = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?addProvince():updateProvince()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="DiaType==1?'新增城市':'修改城市'" :visible.sync="cityVisible">
      <el-form label-position="right" :model="cityForm" :rules="cityRules" ref="cityForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">城市名称</span>
          <el-input v-model="cityForm.name"/>
        </el-form-item>
        <el-form-item prop="provinceId" v-if="DiaType==1">
          <span slot="label">所属省份</span>
          <el-select v-model="cityForm.provinceId" style="width: 50%" filterable placeholder="请选择省份">
            <el-option
              v-for="province in provinceList"
              :key="province.id"
              :label="province.name"
              :value="province.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">排序</span>
          <template>
            <el-input-number v-model="cityForm.sort" size="small" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cityVisible = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?addCity():updateCity()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="DiaType==1?'新增区县':'修改区县'" :visible.sync="districtVisible">
      <el-form label-position="right" :model="districtForm" :rules="districtRules" ref="districtForm"
               label-width="100px">
        <el-form-item prop="name">
          <span slot="label">区县名称</span>
          <el-input v-model="districtForm.name"/>
        </el-form-item>
        <el-form-item prop="cityId" v-if="DiaType==1">
          <span slot="label">所属城市</span>
          <el-select v-model="districtForm.cityId" style="width: 50%" filterable placeholder="请选择城市">
            <el-option
              v-for="city in cityList"
              :key="city.id"
              :label="city.name"
              :value="city.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">排序</span>
          <template>
            <el-input-number v-model="districtForm.sort" size="small" controls-position="right" :min="1"
                             :max="99"></el-input-number>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="districtVisible = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?addDistrict():updateDistrict()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryAllProvinces,
    queryCityByProvinceId,
    queryDistrictByCityId,
    addProvince,
    addCity,
    addDistrict,
    queryProvinceById,
    queryCityById,
    queryDistrictById,
    updateProvince,
    updateCity,
    updateDistrict,
    deleteProvinceById,
    deleteCityById,
    deleteDistrictById,
  } from '@/api/area';
  import {specstrValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        provinceList: [], // 省份集合
        cityList: [], // 市集合
        districtList: [], // 区集合
        provinceListLoading: false, // 省加载标识
        cityListLoading: false, // 市加载标识
        districtListLoading: false, // 区加载标识
        chosenProvinceId: '', // 当前选中的省份id
        chosenCityId: '', // 当前选中的市id
        DiaType: 1, //  判断弹窗是新增还是修改类型 1 新增 2 修改
        provinceVisible: false, // 省弹窗是否显示标识
        cityVisible: false, // 市弹窗是否显示标识
        districtVisible: false, // 区弹窗是否显示标识
        provinceForm: {id: '', name: '', sort: ''}, // 省
        cityForm: {id: '', name: '', sort: '', provinceId: ''}, // 市
        districtForm: {id: '', name: '', sort: '', cityId: ''}, // 区
        provinceRules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入排序',
              trigger: 'blur'
            }
          ],
        },
        cityRules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入排序',
              trigger: 'blur'
            }
          ],
          provinceId: [
            {
              required: true,
              message: '请选择省份',
              trigger: 'blur'
            }
          ],
        },
        districtRules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入排序',
              trigger: 'blur'
            }
          ],
          cityId: [
            {
              required: true,
              message: '请选择城市',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // 置空省市区列表
        this.provinceList = [];
        this.cityList = [];
        this.districtList = [];
        // 查询所有省份信息
        this.provinceListLoading = true;
        queryAllProvinces().then(provinceList => {
          this.provinceList = provinceList;
          this.provinceListLoading = false;
          if (provinceList && provinceList.length > 0) {
            // 设置省份列表第一个为选中状态
            this.$refs.provinceList.setCurrentRow(provinceList[0]);
            // 设置当前选中省份id
            this.chosenProvinceId = provinceList[0].id;
            // 根据省份id查询市列表
            this.cityListLoading = true;
            queryCityByProvinceId(provinceList[0].id).then(cityList => {
              this.cityList = cityList;
              this.cityListLoading = false;
              if (cityList && cityList.length > 0) {
                // 设置市列表第一个为选中状态
                this.$refs.cityList.setCurrentRow(cityList[0]);
                // 设置当前选中市id
                this.chosenCityId = cityList[0].id;
                // 根据市id查询区列表
                this.districtListLoading = true;
                queryDistrictByCityId(cityList[0].id).then(districtList => {
                  this.districtList = districtList;
                  this.districtListLoading = false;
                  if (districtList && districtList.length > 0) {
                    // 设置区列表第一个为选中状态
                    this.$refs.districtList.setCurrentRow(districtList[0]);
                  }
                })
              }
            })
          }
        })
      },
      // 省列表单元格点击事件
      provinceClick(row, column, cell) {
        // 点击的不是第一个单元格，直接返回，<el-table-column>即为单元格分割，省份名称为第一个单元格，修改和删除按钮为第二个单元格
        if (cell.cellIndex != 0) {
          return;
        }
        // 设置当前选中省份id
        this.chosenProvinceId = row.id;
        // 置空市和区列表
        this.cityList = [];
        this.districtList = [];
        // 根据省份id查询市列表
        this.cityListLoading = true;
        queryCityByProvinceId(row.id).then(cityList => {
          this.cityList = cityList;
          this.cityListLoading = false;
          if (cityList && cityList.length > 0) {
            // 设置市列表第一个为选中状态
            this.$refs.cityList.setCurrentRow(cityList[0]);
            // 设置当前选中市id
            this.chosenCityId = cityList[0].id;
            // 根据市id查询区列表
            this.districtListLoading = true;
            queryDistrictByCityId(cityList[0].id).then(districtList => {
              this.districtList = districtList;
              this.districtListLoading = false;
              if (districtList && districtList.length > 0) {
                // 设置区列表第一个为选中状态
                this.$refs.districtList.setCurrentRow(districtList[0]);
              }
            })
          }
        })
      },
      // 市列表单元格点击事件
      cityClick(row, column, cell) {
        // 点击的不是第一个单元格，直接返回，<el-table-column>即为单元格分割，市名称为第一个单元格，修改和删除按钮为第二个单元格
        if (cell.cellIndex != 0) {
          return;
        }
        // 设置当前选中市id
        this.chosenCityId = row.id;
        // 置空区列表
        this.districtList = [];
        // 根据市id查询区列表
        this.districtListLoading = true;
        queryDistrictByCityId(row.id).then(districtList => {
          this.districtList = districtList;
          this.districtListLoading = false;
          if (districtList && districtList.length > 0) {
            // 设置区列表第一个为选中状态
            this.$refs.districtList.setCurrentRow(districtList[0]);
          }
        })
      },
      // 准备新增省份
      toAddProvince() {
        this.provinceVisible = true;
        this.DiaType = 1;
        this.provinceForm = {id: '', name: '', sort: ''};
        if (this.$refs["provinceForm"]) {
          this.$refs["provinceForm"].resetFields();
        }
      },
      // 新增省份
      addProvince() {
        this.$refs['provinceForm'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addProvince(this.provinceForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.provinceVisible = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              } else {
                this.$message({
                  message: '创建失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备新增城市
      toAddCity() {
        this.cityVisible = true;
        this.DiaType = 1;
        this.cityForm = {id: '', name: '', sort: '', provinceId: this.chosenProvinceId};
        if (this.$refs["cityForm"]) {
          this.$refs["cityForm"].resetFields();
        }
      },
      // 新增城市
      addCity() {
        this.$refs['cityForm'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addCity(this.cityForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.cityVisible = false;
                this.provinceClick({id: this.chosenProvinceId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              } else {
                this.$message({
                  message: '创建失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备新增区县
      toAddDistrict() {
        this.districtVisible = true;
        this.DiaType = 1;
        this.districtForm = {id: '', name: '', sort: '', cityId: this.cityList.length > 0 ? this.chosenCityId : ''};
        if (this.$refs["districtForm"]) {
          this.$refs["districtForm"].resetFields();
        }
      },
      // 新增区县
      addDistrict() {
        this.$refs['districtForm'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addDistrict(this.districtForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.districtVisible = false;
                this.cityClick({id: this.chosenCityId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              } else {
                this.$message({
                  message: '创建失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备修改省份信息
      toUpdateProvince(id) {
        queryProvinceById(id).then(province => {
          if (this.$refs["provinceForm"]) {
            this.$refs["provinceForm"].resetFields();
          }
          this.DiaType = 2;
          this.provinceVisible = true;
          this.provinceForm = {id: province.id, name: province.name, sort: province.sort};
        });
      },
      // 修改省份信息
      updateProvince() {
        this.$refs['provinceForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateProvince(this.provinceForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.provinceVisible = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              } else {
                this.$message({
                  message: '更新失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备修改城市信息
      toUpdateCity(id) {
        queryCityById(id).then(city => {
          if (this.$refs["cityForm"]) {
            this.$refs["cityForm"].resetFields();
          }
          this.DiaType = 2;
          this.cityVisible = true;
          this.cityForm = {id: city.id, name: city.name, sort: city.sort, provinceId: city.provinceId};
        });
      },
      // 修改城市信息
      updateCity() {
        this.$refs['cityForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateCity(this.cityForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.cityVisible = false;
                this.provinceClick({id: this.chosenProvinceId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              } else {
                this.$message({
                  message: '更新失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备修改区县信息
      toUpdateDistrict(id) {
        queryDistrictById(id).then(district => {
          if (this.$refs["districtForm"]) {
            this.$refs["districtForm"].resetFields();
          }
          this.DiaType = 2;
          this.districtVisible = true;
          this.districtForm = {id: district.id, name: district.name, sort: district.sort, cityId: district.cityId};
        });
      },
      // 修改区县信息
      updateDistrict() {
        this.$refs['districtForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateDistrict(this.districtForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.districtVisible = false;
                this.cityClick({id: this.chosenCityId}, '', {cellIndex: 0});
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              } else {
                this.$message({
                  message: '更新失败!',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 准备删除省份
      toDeleteProvinceById(id) {
        this.$confirm('确定要删除此省份吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteProvinceById(id);
        })
      },
      // 删除省份
      deleteProvinceById(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteProvinceById(id).then(res => {
            this.isProcess = false;
            if (res == -1) {
              this.$message({
                type: 'error',
                message: '该省份下面有城市信息，不能删除!'
              });
            } else if (res == 1) {
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }
      },
      // 准备删除城市
      toDeleteCityById(id) {
        this.$confirm('确定要删除此城市吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCityById(id);
        })
      },
      // 删除城市
      deleteCityById(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteCityById(id).then(res => {
            this.isProcess = false;
            if (res == -1) {
              this.$message({
                type: 'error',
                message: '该城市下面有区县信息，不能删除!'
              });
            } else if (res == 1) {
              this.provinceClick({id: this.chosenProvinceId}, '', {cellIndex: 0});
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }
      },
      // 准备删除区县
      toDeleteDistrictById(id) {
        this.$confirm('确定要删除此区县吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDistrictById(id);
        })
      },
      // 删除区县
      deleteDistrictById(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteDistrictById(id).then(res => {
            this.isProcess = false;
            if (res == 1) {
              this.cityClick({id: this.chosenCityId}, '', {cellIndex: 0});
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }
      },
    }
  }
</script>
