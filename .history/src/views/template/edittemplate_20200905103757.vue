<template>
  <div id="pageMain" class="app-container" style="padding: 5px 20px">
    <sticky :z-index="10" class="filter-container">
      <div style="background: #fff; padding: 20px 0 10px 0; display: flex; justify-content: space-between">
        <el-dropdown @command="toAddFloor">
          <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">
            添加页面元素<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">轮播广告</el-dropdown-item>
            <el-dropdown-item command="2">通栏广告</el-dropdown-item>
            <el-dropdown-item command="5">页面导航</el-dropdown-item>
            <el-dropdown-item command="6">广告组合一</el-dropdown-item>
            <el-dropdown-item command="7">广告组合二</el-dropdown-item>
            <el-dropdown-item command="8">广告组合三</el-dropdown-item>
            <el-dropdown-item command="9">广告组合四</el-dropdown-item>
            <el-dropdown-item command="10">商品一</el-dropdown-item>
            <el-dropdown-item command="3">商品二</el-dropdown-item>
            <el-dropdown-item command="11">商品三</el-dropdown-item>
            <el-dropdown-item command="12">商品五</el-dropdown-item>
            <el-dropdown-item command="4">空白占位</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div>
          <el-button class="filter-item" size="medium" type="primary" v-if="this.addFlag =='1'"
                     icon="el-icon-setting" @click="toSetTemplate">模板设置
          </el-button>
          <el-button class="filter-item" size="medium" type="success" icon="el-icon-finished" @click="saveTemplate">保存模板
          </el-button>
        </div>
      </div>
    </sticky>

    <!--来源首页则显示搜索框-->
    <div v-if="this.from == '1' || this.from == '3' || this.from =='5'" style="margin-bottom: 10px">
      <el-switch
        v-model="searchBoxVisible"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="显示搜索栏"
        inactive-text="隐藏搜索栏"
      />
      <span style="font-size: 12px; color: #666">（此操作只作用于当前预览页面）</span>
    </div>

    <div class="phone_main">
      <div class="phone_title"/>
      <div class="phone_box">
        <div v-if="this.from == '2' || this.from == '4' || this.from == '6'" class="weui-search-bar myTopbar"
             style="z-index: auto">
          <div class="weui-cell__ft"></div>
          <div class="myTopbar_title" id="thematicTitle">{{this.thematicForm.name}}</div>
          <div style="width:35px"></div>
        </div>
        <div v-show="searchBoxVisible && (this.from == '1' || this.from == '3' || this.from =='5')"
             class="header-home-wrapper">
          <div class="search-container">
            <div class="search-box-cover"/>
            <div class="search-box">
              <div class="search-tb">
                <div class="search-form">
                  <div class="search-form-box">
                    <span class="search-form-icon"/>
                    <div class="search-form-input">
                      <input type="text" maxlength="20" autocomplete="off" value="" placeholder="请输入搜索关键字">
                    </div>
                  </div>
                </div>
                <div class="search-login login-ed">
                  <a href="javascript:;"><span class="search-icon-logined"/></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <draggable v-model="templates">
          <transition-group>
            <div v-for="(floor,index) in templates" :key="index">
              <!-- 轮播广告 -->
              <div v-if="floor.template === '1'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <swiper :options="swiperOption">
                  <swiper-slide v-for="advert in floor.adverts">
                    <img :src="advert.image" style="width: 100%; display: block">
                  </swiper-slide>
                  <div slot="pagination" class="swiper-pagination"/>
                </swiper>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 通栏广告 -->
              <div v-if="floor.template === '2'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <img :src="floor.adverts[0].image" style="width: 100%; display: block">
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>


              <!-- 页面导航 -->
              <div v-if="floor.template === '5'" class="index_nav clearfix" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div v-for="advert in floor.adverts" class="index_nav_box">
                  <img :src="advert.image">
                  <p>{{ advert.texts.name }}</p>
                </div>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 广告组合一 -->
              <div v-if="floor.template === '6'" class="clearfix" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div v-for="advert in floor.adverts" style="width: 50%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 40%">
                    <img :src="advert.image" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 广告组合二 -->
              <div v-if="floor.template === '7'" class="clearfix" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div v-for="advert in floor.adverts" style="width: 50%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 64%">
                    <img :src="advert.image" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 广告组合三 -->
              <div v-if="floor.template === '8'" class="clearfix" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div style="width: 50%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 64%">
                    <img :src="floor.adverts[0].image"
                         style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div style="width: 25%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 129%">
                    <img :src="floor.adverts[1].image"
                         style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div style="width: 25%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 129%">
                    <img :src="floor.adverts[2].image"
                         style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 广告组合四 -->
              <div v-if="floor.template === '9'" class="clearfix" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div v-for="advert in floor.adverts" style="width: 25%; float: left">
                  <div style="width: 100%; position: relative; height: 0; padding-bottom: 143%">
                    <img :src="advert.image" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0">
                  </div>
                </div>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>
              <!-- 商品一 -->
              <div v-if="floor.template === '10'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <ul class="searchlist-normal clearfix searchlist-square-pic">
                  <li v-for="advert in floor.adverts" class="normal-list">
                    <div class="pro-img"><img :alt="advert.texts.name" :src="advert.image"></div>
                    <div class="product-info-box">
                      <div class="product-name"><i v-if="advert.goodstype" class="self-sell">自营</i><span>{{ advert.texts.name }}</span>
                      </div>
                      <div class="product-price-m"><em>¥<span
                        class="price">{{ parseFloat(advert.price).toFixed(2) }}</span></em>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>
              <!-- 商品二 -->
              <div v-if="floor.template === '3'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <ul class="searchlist-normal clearfix searchlist-square-pic">
                  <li v-for="advert in floor.adverts" class="normal-list">
                    <div class="pro-img"><img :alt="advert.texts.name" :src="advert.image"></div>
                    <div class="product-info-box">
                      <div class="product-name"><i v-if="advert.goodstype" class="self-sell">自营</i><span>{{ advert.texts.name }}</span>
                      </div>
                      <div class="product-price-m"><em>¥<span
                        class="price">{{ parseFloat(advert.price).toFixed(2) }}</span></em>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 商品三 -->
              <div v-if="floor.template === '12'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <ul class="searchlist-normal clearfix searchlist-square-pic">
                  <li v-for="advert in floor.adverts" class="normal-list">
                    <div class="pro-img"><img :alt="advert.texts.name" :src="advert.image"></div>
                    <div class="product-info-box">
                      <div class="product-name"><i v-if="advert.goodstype" class="self-sell">自营</i><span>{{ advert.texts.name }}</span>
                      </div>
                      <div class="product-price-m"><em>¥<span
                        class="price">{{ parseFloat(advert.price).toFixed(2) }}</span></em>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

               <!-- 商品三五-->
              <div v-if="floor.template === '12'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <ul class="searchlist-normal clearfix searchlist-square-pic">
                  <li v-for="advert in floor.adverts" class="normal-list">
                    <div class="pro-img"><img :alt="advert.texts.name" :src="advert.image"></div>
                    <div class="product-info-box">
                      <div class="product-name"><i v-if="advert.goodstype" class="self-sell">自营</i><span>{{ advert.texts.name }}</span>
                      </div>
                      <div class="product-price-m"><em>¥<span
                        class="price">{{ parseFloat(advert.price).toFixed(2) }}</span></em>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

              <!-- 空白占位符 -->
              <div v-if="floor.template === '4'" style="position: relative"
                   @mouseenter="floor.editToolBarVisible = true" @mouseleave="floor.editToolBarVisible = false">
                <div :style="{height: floor.adverts[0].texts.height + 'px'}"/>
                <div v-show="floor.editToolBarVisible" class="edit_toolbar">
                  <el-button size="mini" type="success" @click="editAdvert(floor)">编辑</el-button>
                  <el-button size="mini" type="danger" style="margin-left: 0" @click="deleteFloor(index)">删除</el-button>
                </div>
              </div>

            </div>
          </transition-group>
        </draggable>

      </div>
    </div>

    <!--轮播广告编辑-->
    <el-drawer
      title="轮播广告"
      size="400px"
      :visible.sync="slidesShow"
      direction="rtl"
    >
      <div id="slidesDiv" class="img_container">
        <el-alert
          title="图片建议尺寸:1242px*510px(顶部)，1242px*330px(页面)"
          type="warning"
          :closable="false"
        />
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="(item,index) in editFloor.adverts" :span="12">
            <div class="imgBox">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, item)}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="item.image" :src="item.image" class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <el-button-group class="imgBar">
                <el-button :class="{ hasLink: item.actionType!='' }" type="primary" plain icon="el-icon-link"
                           @click="toEditAdvert(item)"/>
                <el-button type="danger" plain icon="el-icon-delete" @click="delAdvert(index)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addAdvert()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 通栏广告编辑-->
    <el-drawer
      title="通栏广告"
      size="400px"
      :visible.sync="bannerShow"
      direction="rtl"
    >
      <div class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24">
            <div class="imgBox">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, editFloor.adverts[0])}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="editFloor.adverts?editFloor.adverts[0].image:false" :src="editFloor.adverts[0].image"
                     class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <el-button-group class="imgBar">
                <el-button v-if="editFloor.adverts"
                           :class="{ hasLink:editFloor.adverts[0].actionType!=''}"
                           @click="toEditAdvert(editFloor.adverts[0])" type="primary" plain
                           icon="el-icon-link" style="width: 100%"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 页面导航编辑 -->
    <el-drawer
      title="页面导航"
      size="400px"
      :visible.sync="navsShow"
      direction="rtl"
    >
      <div id="navsDiv" class="img_container">
        <el-alert
          title="示例：(图片建议尺寸：120px*120px)，建议字数不超过5"
          type="warning"
          :closable="false"
        />
        <img :src="require('@/assets/img/nav.jpg')" style="margin-top: 10px">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="(advert,index) in editFloor.adverts" :span="12">
            <div class="imgBox">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, advert)}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="advert.image" :src="advert.image" class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <el-input v-model="advert.texts.name" placeholder="请输入标题" class="drawer-input"/>
              <el-button-group class="imgBar">
                <el-button type="primary" :class="{ hasLink: advert.actionType!='' }" @click="toEditAdvert(advert)"
                           plain
                           icon="el-icon-link"/>
                <el-button type="danger" plain icon="el-icon-delete" @click="delAdvert(index)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addAdvert()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!--广告组合编辑 -->
    <el-drawer
      :title="this.advertGroupTitle[this.editFloor.template]"
      size="400px"
      :visible.sync="advertGroupShow"
      direction="rtl"
    >
      <div class="img_container">
        <el-alert
          :title="this.advertGroupTips[this.editFloor.template]"
          type="warning"
          :closable="false"
        />
        <img :src="this.advertGroupImg[this.editFloor.template]" style="margin-top: 10px">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="advert in this.editFloor.adverts" :span="12">
            <div class="imgBox">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, advert)}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="advert.image" :src="advert.image" class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <el-button-group class="imgBar">
                <el-button type="primary" :class="{ hasLink: advert.actionType!='' }" @click="toEditAdvert(advert)"
                           plain
                           icon="el-icon-link" style="width: 100%"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!--商品编辑-->
    <el-drawer
       :title="this.goodGroupTitle[this.editFloor.template]"
      size="400px"
      :visible.sync="goodShow"
      direction="rtl"
    >
      <div id="goodsDiv" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="(advert,index) in this.editFloor.adverts" :span="12">
            <div class="imgBox">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, advert)}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="advert.image" :src="advert.image" class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <el-input v-model="advert.texts.name" placeholder="请输入标题" class="drawer-input"/>
              <el-input v-model="advert.price" placeholder="请输入价格" class="drawer-input"/>
              <el-button-group class="imgBar">
                <el-button type="primary" :class="{ hasLink: advert.actionType!='' }" @click="toEditAdvert(advert)"
                           plain
                           icon="el-icon-link"/>
                <el-button type="danger" plain icon="el-icon-delete" @click="delAdvert(index)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addAdvert()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 空白编辑 -->
    <el-drawer
      title="空白占位"
      size="400px"
      :visible.sync="blankShow"
      direction="rtl"
    >
      <div class="img_container" v-for="(advert)  in this.editFloor.adverts">
        <el-input-number v-model="advert.texts.height" :min="10" :step="5" step-strictly/>
        <span style="margin-left: 10px; color: #666">单位: 像素(px)</span>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveFloor()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!--链接-->
    <el-dialog title="链接" :visible.sync="linkShow" width="1000px">
      <el-tabs @tab-click="changeTab()" v-model="tabActiveName" type="card">
        <el-tab-pane label="当前链接" name="0">
          <div v-if="this.advertRef.actionType=='2'" style="line-height: 40px">分类：{{this.linkedCate.name}}</div>
          <div v-if="this.advertRef.actionType=='4'" style="line-height: 40px">功能链接：{{this.linkedFunction}}</div>
          <div v-if="this.advertRef.actionType=='5'" style="line-height: 40px">自定义链接：{{this.advertRef.texts.url}}</div>
          <el-table
            v-if="this.advertRef.actionType =='1'"
            :data="linkedSkus"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="图片" width="80">
              <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
            </el-table-column>
            <el-table-column label="货品名称" min-width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="货品规格">
              <template slot-scope="scope">
                <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
              </template>
            </el-table-column>
            <el-table-column label="销售价">
              <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="店铺名称">
              <template slot-scope="scope">{{ scope.row.storeName }}</template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="this.advertRef.actionType =='3'"
            :data="linkedThemtics"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="专题名">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="专题标题">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 10px" type="primary" size="small" @click="clearChoosedLink">清除链接</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品" name="1">
          <div class="filter-container">
            <el-input v-model="listQuery.name" maxlength="64" placeholder="商品名称" size="medium" style="width: 200px"
                      class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
            </el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="skus"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio class="table_radio" :label="scope.row.id" @change.native="selectSku(scope.row)"
                          v-model="selectedId">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="图片" width="80">
              <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
            </el-table-column>
            <el-table-column label="货品名称" min-width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="货品规格">
              <template slot-scope="scope">
                <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
              </template>
            </el-table-column>
            <el-table-column label="销售价">
              <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="店铺名称">
              <template slot-scope="scope">{{ scope.row.storeName }}</template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]"
                           :page-size="listQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分类" name="2">
          <el-tree
            v-model="selectCateId"
            style="max-height: 300px; overflow: auto; padding: 10px 0; border: 1px solid #DCDFE6; border-radius: 4px"
            @check="checkCate"
            :props="props"
            :load="loadNode"
            ref="tree"
            :check-strictly="true"
            :default-expand-all="true"
            lazy
            node-key="id"
            show-checkbox>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="专题" name="3">
          <div class="filter-container">
            <el-input placeholder="专题名称" v-model="thematicListQuery.name" maxlength="32" size="medium"
                      style="width: 200px" class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search"
                       @click="handleThematicFilter">搜索
            </el-button>
          </div>
          <el-table
            v-loading="thematicListLoading"
            :data="thematics"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio class="table_radio" :label="scope.row.id" @change.native="selectThemtic(scope.row)"
                          v-model="selectedThematicId">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="专题名">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="专题标题">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination background @size-change="handleThematicSizeChange"
                           @current-change="handleThematicCurrentChange"
                           :current-page="thematicListQuery.pageNum+1" :page-sizes="[10,20,30,50]"
                           :page-size="thematicListQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="thematicTotal">
            </el-pagination>
          </div>

        </el-tab-pane>
        <el-tab-pane label="功能链接" name="4">
          <el-select size="medium" style="width: 100%" v-model="functionUrl" placeholder="请选择功能链接">
            <el-option v-if="from =='1' || from =='2'"
                       v-for="item in appFunctionUrlOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
            <el-option v-if="from =='3' || from =='4'"
                       v-for="item in appletFunctionUrlOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
            <el-option v-if="from =='5' || from =='6'"
                       v-for="item in mobileFunctionUrlOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane v-if="from =='4'|| from == '5'|| from == '6'" label="自定义" name="5">
          <el-input maxlength="50" v-model="customizeUrl"/>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="linkShow = false">取消</el-button>
        <el-button type="primary" @click="saveLink">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="模板设置" :visible.sync="pageSetVisible">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="templateName">
          <span slot="label">模板名称</span>
          <el-input v-model="form.templateName" maxlength="32"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pageSetVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSetting">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="专题设置" :visible.sync="thematicset">
      <el-form label-position="right" :model="thematicForm" :rules="thematicRules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">专题名称</span>
          <el-input v-model="thematicForm.name" maxlength="32"/>
        </el-form-item>

        <el-form-item prop="title">
          <span slot="label">专题标题</span>
          <el-input v-model="thematicForm.title" maxlength="32"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="thematicset = false">取消</el-button>
        <el-button type="primary" @click="saveThematicSetting">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import draggable from 'vuedraggable'
  import {getToken} from '@/utils/token'

  // 楼层和编辑隐藏显示的映射关系
  const floorEditTypeMapping = {
    '1': 'slidesShow',
    '2': 'bannerShow',
    '3': 'goodShow',
    '10': 'goodShow',
    '11': 'goodShow',
    '12': 'goodShow',
    '4': 'blankShow',
    '5': 'navsShow',
    '6': 'advertGroupShow',
    '7': 'advertGroupShow',
    '8': 'advertGroupShow',
    '9': 'advertGroupShow',
  };

  // 功能链接映射关系
  const functionUrlMapping = {
    '0': '领券中心',
    '1': '红包中心',
    '2': '秒杀',
    '3': '预售中心',
    '4': '试用中心',
    '5': '拼团中心',
    '6': '所有商品',
    '7': '分类列表',
    '8': '签到',
    '9': '附近门店',
    '10': '店铺列表',
    '11': '附近店铺',
    '12': '积分商城',
    '13': '小程序直播'
  }


  export default {
    components: {Sticky, swiper, swiperSlide, draggable},
    props: ['addFlag', 'initId', 'from', "queryTemplateSkus", "queryTemplateCates", "queryTemplateThematic", "queryTemplateSkuDetail", "queryTemplateThematicDetail", "queryTemplate", "addTemplate", "updateTemplate"], // addFlag 新增或者修改的标记  0 新增 1 修改 initId初始化模版的id  from 来源 1 app首页 2 app专题 3 小程序首页 4 小程序专题  5 h5首页 6 h5 专题
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        searchBoxVisible: true, // 是否显示搜索栏
        advertGroupTitle: {'6': '广告组合一', '7': '广告组合二', '8': '广告组合三', '9': '广告组合四'}, // 广告组合的名称
        goodGroupTitle:{'3': '商品二','10': '商品一', '11': '商品三','12': '商品五',},
        advertGroupTips: {
          '6': '示例：(图片建议尺寸：750px*300px)',
          '7': '示例：(图片建议尺寸：620px*396px)',
          '8': '示例：(图片建议尺寸：620px*396px，310px*396px)',
          '9': '示例：(图片建议尺寸：310px*444px)'
        },// 广告组合的提示
        advertGroupImg: {
          '6': require('@/assets/img/advertGroup1.jpg'),
          '7': require('@/assets/img/advertGroup2.jpg'),
          '8': require('@/assets/img/advertGroup3.jpg'),
          '9': require('@/assets/img/advertGroup4.jpg')
        },
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: '',
        }, // 查询参数
        listLoading: true, // 加载中
        skus: null, // 单品数据
        total: null, // 数据总数,
        thematicListQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        thematicListLoading: true, // 加载中
        thematics: null, // 专题数据
        thematicTotal: null, // 数据总数,
        tabActiveName: '0',// 当前选中的tab
        addOrUpdateFloor: 0,// 编辑还是新增广告 0 编辑 1 新增
        slidesShow: false,// 编辑轮播广告的显示隐藏标记
        bannerShow: false,// 编辑通栏广告的显示隐藏标记
        pageSetVisible: false,// 模版名称显示隐藏标记
        navsShow: false,// 编辑页面广告的显示隐藏标记
        goodShow: false,// 编辑商品的显示隐藏标记
        advertGroupShow: false,// 编辑广告组合的显示隐藏标记
        blankShow: false,// 空格编辑显示隐藏标记
        linkShow: false, //链接显示隐藏标记
        editFloor: {},// 编辑的楼层
        floorRef: {},// 当前楼层的引用
        advertRef: {},//当前广告的引用
        tempSelectedSku: {},// 临时选中的sku信息
        selectedId: '',// 选中的单品id
        selectedThematicId: '',// 选中的专题id
        tempSelectedThematic: {},// 临时选中的专题
        allCates: [],// 所有的分类
        firstCates: [],// 所有的一级分类
        selectCateId: 0,//选中的分类id
        functionUrl: '-1', // 当前选中的功能链接
        linkedSkus: [],// 链接选中的单品
        linkedThemtics: [],//链接选中的专题
        linkedCate: {},// 链接选中的分类
        linkedFunction: '',// 链接选中的功能链接
        customizeUrl: '',// 自定义链接地址
        thematicset: false,// 专题设置隐藏显示标记
        mobileFunctionUrlOptions: [
          {
            value: '-1',
            label: '未选择'
          },
          {
            value: '0',
            label: '领券中心'
          },
          {
            value: '1',
            label: '红包中心'
          },
          {
            value: '2',
            label: '秒杀'
          },
          {
            value: '3',
            label: '预售中心'
          },
          {
            value: '4',
            label: '试用中心'
          },
          {
            value: '5',
            label: '拼团中心'
          },
          {
            value: '6',
            label: '所有商品'
          },
          {
            value: '7',
            label: '分类列表'
          },
          {
            value: '8',
            label: '签到中心'
          },
          {
            value: '9',
            label: '附近门店'
          },
          {
            value: '10',
            label: '店铺列表'
          },
          {
            value: '11',
            label: '附近店铺'
          },
          {
            value: '12',
            label: '积分商城'
          }
        ],
        appFunctionUrlOptions: [
          {
            value: '-1',
            label: '未选择'
          },
          {
            value: '0',
            label: '领券中心'
          },
          {
            value: '1',
            label: '红包中心'
          },
          {
            value: '2',
            label: '秒杀'
          },
          {
            value: '3',
            label: '预售中心'
          },
          {
            value: '4',
            label: '试用中心'
          },
          {
            value: '5',
            label: '拼团中心'
          },
          {
            value: '6',
            label: '所有商品'
          },
          {
            value: '7',
            label: '分类列表'
          },
          {
            value: '8',
            label: '签到中心'
          },
          {
            value: '9',
            label: '附近门店'
          },
          {
            value: '10',
            label: '店铺列表'
          },
          {
            value: '11',
            label: '附近店铺'
          }
        ],
        appletFunctionUrlOptions: [
          {
            value: '-1',
            label: '未选择'
          },
          {
            value: '0',
            label: '领券中心'
          },
          {
            value: '1',
            label: '红包中心'
          },
          {
            value: '2',
            label: '秒杀'
          },
          {
            value: '3',
            label: '预售中心'
          },
          {
            value: '6',
            label: '所有商品'
          },
          {
            value: '7',
            label: '分类列表'
          },
          {
            value: '8',
            label: '签到中心'
          },
          {
            value: '10',
            label: '店铺列表'
          },
          {
            value: '12',
            label: '积分商城'
          },
          {
            value: '13',
            label: '小程序直播'
          }
        ],
        form: {
          templateName: '',// 模版名称
        },
        thematicForm: {
          name: '',// 专题名称
          title: '',// 专题标题
        }, // 专题提交的form
        templates: [],// 模版
        isProcess: false, // 接口是否处理中
        rules: {
          templateName: [
            {
              required: true,
              message: '请输入模版名称',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
        thematicRules: {
          name: [
            {
              required: true,
              message: '请输入专题名称',
              trigger: 'blur'
            }
          ],
          title: [
            {
              required: true,
              message: '请输入专题标题',
              trigger: 'blur'
            }
          ]
        }, // 专题验证规则
      }
    },
    mounted() {
      // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    created() {
      // 如果初始化模版id是0的话 则说明是空白模版不需要 查询
      if (this.initId != 0) {
        this.queryInitTemplate();
      }
      this.queryAllCates();
    },
    methods: {
      //查询初始化模版
      queryInitTemplate() {
        this.queryTemplate(this.initId).then(res => {
          // 新增
          if (this.isAdd()) {
            if (res && res.initJson) {
              this.templates = JSON.parse(res.initJson);
            }
          } else {
            // 更新
            // 来自app首页 小程序首页 h5首页
            if (this.from == '1' || this.from == '3' || this.from == '5') {
              if (res && res.indexJson) {
                this.templates = JSON.parse(res.indexJson);
                this.form.templateName = res.name;
              }
            } else if (this.from == '2' || this.from == '4' || this.from == '6') {
              // 来自app专题页 和小程序专题页 h5专题页
              if (res && res.descJson) {
                this.templates = JSON.parse(res.descJson);
                this.thematicForm.name = res.name;
                this.thematicForm.title = res.title;
              }
            }
          }
        });
      },
      // 编辑楼层中的广告
      editAdvert(floor) {
        this[floorEditTypeMapping[floor.template]] = true;
        // 将轮播数据复制一份到编辑的楼层里面
        this.editFloor = JSON.parse(JSON.stringify(floor));
        this.floorRef = floor;
        this.addOrUpdateFloor = 0;
      },
      // 添加楼层
      toAddFloor(type) {
        // 广告组合一和广告组合二有两个广告位
        if (type == '6' || type == '7') {
          this.editFloor = {
            "adverts": [{
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }],
            "sort": this.templates.length,
            "template": type,
            "texts": {},
            "editToolBarVisible": false
          };
        } else if (type == '8') {
          // 广告组合三有三个广告位置
          this.editFloor = {
            "adverts": [{
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }],
            "sort": this.templates.length,
            "template": type,
            "texts": {},
            "editToolBarVisible": false
          };
        } else if (type == '9') {
          // 广告组合四有4个广告位置
          this.editFloor = {
            "adverts": [{
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }, {
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }],
            "sort": this.templates.length,
            "template": type,
            "texts": {},
            "editToolBarVisible": false
          };
        } else {
          this.editFloor = {
            "adverts": [{
              "actionParamId": "",
              "actionType": "",
              "image": "",
              "params": {},
              "price": 0,
              "sort": 0,
              "texts": {},
              "action": "",
            }],
            "sort": this.templates.length,
            "template": type,
            "texts": {},
            "editToolBarVisible": false
          };
        }
        this[floorEditTypeMapping[type]] = true;
        this.addOrUpdateFloor = 1;
      },
      // 删除楼层
      deleteFloor(index) {
        this.templates.splice(index, 1)
      },
      // 删除广告
      delAdvert(index) {
        // 编辑窗口删除元素
        if (this.editFloor.adverts.length === 1) {
          this.$message({
            type: 'warning',
            message: '至少要添加一条数据!'
          })
        } else {
          this.editFloor.adverts.splice(index, 1)
        }
      },
      // 新增广告
      addAdvert() {
        this.editFloor.adverts.push({
          actionParamId: "",
          actionType: "",
          image: "",
          action: '',
          params: {},
          price: 0,
          sort: this.editFloor.adverts.length,
          texts: {}
        })
        this.scrollBottom('slidesDiv')
      },
      scrollBottom(id) {
        // 滚动到容器底部
        this.$nextTick(function () {
          const div = document.getElementById(id)
          div.scrollTop = div.scrollHeight
        })
      },
      // 图片上传成功回掉
      uploadSuccess(res, file, item) {

        item.image = res;

        // 如果是通栏和轮播则计算图片的高宽比
        if (this.editFloor.template == '1' || this.editFloor.template == '2') {
          return new Promise(() => {
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = function (theFile) {
              let image = new Image()
              image.src = theFile.target.result
              image.onload = function () {
                item.tempRatio = this.width / this.height;
              }
            }
          })
        }
      },
      // 保存楼层
      saveFloor() {
        console.log(this.editFloor)
        // 如果不是空白占位 则必须上传图片
        if (this.editFloor.template != '4' && !this.validateAdverts()) {
          this.$message({
            type: 'warning',
            message: '请上传图片!'
          })
          return;
        }
        this.setFloorRatio();
        // 修改广告
        if (this.addOrUpdateFloor == 0) {
          this.floorRef.adverts = JSON.parse(JSON.stringify(this.editFloor.adverts));
          if (this.editFloor.texts && this.editFloor.texts.ratio) {
            this.floorRef.texts.ratio = this.editFloor.texts.ratio;
          }
        } else {
          // 新增广告
          this.templates.push(JSON.parse(JSON.stringify(this.editFloor)));
          document.documentElement.scrollTop = document.documentElement.scrollHeight // 滚动到页面底部
        }
        this[floorEditTypeMapping[this.editFloor.template]] = false;
        this.editFloor = {};
      },
      // 判断广告中是否有图片
      validateAdverts() {
        // 广告中的图片不能为空
        return this.editFloor.adverts.filter(advert => advert.image == '').length == 0;
      },
      // 设置楼层图片的宽高比
      setFloorRatio() {
        // 如果是 轮播和通栏广告则设置楼层图片的宽高比
        if (this.editFloor.template == '1' || this.editFloor.template == '2') {
          let adverts = this.editFloor.adverts.filter(advert => advert.tempRatio);
          if (adverts && adverts.length > 0) {
            // 取第一个楼层的宽高比
            this.editFloor.texts.ratio = adverts[0].tempRatio
          }
        }
      },
      querySkus() {
        this.listLoading = true
        this.queryTemplateSkus(this.listQuery).then(response => {
          this.skus = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySkus();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.querySkus();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.querySkus();
      },
      // 改变tab
      changeTab() {
        // 选中的是商品查询商品信息
        if (this.tabActiveName == '1') {
          this.querySkus();
        } else if (this.tabActiveName == '2') {
          // 选中的是分类
        } else if (this.tabActiveName == '3') {
          //选中的是专题查询专题
          this.queryThematic();
        }
        // 清除原来选的链接
        this.clearLink();
      },
      // 查询所有分类
      queryAllCates() {
        this.queryTemplateCates().then(res => {
          if (res) {
            this.allCates = res;
            for (let i = 0; i < res.length; i++) {
              if (res[i].grade == 1) {
                this.firstCates.push({
                  id: res[i].id,
                  name: res[i].name,
                });
              }
            }
          }
        })
      },
      // 选中单品
      selectSku(sku) {
        this.selectedId = sku.id;
        this.tempSelectedSku = sku;
      },
      // 选中专题
      selectThemtic(themtic) {
        this.selectedThematicId = themtic.id;
        this.tempSelectedThematic = themtic;
      },
      //加载 el-tree 数据
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve(this.firstCates);
        }
        if (node.level == 1 || node.level == 2) {
          let second = new Array();
          for (let i = 0; i < this.allCates.length; i++) {
            if (this.allCates[i].parentId == node.data.id) {
              let s = {
                id: this.allCates[i].id,
                name: this.allCates[i].name,
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
      //选择boss分类
      checkCate(even) {
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setChecked(even.id, true, false)
        this.selectCateId = even.id;
      },
      // 查询专题
      queryThematic() {
        this.thematicListLoading = true
        this.queryTemplateThematic(this.listQuery).then(response => {
          this.thematics = response.data;
          this.thematicTotal = response.recordsTotal;
          this.thematicListLoading = false
        });
      },
      handleThematicCurrentChange(val) {
        this.thematicListQuery.pageNum = val - 1;
        this.queryThematic();
      },
      // 过滤查询
      handleThematicFilter() {
        this.thematicListQuery.pageNum = 0;
        this.queryThematic();
      },
      handleThematicSizeChange(val) {
        this.thematicListQuery.pageNum = 0;
        this.thematicListQuery.pageSize = val;
        this.queryThematic();
      },
      // 保存链接
      saveLink() {
        // 当前选中的是商品
        if (this.selectedId != '') {
          this.advertRef.actionType = '1';
          this.advertRef.actionParamId = this.selectedId;
        } else if (this.selectCateId != 0) {
          // 当前选中的是分类
          this.advertRef.actionType = '2';
          this.advertRef.actionParamId = this.selectCateId;

        } else if (this.selectedThematicId != '') {
          // 当前选中的是专题
          this.advertRef.actionType = '3';
          this.advertRef.actionParamId = this.selectedThematicId;
        } else if (this.functionUrl != '-1') {
          // 选择的是功能链接
          this.advertRef.actionType = '4';
          this.advertRef.actionParamId = this.functionUrl;
        } else if (this.customizeUrl != '') {
          // 选择的是自定义链接
          this.advertRef.actionType = '5';
          this.advertRef.texts.url = this.customizeUrl;
        }
        this.$refs.tree.setCheckedKeys([]);
        this.linkShow = false;
      },
      // 准备编辑广告
      toEditAdvert(advert) {
        this.clearLink();
        this.tabActiveName = '0';
        this.advertRef = advert;
        this.linkShow = true;
        this.linkedSkus = [];
        this.linkedThemtics = [];
        this.linkedCate = {};
        this.linkedFunction = '';
        this.customizeUrl = '';
        // 查询单品信息
        if (advert.actionType == '1') {
          this.queryTemplateSkuDetail(advert.actionParamId).then(res => {
            this.linkedSkus.push(res.data);
          })
        } else if (advert.actionType == '2') {
          // 查询分类信息
          let cate = this.allCates.filter(cate => cate.id == advert.actionParamId)[0];
          if (cate) {
            this.linkedCate.name = cate.name;
          }

        } else if (advert.actionType == '3') {
          // 查询专题信息
          this.queryTemplateThematicDetail(advert.actionParamId).then(res => {
            this.linkedThemtics.push(res.data)
          })
        } else if (advert.actionType == '4') {
          // 功能链接
          this.linkedFunction = functionUrlMapping[advert.actionParamId];
        }
      },
      // 清除选中的链接
      clearLink() {
        this.tempSelectedSku = {};
        this.selectedId = '';
        this.selectCateId = 0;
        this.tempSelectedThematic = {};
        this.selectedThematicId = '';
        this.functionUrl = '-1';
        this.customizeUrl = '';
      },
      // 清除已经选中的链接
      clearChoosedLink() {
        this.advertRef.actionType = '';
        this.advertRef.actionParamId = '';
      },
      // 保存模版
      saveTemplate() {
        // 如果是新增 则先跳出模版名称填写
        if (this.isAdd()) {
          // 来自app首页 小程序首页 h5 首页
          if (this.from == '1' || this.from == '3' || this.from == '5') {
            this.pageSetVisible = true;
          } else if (this.from == '2' || this.from == '4' || this.from == '6') {
            // 来自app专题 小程序专题 h5专题
            this.thematicset = true;
          }
        } else {
          for (let i = 0; i < this.templates.length; i++) {
            for (let k = 0; k < this.templates[i].adverts.length; k++) {
              if (this.templates[i].adverts[k].actionType == '') {
                this.templates[i].adverts[k].params = {};
                this.templates[i].adverts[k].action = '';
              }
            }
          }
          const template = {};
          template.id = this.initId;
          template.floors = this.templates;
          if (this.isProcess) {
            return false;
          }
          //如果是更新则直接更新模版
          this.isProcess = true;
          this.updateTemplate(template).then(() => {
            this.$message({
              message: '更新模版成功',
              type: 'success'
            })
            this.$router.back(-1);
          })
        }
      },
      // 保存首页模版设置
      saveSetting() {
        // 如果是新增 则直接调用新增接口
        if (this.isAdd()) {
          const template = {};
          template.name = this.form.templateName;
          template.floors = this.templates;
          this.$refs['form'].validate(valid => {
            if (!this.isProcess && valid) {
              this.isProcess = true;
              this.addTemplate(template).then(() => {
                this.$message({
                  message: '创建模版成功',
                  type: 'success'
                });
                this.isProcess = false;
                this.$router.back(-1);
              })
            }
          });
        } else {
          // 修改模版名称
          const template = {};
          template.name = this.form.templateName;
          template.id = this.initId;
          template.floors = this.templates;
          this.$refs['form'].validate(valid => {
            if (!this.isProcess && valid) {
              this.isProcess = true;
              this.updateTemplate(template).then(() => {
                this.$message({
                  message: '更新模版名称成功',
                  type: 'success'
                });
                this.isProcess = false;
                this.pageSetVisible = false;
              })
            }
          });
        }
      },
      // 保存专题设置
      saveThematicSetting() {
        // 新增专题
        if (this.isAdd()) {
          const template = {};
          template.name = this.thematicForm.name;
          template.title = this.thematicForm.title;
          template.floors = this.templates;
          this.$refs['form'].validate(valid => {
            if (!this.isProcess && valid) {
              this.isProcess = true;
              this.addTemplate(template).then(() => {
                this.$message({
                  message: '创建模版成功',
                  type: 'success'
                });
                this.isProcess = false;
                this.$router.back(-1);
              })
            }
          });
        } else {
          const template = {};
          template.id = this.initId;
          template.name = this.thematicForm.name;
          template.title = this.thematicForm.title;
          template.floors = this.templates;
          this.$refs['form'].validate(valid => {
            if (!this.isProcess && valid) {
              this.isProcess = true;
              this.updateTemplate(template).then(() => {
                this.$message({
                  message: '更新模版名称成功',
                  type: 'success'
                });
                this.isProcess = false;
                this.thematicset = false;
              })
            }
          });
        }
      },
      // 判断是否是新增
      isAdd() {
        return this.addFlag == '0';
      },
      // 准备设置模版
      toSetTemplate() {
        // 来自app首页  小程序首页 h5首页
        if (this.from == '1' || this.from == '3' || this.from == '5') {
          this.pageSetVisible = true;
        } else if (this.from == '2' || this.from == '4' || this.from == '6') {
          // 来自app专题页 小程序专题页 h5专题页
          this.thematicset = true;
        }
      }
    },
    computed: {
      getSpecValues() {
        return function (skuSpecValues) {
          let content = '';

          for (let i = 0; i < skuSpecValues.length; i++) {
            content += skuSpecValues[i].spec.name + ":" + skuSpecValues[i].valueRemark + "<br>";
          }
          return content;
        }
      }
    }
  }
</script>
