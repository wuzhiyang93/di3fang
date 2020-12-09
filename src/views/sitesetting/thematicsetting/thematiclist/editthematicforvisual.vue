<template>
  <div style="position: relative; padding-top: 60px">

    <div class="shopMainPage">

      <!-- 顶部操作栏 -->
      <div class="pageEdit_toolbar">
        <ul class="toolbar_list">
          <li><a href="javascript:;" @click="toEditPageBackground(template.pageBodyData)">页面背景设置</a></li>
          <li><a href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a></li>
          <li><a href="javascript:;" @click="toSaveThematic"><i class="el-icon-s-claim"></i> 保存发布</a></li>
        </ul>
      </div>

      <div class="shortcut">
        <div class="container">
          <ul class="flr">
            <li class="spacer"></li>
            <li>您好，欢迎来到乐商商城</li>
            <li><a href="javascript:;">[请登录]</a> <a class="red" href="javascript:;">[免费注册]</a></li>
            <li class="spacer"></li>
            <li class="shortcut_nav pos_re"><a href="javascript:;">我的订单<s></s></a>
              <div class="shortcut_nav_info" style="width:100px">
                <a href="javascript:;">待处理订单 <span class="red">12</span></a>
                <a href="javascript:;">已完成订单 <span class="red">123</span></a>
                <a href="javascript:;">已取消订单 <span class="red">1</span></a>
                <a href="javascript:;">已退货订单 <span class="red">45</span></a>
              </div>
            </li>
            <li class="spacer"></li>
            <li class="shortcut_nav pos_re"><a href="javascript:;">会员中心<s></s></a>
              <div class="shortcut_nav_info">
                <a href="javascript:;">个人信息</a>
                <a href="javascript:;">账户安全</a>
                <a href="javascript:;">我的优惠券</a>
                <a href="javascript:;">我的收藏</a>
                <a href="javascript:;">我的消息</a>
              </div>
            </li>
            <li class="spacer"></li>
            <li class="bdsharebuttonbox"><a href="javascript:;">帮助中心</a></li>
          </ul>
        </div>
      </div>

      <!-- LOGO搜索 -->
      <div class="container pos_re clearfix" style="z-index:3">
        <div class="logo_main">
          <a class="logo" href="javascript:;" v-if="!!currentTemplate.logo">
            <img :src="currentTemplate.logo.data.image"/>
          </a>
        </div>
        <div class="search_content">
          <ul class="search-triggers">
            <li class="js-sku-search" :class="{selected : searchType === 0}" @click="searchType = 0">宝贝</li>
            <li class="js-store-search" :class="{selected : searchType === 1}" @click="searchType = 1">店铺</li>
          </ul>
          <div class="search_main">
            <el-Input class="search_input" style="background: #fff"/>
            <input class="search_btn" type="button" value="搜索">
          </div>
          <div class="hotwords_link" v-if="!!currentTemplate.hotSearch">
            <a v-for="item in currentTemplate.hotSearch.data" href="javascript:;">{{ item.name }}</a>
          </div>
        </div>
      </div>

      <!-- 导航分类 -->
      <div class="nav_main">
        <div class="container clearfix">
          <div class="categorys shop_categorys">
            <div class="categorys_title">全部商品分类</div>
          </div>

          <!-- 页面导航 -->
          <div class="nav_links" v-if="!!currentTemplate.navData">
            <a v-for="item in currentTemplate.navData.data" href="javascript:;">{{item.name }}</a>
          </div>

          <!-- 导航广告 -->
          <a v-if="currentTemplate.navBannerImgUrl" class="nav_pic" style="float:right; height:40px; margin-top:-5px"
             href="javascript:;">
            <img :src="currentTemplate.navBannerImgUrl.data[0].image" width="190" height="40">
          </a>
        </div>
      </div>

      <!--通栏广告-->
      <!--<div v-if="template.topBanner" class="top_banner shop_top_banner"-->
      <!--:style="{background: template.topBanner.data.backColor}"-->
      <!--style="position: relative"-->
      <!--@mouseenter="template.topBanner.editLayerVisible = true"-->
      <!--@mouseleave="template.topBanner.editLayerVisible = false">-->
      <!--<div class="container">-->
      <!--<a href="javascript:;"><img style="display:block" :src="template.topBanner.data.image" width="1210"-->
      <!--height="110"></a>-->
      <!--</div>-->
      <!--<div v-show="template.topBanner.editLayerVisible" class="edit_layer">-->
      <!--<div class="edit_btn" @click="toEditTopBanner(template.topBanner)">编辑</div>-->
      <!--<div class="edit_btn" @click="deleteTemplateDialog('topBanner')">删除</div>-->
      <!--</div>-->
      <!--</div>-->

      <div class="clearfix" style="background-position: top center; padding-bottom: 40px"
           :style="'background-image:url(' + (template.pageBodyData.data.backImgActive ? template.pageBodyData.data.image : '') + '); background-color:' + (template.pageBodyData.data.backColor) + '; background-repeat:' + (template.pageBodyData.data.backImgRepeat ? 'repeat-y' : 'no-repeat')">

        <div v-if="template.swiperData" style="position: relative; z-index: 0"
             @mouseenter="template.swiperData.editLayerVisible = true"
             @mouseleave="template.swiperData.editLayerVisible = false">
          <swiper class="slideshow_wrapper" style="width: 100%; height: 680px; margin: 0" ref="swiper"
                  :options="swiperOption">
            <swiper-slide v-for="item in template.swiperData.data"
                          style="background-position: center top; background-repeat: no-repeat"
                          :style="'background-image: url(' + item.image"
                          @click.native="toLink(item.link)"></swiper-slide>
            <div slot="pagination" class="swiper-pagination"/>
          </swiper>
          <div v-show="template.swiperData.editLayerVisible" class="edit_layer">
            <div class="edit_btn" @click="toEditSlides(template.swiperData,'图片建议尺寸:1920px * 680px')">编辑</div>
            <div class="edit_btn" @click="deleteTemplateDialog('swiperData')">删除</div>
          </div>
        </div>

        <draggable v-model="template.modules">
          <transition-group>
            <div v-for="(item,index) in template.modules" :key="item.id">

              <div v-if="item.type == '1'" class="container shop_img_box clearfix" style="position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <a href="javascript:;" style="width:100%; position: relative" @mouseenter="item.editLayerVisible = true"
                   @mouseleave="item.editLayerVisible = false">
                  <img width="100%" :src="item.data[0].image">
                  <div v-show="item.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(item,'')">编辑</div>
                  </div>
                </a>
              </div>

              <div v-if="item.type == '2'" class="shop_img_box" style="width: 1245px; position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table shop_table_big" style="border-collapse: collapse; position: relative"
                       border="0"
                       cellspacing="0" cellpadding="0" @mouseenter="item.editLayerVisible = true"
                       @mouseleave="item.editLayerVisible = false">
                  <tbody>
                  <tr>
                    <td v-for="element in item.data" width="50%"><a href="javascript:;" style="width:100%"><img
                      width="100%"
                      :src="element.image"></a>
                    </td>
                  </tr>
                  </tbody>
                  <div v-show="item.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(item,'图片建议尺寸:596px * 578px')">编辑
                    </div>
                  </div>
                </table>
              </div>

              <div v-if="item.type == '3'" class="shop_img_box" style="width: 1238px; position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table shop_table_mid" style="border-collapse: collapse; position: relative"
                       border="0"
                       cellspacing="0" cellpadding="0" @mouseenter="item.editLayerVisible = true"
                       @mouseleave="item.editLayerVisible = false">
                  <tbody>
                  <tr>
                    <td v-for="element in item.data" width="33%"><a href="javascript:;" style="width:100%"><img
                      width="100%"
                      :src="element.image"></a>
                    </td>
                  </tr>
                  </tbody>
                  <div v-show="item.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(item,'图片建议尺寸:394px * 460px')">编辑
                    </div>
                  </div>
                </table>
              </div>

              <div v-if="item.type == '4'" class="shop_img_box" style="width: 1238px; position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table shop_table_mid" style="border-collapse: collapse" border="0" cellspacing="0"
                       cellpadding="0">
                  <tbody>
                  <tr>
                    <td width="443" height="250" style="position: relative"
                        @mouseenter="item.dataOne.editLayerVisible = true"
                        @mouseleave="item.dataOne.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataOne.data[0].image"></a>
                      <div v-show="item.dataOne.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataOne,'图片建议尺寸:447px * 252px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="443" height="250" style="position: relative"
                        @mouseenter="item.dataTwo.editLayerVisible = true"
                        @mouseleave="item.dataTwo.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataTwo.data[0].image"></a>
                      <div v-show="item.dataTwo.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataTwo,'图片建议尺寸:447px * 252px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="290" height="500" rowspan="2" style="position: relative"
                        @mouseenter="item.dataFive.editLayerVisible = true"
                        @mouseleave="item.dataFive.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataFive.data[0].image"></a>
                      <div v-show="item.dataFive.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataFive,'图片建议尺寸:288px * 518px')">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="443" height="250" style="position: relative"
                        @mouseenter="item.dataThree.editLayerVisible = true"
                        @mouseleave="item.dataThree.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataThree.data[0].image"></a>
                      <div v-show="item.dataThree.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataThree,'图片建议尺寸:447px * 252px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="443" height="250" style="position: relative"
                        @mouseenter="item.dataFour.editLayerVisible = true"
                        @mouseleave="item.dataFour.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataFour.data[0].image"></a>
                      <div v-show="item.dataFour.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataFour,'图片建议尺寸:447px * 252px')">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="item.type == '5'" class="shop_img_box" style="position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table" style="border-collapse: collapse" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <td width="900" height="300" colspan="2" style="position: relative"
                        @mouseenter="item.dataOne.editLayerVisible = true"
                        @mouseleave="item.dataOne.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataOne.data[0].image"></a>
                      <div v-show="item.dataOne.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataOne,'图片建议尺寸:905px * 301px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="300" height="300" style="position: relative"
                        @mouseenter="item.dataTwo.editLayerVisible = true"
                        @mouseleave="item.dataTwo.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataTwo.data[0].image"></a>
                      <div v-show="item.dataTwo.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataTwo,'图片建议尺寸:302px * 301px')">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="600" height="300" style="position: relative"
                        @mouseenter="item.dataThree.editLayerVisible = true"
                        @mouseleave="item.dataThree.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataThree.data[0].image"></a>
                      <div v-show="item.dataThree.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataThree,'图片建议尺寸:603px * 301px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="300" height="300" style="position: relative"
                        @mouseenter="item.dataFour.editLayerVisible = true"
                        @mouseleave="item.dataFour.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataFour.data[0].image"></a>
                      <div v-show="item.dataFour.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataFour,'图片建议尺寸:301px * 301px')">
                          编辑
                        </div>
                      </div>
                    </td>
                    <td width="300" height="300" style="position: relative"
                        @mouseenter="item.dataFive.editLayerVisible = true"
                        @mouseleave="item.dataFive.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img width="100%" height="100%"
                                                                                 :src="item.dataFive.data[0].image"></a>
                      <div v-show="item.dataFive.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataFive,'图片建议尺寸:302px * 301px')">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="item.type == '6'" class="shop_img_box" style="position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table" style="border-collapse: collapse" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <td width="1200" height="300" colspan="4" style="position: relative"
                        @mouseenter="item.dataOne.editLayerVisible = true"
                        @mouseleave="item.dataOne.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataOne.data[0].image"></a>
                      <div v-show="item.dataOne.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataOne,'图片建议尺寸:1208px * 302px') ">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <div style="position: relative" @mouseenter="item.dataTwo.editLayerVisible = true"
                         @mouseleave="item.dataTwo.editLayerVisible = false">
                      <td v-for="element in item.dataTwo.data" width="303" height="300">
                        <a href="javascript:;" style="width:100%;height:100%" @click="toLink(element.link)"><img
                          width="100%" height="100%" :src="element.image"></a>
                      </td>
                      <div v-show="item.dataTwo.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataTwo,'图片建议尺寸:301px * 302px')">
                          编辑
                        </div>
                      </div>
                    </div>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="item.type == '7'" class="shop_img_box" style="position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table" style="border-collapse: collapse" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <td width="300" height="600" rowspan="3" style="position: relative"
                        @mouseenter="item.dataOne.editLayerVisible = true"
                        @mouseleave="item.dataOne.editLayerVisible = false">
                      <a href="javascript:;" style="width:100%;height:100%"><img
                        width="100%" height="100%" :src="item.dataOne.data[0].image"></a>
                      <div v-show="item.dataOne.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(item.dataOne,'图片建议尺寸:301px * 604px')">
                          编辑
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="element in item.dataTwo">
                    <div style="position: relative" @mouseenter="element.editLayerVisible = true"
                         @mouseleave="element.editLayerVisible = false">
                      <td v-for="i in element.data" width="300" height="300">
                        <a href="javascript:;" style="width:100%;height:100%"><img width="100%"
                                                                                   height="100%"
                                                                                   :src="i.image"></a>
                      </td>
                      <div v-show="element.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(element,'图片建议尺寸:301px * 301px')">
                          编辑
                        </div>
                      </div>
                    </div>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="item.type == '8'" class="shop_img_box" style="position: relative"
                   @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
                <div v-show="item.moduleToolbarVisible" class="module_toolbar">
                  <div class="module_toolbar_btn">
                    <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i
                      class="el-icon-plus"></i> 添加模块</a>
                    <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i
                      class="icon-trash"></i>
                      删除</a>
                  </div>
                  <div class="module_tip">拖拽模块以挪动位置</div>
                </div>
                <table class="shop_table" style="border-collapse: collapse" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr v-for="element in item.dataOne">
                    <div style="position: relative" @mouseenter="element.editLayerVisible = true"
                         @mouseleave="element.editLayerVisible = false">
                      <td v-for="i in element.data" width="50%">
                        <a href="javascript:;" style="width:100%" @click="i.link"><img width="100%" :src="i.image"></a>
                      </td>
                      <div v-show="element.editLayerVisible" class="edit_layer">
                        <div class="edit_btn" @click="toEditMultiPic(element,'图片建议尺寸:603px * 301px')">
                          编辑
                        </div>
                      </div>
                    </div>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </transition-group>
        </draggable>

      </div>


      <!--帮助服务-->
      <div ref="pageBottom" class="service_main clearfix" v-if="!!currentTemplate.serviceData">
        <dl v-for="item in currentTemplate.serviceData" class="service_box">
          <dt>{{ item.data.name }}</dt>
          <dd v-for="element in item.data.services"><a href="javascript:;">{{ element.name }}</a></dd>
        </dl>
      </div>

      <!--底部帮助-->
      <div v-if="!!currentTemplate.footerData" v-html="currentTemplate.footerData.html" class="container footer_main"></div>

    </div>

    <!-- 通栏广告编辑 -->
    <!--<el-drawer-->
    <!--title="编辑"-->
    <!--size="400px"-->
    <!--:visible.sync="topBannerVisible"-->
    <!--direction="rtl"-->
    <!--&gt;-->
    <!--<div v-if="topBannerVisible" class="img_container">-->
    <!--<el-alert-->
    <!--:title="drawerTipsValue"-->
    <!--type="warning"-->
    <!--:closable="false"-->
    <!--/>-->
    <!--<el-row :gutter="10" style="padding: 10px 5px">-->
    <!--<el-col :span="12">-->
    <!--<div class="imgBox">-->
    <!--<el-upload-->
    <!--class="pageUploader"-->
    <!--:action="uploadApi"-->
    <!--:show-file-list="false"-->
    <!--:headers="headers"-->
    <!--:on-success="(res,file)=>{return uploadSuccess(res,file, editObject)}"-->
    <!--name="image"-->
    <!--accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"-->
    <!--&gt;-->
    <!--<img v-if="editObject.image" :src="editObject.image" class="pageAvatar">-->
    <!--<i v-else class="el-icon-plus avatar-uploader-icon"/>-->
    <!--</el-upload>-->
    <!--<el-button-group class="imgBar">-->
    <!--<el-button class="isLink" :class="{hasLink:editObject.link.actionType!=''}"-->
    <!--@click="toEditLink(editObject.link)"-->
    <!--style="width: 100%" type="primary" plain icon="el-icon-link"/>-->
    <!--</el-button-group>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col>-->
    <!--<div style="line-height: 40px; font-size: 14px">背景色</div>-->
    <!--<el-color-picker v-model="editObject.backColor"></el-color-picker>-->
    <!--<span style="vertical-align: top; line-height: 40px; margin-left: 10px">{{ editObject.backColor }}</span>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</div>-->
    <!--<el-row class="imgFooter" :gutter="10">-->
    <!--<el-col :span="24">-->
    <!--<el-button type="success" @click="saveTopBanner()">保存</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-drawer>-->

    <!-- 页面背景编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="pageBackgroundSetVisible"
      direction="rtl"
    >
      <div v-if="pageBackgroundSetVisible" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="12">
            <div style="line-height: 40px; font-size: 14px">背景图片</div>
            <el-switch
              style="vertical-align: sub"
              v-model="editObject.backImgActive"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="不启用">
            </el-switch>
            <div v-if="editObject.backImgActive" class="imgBox" style="margin-top: 10px">
              <el-upload
                class="pageUploader"
                :action="uploadApi"
                :show-file-list="false"
                :headers="headers"
                :on-success="(res,file)=>{return uploadSuccess(res,file, editObject)}"
                name="image"
                accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
              >
                <img v-if="editObject.image" :src="editObject.image" class="pageAvatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </div>
            <el-switch
              v-if="editObject.backImgActive"
              style="vertical-align: sub"
              v-model="editObject.backImgRepeat"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="平铺"
              inactive-text="不平铺">
            </el-switch>
          </el-col>
          <el-col style="margin-top: 20px">
            <div style="line-height: 40px; font-size: 14px">背景色</div>
            <el-color-picker v-model="editObject.backColor"></el-color-picker>
            <span style="vertical-align: top; line-height: 40px; margin-left: 10px">{{ editObject.backColor }}</span>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="savePageBackground">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 多文字加链接编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="multiWordVisible"
      direction="rtl"
    >
      <div v-if="multiWordVisible" class="img_container">
        <el-row v-for="(item,index) in editObject" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="item.name">
              <div slot="append">
                <el-button icon="el-icon-link" :class="{hasLink:item.link.actionType!=''}"
                           @click="toEditLink(item.link)"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                <el-button icon="el-icon-delete" @click="deleteMultiWordItem(index)"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addMultiWordItem">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveEditMultiWord">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 多图片加链接(可删除)编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="slidesVisible"
      direction="rtl"
    >
      <div v-if="slidesVisible" class="img_container">
        <el-alert
          :title="drawerTipsValue"
          type="warning"
          :closable="false"
        />
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="(item,index) in editObject" :span="12">
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
                <el-button class="isLink" :class="{hasLink:item.link.actionType!=''}"
                           @click="toEditLink(item.link)" type="primary" plain
                           icon="el-icon-link"/>
                <el-button type="danger" plain icon="el-icon-delete" @click="deleteSlides(editObject,index)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="toAddSlides">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveSlides()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 多图片加链接(不可删除)编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="multiPicVisible"
      direction="rtl"
    >
      <div v-if="multiPicVisible" class="img_container">
        <el-alert
          :title="drawerTipsValue"
          type="warning"
          :closable="false"
        />
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="item in editObject" :span="12">
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
                <el-button class="isLink" :class="{hasLink:item.link.actionType!=''}" style="width: 100%" type="primary"
                           plain icon="el-icon-link"
                           @click="toEditLink(item.link)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveMultiPic">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 添加模块 -->
    <el-dialog title="添加模块" :visible.sync="dialogModuleVisible" width="65%">
      <el-radio-group v-model="moduleRadio">
        <!--<el-radio :label="0" style="width: 100%; margin: 0 .5%">-->
          <!--<img src="../../../../assets/Thematic1/shop_top.jpg" width="100%" style="display: block; margin-top: 5px">-->
        <!--</el-radio>-->
        <el-radio :label="1" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module01.jpg" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="2" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module02.jpg" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="3" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module03.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="4" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module04.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="5" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module05.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="6" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module06.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="7" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module07.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="8" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module08.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
        <el-radio :label="9" style="width: 32%; margin: 0 .5%">
          <img src="../../../../assets/Thematic1/add_module09.png" width="100%"
               style="display: block; margin-top: 5px">
        </el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">取消</el-button>
        <el-button type="primary" @click="addModule">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑链接 -->
    <el-dialog title="链接" :visible.sync="dialogLinkVisible" width="80%">
      <el-tabs v-model="tabActiveName" @tab-click="changeTab()" type="card">
        <!-- 当前链接 -->
        <el-tab-pane label="当前链接" name="0" style="min-height: 300px">
          <div v-if="this.linkRef.actionType=='2'" style="line-height: 40px">分类：{{this.linkedCate.name}}</div>
          <div v-if="this.linkRef.actionType=='6'" style="line-height: 40px">功能链接：{{this.linkedFunction}}</div>
          <div v-if="this.linkRef.actionType=='7'" style="line-height: 40px">自定义链接：{{this.linkRef.actionParamId}}</div>
          <el-table
            v-if="this.linkRef.actionType =='1'"
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
            v-if="this.linkRef.actionType =='4'"
            :data="linkedThemtics"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="专题标题" min-width="250">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="是否启用" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isUse == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isUse == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="160">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="更新时间" width="160">
              <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="this.linkRef.actionType =='3'"
            :data="linkedArticle"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="文章标题" min-width="250">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="文章栏目">
              <template slot-scope="scope">{{ scope.row.columnName }}</template>
            </el-table-column>
            <el-table-column label="是否发布" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isRelease == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isRelease == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" width="160">
              <template slot-scope="scope">{{ scope.row.modifyTime?scope.row.modifyTime:'暂无修改信息'}}</template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="this.linkRef.actionType =='5'"
            :data="linkedHelp"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="帮助标题">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="帮助分类">
              <template slot-scope="scope">{{ scope.row.cateName }}</template>
            </el-table-column>
            <el-table-column label="是否显示">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isShow == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isShow == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">{{ scope.row.sort }}</template>
            </el-table-column>
          </el-table>
          <el-button class="filter-item" style="margin-top: 10px" type="primary" size="medium"
                     @click="clearChoosedLink">清除链接
          </el-button>
        </el-tab-pane>
        <!-- 商品 -->
        <el-tab-pane label="商品" name="1">
          <div class="filter-container">
            <el-input v-model="listQuery.name" maxlength="64" placeholder="商品名称" size="medium" style="width: 200px"
                      class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
            </el-button>
          </div>
          <el-table
            style="font-size: 13px"
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
        <!-- 分类 -->
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
        <!-- 文章 -->
        <el-tab-pane label="文章" name="3" style="min-height: 300px">
          <div class="filter-container">
            <el-input placeholder="文章标题" maxlength="32" v-model="articleListQuery.title" size="medium"
                      style="width: 200px;" class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search"
                       @click="handleArticleFilter">搜索
            </el-button>
          </div>

          <el-table
            style="font-size: 13px"
            v-loading="articleListLoading"
            :data="articles"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio class="table_radio" :label="scope.row.id" @change.native="selectArticle(scope.row)"
                          v-model="selectedHelpId">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="文章标题" min-width="250">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="文章栏目">
              <template slot-scope="scope">{{ scope.row.columnName }}</template>
            </el-table-column>
            <el-table-column label="是否发布" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isRelease == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isRelease == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" width="160">
              <template slot-scope="scope">{{ scope.row.modifyTime?scope.row.modifyTime:'暂无修改信息'}}</template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination background @size-change="handleArticleSizeChange"
                           @current-change="handleArticleCurrentChange"
                           :current-page="articleListQuery.pageNum+1" :page-sizes="[10,20,30,50]"
                           :page-size="articleListQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="articleTotal">
            </el-pagination>
          </div>


        </el-tab-pane>
        <!-- 专题 -->
        <el-tab-pane label="专题" name="4" style="min-height: 300px">
          <div class="filter-container">
            <el-input placeholder="专题标题" maxlength="32" size="medium" v-model="thematicListQuery.name"
                      style="width: 200px;" class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search"
                       @click="handleThematicFilter">搜索
            </el-button>
          </div>

          <el-table
            style="font-size: 13px"
            v-loading="thematicListLoading"
            :data="thematics"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio class="table_radio" :label="scope.row.id" @change.native="selectThematic(scope.row)"
                          v-model="selectedThematicId">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="专题标题" min-width="250">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="是否启用" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isUse == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isUse == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="160">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="更新时间" width="160">
              <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
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
        <!-- 帮助 -->
        <el-tab-pane label="帮助" name="5" style="min-height: 300px">
          <div class="filter-container">
            <el-input placeholder="帮助标题" maxlength="32" v-model="helpListQuery.name" size="medium" style="width: 200px;"
                      class="filter-item"/>
            <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleHelpFilter">
              搜索
            </el-button>
          </div>

          <el-table
            style="font-size: 13px"
            v-loading="helpListLoading"
            :data="helps"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio class="table_radio" :label="scope.row.id" @change.native="selectHelp(scope.row)"
                          v-model="selectedHelpId">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="帮助标题">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="帮助分类">
              <template slot-scope="scope">{{ scope.row.cateName }}</template>
            </el-table-column>
            <el-table-column label="是否显示">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isShow == '0'" type="success">是</el-tag>
                <el-tag v-if="scope.row.isShow == '1'" type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">{{ scope.row.sort }}</template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination background @size-change="handleHelpSizeChange"
                           @current-change="handleHelpCurrentChange"
                           :current-page="helpListQuery.pageNum+1" :page-sizes="[10,20,30,50]"
                           :page-size="helpListQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="helpTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 功能链接 -->
        <el-tab-pane label="功能链接" name="6" style="min-height: 300px">
          <el-select class="filter-item" v-model="functionUrl" size="medium" style="width: 100%">
            <el-option label="未选择" value="-1"></el-option>
            <el-option label="领券中心" value="1"></el-option>
            <el-option label="红包中心" value="2"></el-option>
            <el-option label="秒杀" value="3"></el-option>
            <el-option label="预售中心" value="4"></el-option>
            <el-option label="试用中心" value="5"></el-option>
            <el-option label="积分商城" value="6"></el-option>
            <el-option label="众筹项目" value="7"></el-option>
          </el-select>
        </el-tab-pane>
        <!-- 自定义 -->
        <el-tab-pane label="自定义" name="7" style="min-height: 300px">
          <el-input placeholder="请输入自定义链接地址" size="medium" style="width: 100%" class="filter-item"
                    v-model="customizeUrl"/>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLinkVisible = false">取消</el-button>
        <el-button type="primary" @click="saveLink">确定</el-button>
      </div>
    </el-dialog>

    <!-- 保存专题 -->
    <el-dialog title="专题设置" :visible.sync="saveDialogVisible">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="title">
          <span slot="label">专题名称</span>
          <el-input v-model="form.title" maxlength="32"/>
        </el-form-item>
        <el-form-item>
          <span slot="label">是否启用</span>
          <el-switch
            style="vertical-align: sub"
            v-model="form.isUse"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveThematic">保存发布</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped src='../../../../styles/css.css'></style>
<style>
  .shopMainPage { font: 12px/150% Microsoft YaHei, tahoma, arial, Hiragino Sans GB, \\5b8b\4f53, sans-serif; color: #666; -webkit-font-smoothing: antialiased }
  .shopMainPage div,.shopMainPage span,.shopMainPage h1,.shopMainPage h2,.shopMainPage h3,.shopMainPage h4,.shopMainPage h5,.shopMainPage h6,.shopMainPage p,.shopMainPage a,.shopMainPage del,.shopMainPage em,.shopMainPage font,.shopMainPage img,.shopMainPage s,.shopMainPage strong,.shopMainPage i,.shopMainPage dl,.shopMainPage dt,.shopMainPage dd,.shopMainPage ol,.shopMainPage ul,.shopMainPage li,.shopMainPage form,.shopMainPage label,.shopMainPage table,.shopMainPage tbody,.shopMainPage tfoot,.shopMainPage thead,.shopMainPage tr,.shopMainPage th,.shopMainPage td { margin: 0; padding: 0; border: 0; outline: 0 }
  *, *:before, *:after { box-sizing: initial }
  .shopMainPage .swiper-pagination-bullet { width: 10px; height: 10px; opacity: 1; background: rgba(255,255,255,.4); border: 1px solid rgba(0,0,0,.05) }
  .shopMainPage .swiper-pagination-bullet-active { background: #fff; border: 1px solid rgba(255,255,255,.4) }
  .shopMainPage .slidesjs-navigation.swiper-button-disabled { opacity: 0.35; cursor: auto; pointer-events: none }
  .shopMainPage .edit_layer { width: 100%; height: 100%; top: 0; left: 0; position: absolute; border: 2px dashed #f10214; background: rgba(0,0,0,0.4); box-sizing: border-box!important; z-index: 99; display: flex; align-items: center; justify-content: center }
  .shopMainPage .edit_layer .edit_btn { display: inline-block; cursor: pointer; padding: 10px 20px; border: 2px dashed #fff; color: #fff; font-size: 16px; margin: 0 5px }
  .shopMainPage .module_toolbar { position:absolute; z-index: 1000; top:-8px; left:0; width:100%; height:38px }
  .shopMainPage .module_toolbar_btn { position:absolute; top:0; right:0 }
  .shopMainPage .module_toolbar_btn a { display:inline-block; padding: 10px 15px; background:#323641; color:#fff; font-size:14px }
  .shopMainPage .module_toolbar_btn a:last-child { background:#ccc; color:#666 }
  .shopMainPage .module_tip { cursor:all-scroll; position:absolute; z-index:11; top:7px; line-height:30px; width:200px; left:50%; margin-left:-100px; text-align:center; background:#eee; border:solid 1px #ccc; border-bottom:0; border-top-left-radius:4px; border-top-right-radius:4px }
  .shopMainPage .pageEdit_toolbar { width:100%; background:#fff; position:fixed; top:0; z-index:100; border-bottom:solid 1px #eee }
  .shopMainPage .toolbar_list { float:right }
  .shopMainPage .toolbar_list li { float:left; border-right: solid 1px #eee; font-size:18px; cursor:pointer }
  .shopMainPage .toolbar_list li a { padding:20px }
  .shopMainPage .toolbar_list li a:hover { background:#eee }
  .shopMainPage .inputCol .el-input-group__append { overflow: hidden }
  .shopMainPage .footer_main { margin: 20px auto 0 auto; padding-bottom: 40px }
  .shopMainPage .search_main .search_input input { padding: 5px 10px; height: 34px; line-height: 34px; border: 0 }
  .shopMainPage .service_main { width: 1000px; padding: 20px 0; margin: 0 auto }
  .shopMainPage .bor_service { border-top: solid 1px #eee; margin-top: 10px }
  .shopMainPage .service_box { float: left; width: 200px }
  .shopMainPage .service_box dt { font-size: 18px; font-weight: normal }
  .shopMainPage .service_box a { font-size: 13px; display:block; line-height: 30px }
  .shopMainPage .footer_main { margin: 20px auto; border-top: solid 1px #eee; text-align: center; padding: 20px 0 }
  .shopMainPage .footer_text a { margin: 0 8px }
  .shopMainPage .logo img { max-height: 60px }
  .shopMainPage .logo_main { float: left; padding: 20px 0; display: inline-block }
  .shopMainPage .reg_logo h1 { display: block; float: left; height: 43px; line-height: 43px; margin: 10px 0 0 20px; padding-left: 20px; color: #666; font-size: 25px }
  .shopMainPage .logo_main .logo { height: 60px; display: inline-block }
  .shopMainPage .nav_main { width: 100%; border-bottom: 2px solid #e4393c; height: 44px }
  .shopMainPage .categorys { float: left; position: relative; z-index: 10; width: 210px; height: 44px }
  .shopMainPage .categorys_title { width: 190px; height: 44px; padding: 0 10px; font-size: 16px; line-height: 44px; color: #fff; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAUwAAAFMB8eliagAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACPSURBVEiJ7dIhDsJAGAXhr4RD4agilRyjJ8BwGhyysrIKheIIwBEAWwSp2aSBZLchkB31r3kjZou+703JbNL1LPiEefCucMQdy4jddjiK4Be12OKKXYSgGhMk5/8ir3HADauI3WZMUOPiFblOIciR3xI2KHHCA4uI3W44wgYdNjhjHyEoxwTJ+f3IWfB9wRM7+CRoNnuWBwAAAABJRU5ErkJggg==) no-repeat 178px center #e4393c; cursor: pointer }
  .shopMainPage .nav_links { float: left }
  .shopMainPage .nav_links a { height: 44px; padding: 0 20px; text-align: center; font-size: 15px; line-height: 44px }
  .shopMainPage .nav_links a.cur { color: #B1191A }
  .shopMainPage .slideshow_wrapper { position: relative; z-index: 2; width: 100%; height: 465px; overflow: hidden }
  .shopMainPage .slideshow_footbar { z-index: 5; position: absolute; width: 100%; text-align: center; bottom: 0px; left: 0; height: 30px }
  .shopMainPage .slideshow_photo { width: 100%; height: 465px; margin: 0 auto }
  .shopMainPage .slideshow_photo li { width: 100%; height: 465px; text-align: center; position: absolute; left: 0 }
  .shopMainPage .slideshow_photo a { width: 100%; height: 465px; display: inline-block }
  .shopMainPage .slideshow_footbar .slideshow-bt { background: #d2d3d4; margin: 10px 10px 0px 0px; border-radius: 6px; width: 12px; height: 12px; display: inline-block; cursor: pointer }
  .shopMainPage .slideshow_footbar .bt-on { background: #B1191A }
  .shopMainPage .categorys_list { height: 465px; background: #fff; border-top: 2px solid #e4393c; -webkit-box-shadow: -1px 3px 12px -1px rgba(0,0,0,.3); -moz-box-shadow: -1px 3px 12px -1px rgba(0,0,0,.3); box-shadow: -1px 3px 12px -1px rgba(0,0,0,.3) }
  .shopMainPage .categorys_item { height: 31px; padding: 0 10px; line-height: 31px; font-size: 12px; color: #666 }
  .shopMainPage .categorys_item.hover { color: #e4393c; background-color: rgba(39,2,2,.1) }
  .shopMainPage .categorys_item a { color: #666; margin: 0 4px }
  .shopMainPage .categorys_item a:hover { color: #C81623 }
  .shopMainPage .categorys_item.hover > a { color: #e4393c }
  .shopMainPage .categorys_layer { position: absolute; left: 209px; top: 46px; width: 959px; height: 423px; background: #f7f7f7; border: 1px solid #f7f7f7; -webkit-box-shadow: 2px 0 5px -1px rgba(0,0,0,.3); -moz-box-shadow: 2px 0 5px -1px rgba(0,0,0,.3); box-shadow: 2px 0 5px -1px rgba(0,0,0,.3); -webkit-transition: top .25s ease; transition: top .25s ease; overflow: hidden; padding: 20px }
  .shopMainPage .sub_items { float: left; width: 720px; min-height: 438px }
  .shopMainPage .sub_items dl { width: 100%; min-height: 28px; line-height: 16px; padding: 4px 0; float: left }
  .shopMainPage .sub_items dt { position: relative; float: left; width: 70px; font-weight: 700; padding: 2px 30px 0 0; text-align: right; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAALQAAAC0BcX1aowAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAC/SURBVCiRlY+tDsIwGEVvO5LiSD0CiUOARPAEhEeYWpZMEJ5mS4PoG4DDIHgMJAK1BIWAtUk/FMlC6X6uu+Lk5DAiQt/x3gSAQf3keS6jKNLOuW2aprdOprIsn0QkOOeXoigmIYj9Nmmth1VVHRljU+fc6p/Ra4rj+C2E2BDRNWT0THWjtfZMRGNr7TzLskfQ9J0xZkFEMwCHOhCElFJLACcA+yRJdq1NbYDXpJQaAbg3AZ5JSvkCsG4CPFPXfQDU112ykl8ENgAAAABJRU5ErkJggg==) no-repeat 75px center }
  .shopMainPage .sub_items dd { width: 620px; float: left; padding: 2px 0; margin-top: -5px }
  .shopMainPage .sub_items dd a { float: left; padding: 0 8px; margin: 4px 0; line-height: 16px; height: 16px; border-left: 1px solid #e0e0e0; white-space: nowrap }
  .shopMainPage .items_brands { float: right; display: inline; width: 168px; overflow: hidden; margin-bottom: 10px }
  .shopMainPage .items_brands img { float: left; margin: 1px 0 0 1px; height: 35px; cursor: pointer }
  .shopMainPage .item_promotions { float: right; display: inline; width: 168px }
  .shopMainPage .item_promotions img { display: block; margin-bottom: 10px; cursor: pointer }
</style>

<script>
  import {Input} from "element-ui";
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import draggable from 'vuedraggable'
  import {getToken} from '@/utils/token';

  // 功能链接映射关系
  const functionUrlMapping = {
    '1': '领券中心',
    '2': '红包中心',
    '3': '秒杀',
    '4': '预售中心',
    '5': '试用中心',
    '6': '积分商城',
    '7': '众筹项目'
  }


  export default {
    components: {
      Input,
      swiper,
      swiperSlide,
      draggable
    },
    props: ['addFlag', 'id', "queryTemplateSkus", "queryTemplateArticleList", "queryTemplateThematicList", "queryTemplateHelpList", "queryTemplateCategory", "queryTemplateSkuById", "queryTemplateArticleById", "queryTemplateThematicById", "queryTemplateHelpById", "queryTemplate", "queryCurrentTemplate", "addThematic", "updateThematic"],//addFlag 新增或者修改的标记  0 新增 1 修改 id 专题的模版id
    data() {
      return {
        isProcess: false, // 接口是否处理中
        tabActiveName: '0',// 当前选中的tab
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        editObject: {},// 编辑的实体
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        editRef: {},// 当前编辑的引用
        moduleRadio: 0, // 添加模版的时候选择的模版
        dialogLinkVisible: false, // 链接编辑显示隐藏标记
        topBannerVisible: false, // 通栏广告编辑显示隐藏标记
        multiWordVisible: false, // 多文字加链接编辑显示隐藏标记
        slidesVisible: false, //轮播显示隐藏标记
        multiPicVisible: false, //多图片加链接(不可删除)编辑 显示隐藏标记
        pageBackgroundSetVisible: false, // 背景色编辑显示隐藏标记
        dialogModuleVisible: false, // 添加模版显示隐藏标记
        saveDialogVisible: false, // 保存模版标记
        drawerTipsValue: '', // 图片尺寸提示
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }, // 轮播参数
        // template: {
        //   pageBodyData: {
        //     data: {
        //       backColor: '#f6f6f6',
        //       image: 'http://images.lecshop.cn/shopTemplate/shop_bg.jpg',
        //       backImgActive: true,
        //       backImgRepeat: true
        //     }
        //   },
        //   topBanner: {
        //     data: {
        //       image: 'http://images.lecshop.cn/shopTemplate/shop_top.jpg',
        //       backColor: '#f1f1f1',
        //       link: {actionType: '', actionParamId: ''}
        //     },
        //     editLayerVisible: false
        //   },
        //   navData: {
        //     editLayerVisible: false,
        //     data: [
        //       {
        //         name: '家用电器',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         name: '婴儿玩具',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         name: '精品男装',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         name: '电脑办公',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         name: '时尚手机',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         name: '新品女装',
        //         link: {actionType: '', actionParamId: ''}
        //       }
        //     ]
        //   },
        //   swiperData: {
        //     data: [
        //       {
        //         image: 'http://images.lecshop.cn/shopTemplate/slides_01.jpg',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         image: 'http://images.lecshop.cn/shopTemplate/slides_02.jpg',
        //         link: {actionType: '', actionParamId: ''}
        //       },
        //       {
        //         image: 'http://images.lecshop.cn/shopTemplate/slides_03.jpg',
        //         link: {actionType: '', actionParamId: ''}
        //       }
        //     ],
        //     editLayerVisible: false
        //   },
        //   modules: [
        //     {
        //       id: '1',
        //       type: '1',
        //       moduleToolbarVisible: false,
        //       editLayerVisible: false,
        //       data: [
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_24.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         }
        //       ]
        //     },
        //     {
        //       id: '2',
        //       type: '2',
        //       moduleToolbarVisible: false,
        //       editLayerVisible: false,
        //       data: [
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_16.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         },
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_17.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         }
        //       ]
        //     },
        //     {
        //       id: '3',
        //       type: '3',
        //       moduleToolbarVisible: false,
        //       editLayerVisible: false,
        //       data: [
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_25.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         },
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_26.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         },
        //         {
        //           image: 'http://images.lecshop.cn/shopTemplate/shop_27.jpg',
        //           link: {actionType: '', actionParamId: ''}
        //         }
        //       ]
        //     },
        //     {
        //       id: '4',
        //       moduleToolbarVisible: false,
        //       type: '4',
        //       dataOne: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_18.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataTwo: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_19.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataThree: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_20.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataFour: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_21.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataFive: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_22.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       }
        //     },
        //     {
        //       id: '5',
        //       moduleToolbarVisible: false,
        //       type: '5',
        //       dataOne: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_01.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataTwo: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_02.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataThree: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_03.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataFour: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_04.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataFive: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_05.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       }
        //     },
        //     {
        //       id: '6',
        //       moduleToolbarVisible: false,
        //       type: '6',
        //       dataOne: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_06.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataTwo: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_07.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           },
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_08.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           },
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_09.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           },
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_10.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       }
        //     },
        //     {
        //       id: '7',
        //       moduleToolbarVisible: false,
        //       type: '7',
        //       dataOne: {
        //         editLayerVisible: false,
        //         data: [
        //           {
        //             image: 'http://images.lecshop.cn/shopTemplate/shop_11.jpg',
        //             link: {actionType: '', actionParamId: ''}
        //           }
        //         ]
        //       },
        //       dataTwo: [
        //         {
        //           editLayerVisible: false,
        //           data: [
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_02.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_04.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_05.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             }
        //           ]
        //         },
        //         {
        //           editLayerVisible: false,
        //           data: [
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_07.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_08.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_09.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       id: '8',
        //       moduleToolbarVisible: false,
        //       type: '8',
        //       dataOne: [
        //         {
        //           editLayerVisible: false,
        //           data: [
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_12.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_13.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             }
        //           ]
        //         },
        //         {
        //           editLayerVisible: false,
        //           data: [
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_14.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             },
        //             {
        //               image: 'http://images.lecshop.cn/shopTemplate/shop_15.jpg',
        //               link: {actionType: '', actionParamId: ''}
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // },
        template: {},// 模版
        listLoading: true, // 加载中
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: '',
        }, // 查询参数
        skus: null, // 单品数据
        total: null, // 数据总数,
        tempSelectedSku: {},// 临时选中的sku信息
        selectedId: '',// 选中的单品id
        articleListQuery: {
          pageNum: 0,
          pageSize: 10,
          title: '',
        }, // 查询参数
        articleListLoading: true, // 加载中
        articles: null, // 文章数据
        articleTotal: null, // 数据总数,
        selectedArticleId: '',// 选中的文章id
        tempSelectedArticle: {},// 临时选中的文章
        helpListQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        helpListLoading: true, // 加载中
        helps: null, // 帮助数据
        helpTotal: null, // 数据总数,
        selectedHelpId: '',// 选中的帮助id
        tempSelectedHelp: {},// 临时选中的帮助
        selectCateId: 0,//选中的分类id
        allCates: [],// 所有的分类
        firstCates: [],// 所有的一级分类
        thematicListQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        thematicListLoading: true, // 加载中
        thematics: null, // 专题数据
        thematicTotal: null, // 专题数据总数,
        selectedThematicId: '',// 选中的专题id
        tempSelectedThematic: {},// 临时选中的专题
        customizeUrl: '',// 自定义链接地址
        linkRef: {
          actionType: '',
          actionParamId: ''
        },// 编辑链接的引用
        linkedSkus: [],// 链接选中的单品
        linkedThemtics: [],//链接选中的专题
        linkedCate: {},// 链接选中的分类
        linkedHelp: [], // 链接选中的帮助
        linkedArticle: [],// 链接选中的文章
        linkedFunction: '',// 链接选中的功能链接
        functionUrl: '-1', // 当前选中的功能链接
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        currentTemplate: '', // 当前前端正在使用的模版
        searchType: 0, // 搜索类型 商品还是店铺
        form: { // 新增或修改form表单
          id: '', // 专题id
          title: '', // 专题标题
          isUse: '0', // 专题是否启用 0 是 1 否
          desc: '', // 专题内容
          type: '1', // 类型 1:可视化模板 0:富文本
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入专题标题',
              trigger: 'blur'
            }
          ],
        }, // 校验规则
      }
    },
    created() {
      // 如果初始化模版id是0的话 则说明是空白模版不需要 查询
      if (this.id != 0) {
        this.queryInitTemplate();
      }
      this.queryCurrentTemplateDetail();
      this.queryAllCates();
    },
    methods: {
      //查询初始化模版
      queryInitTemplate() {
        this.queryTemplate(this.id).then(res => {
          // 新增
          if (this.isAdd()) {
            if (res && res.initJson) {
              this.template = JSON.parse(res.initJson);
            }
          } else {
            if (res && res.flag) {
              this.form.id = res.data.id;
              this.form.title = res.data.title;
              this.form.isUse = res.data.isUse;
              if (res.data.desc) {
                this.template = JSON.parse(res.data.desc);
              }
            }
          }
        });
      },
      // 查询当前使用模版
      queryCurrentTemplateDetail() {
        this.queryCurrentTemplate().then(res => {
          if (res && res.flag) {
            this.currentTemplate = JSON.parse(res.data.releaseTemplate);
          }
        })
      },
      // 编辑背景颜色
      toEditPageBackground(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.pageBackgroundSetVisible = true;
      },
      // 保存背景颜色
      savePageBackground() {
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.pageBackgroundSetVisible = false;
      },
      // // 编辑通栏广告
      // toEditTopBanner(item) {
      //   this.editObject = JSON.parse(JSON.stringify(item.data));
      //   this.editRef = item;
      //   this.topBannerVisible = true;
      //   this.drawerTipsValue = '图片建议尺寸:1190px * 80px'
      // },
      // // 保存通栏广告
      // saveTopBanner() {
      //   this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
      //   this.topBannerVisible = false;
      // },
      // 多文字加链接编辑
      toEditMultiWord(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.multiWordVisible = true;
      },
      // 添加多文字加链接中的一项
      addMultiWordItem() {
        this.editObject.push({
          name: '',
          link: {actionType: '', actionParamId: ''}
        });
      },
      // 删除多文字加链接中的一项
      deleteMultiWordItem(index) {
        if (!this.editObject || this.editObject.length < 2) {
          return;
        }
        this.editObject.splice(index, 1);
      },
      // 保存多文字加链接
      saveEditMultiWord() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.multiWordVisible = false;
      },
      // 编辑轮播
      toEditSlides(item, tip) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.slidesVisible = true;
        this.drawerTipsValue = tip;
      },
      // 保存轮播
      saveSlides() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.image)) {
          this.showError('存在未上传图片的项目，请给每项都上传图片！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.slidesVisible = false;
      },
      // 删除轮播
      deleteSlides(items, index) {
        if (!items || items.length < 2) {
          return;
        }
        items.splice(index, 1);
      },
      // 添加轮播
      toAddSlides() {
        this.editObject.push({
          image: '',
          link: {actionType: '', actionParamId: ''}
        });
      },
      // 编辑多图片加链接(不可删除)编辑
      toEditMultiPic(item, tip) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.multiPicVisible = true;
        this.drawerTipsValue = tip
      },
      // 保存多图片加链接(不可删除)编辑
      saveMultiPic() {
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.multiPicVisible = false;
      },
      // 图片上传成功回掉
      uploadSuccess(res, file, item) {
        item.image = res;
      },
      // 删除模块（场景是模块在template是数组）
      deleteModulesDialog(index) {
        this.$confirm('您确定要删除此模块吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.template.modules.splice(index, 1)
        })
      },
      // 删除模块（场景是模块在template是属性）
      deleteTemplateDialog(item) {
        this.$confirm('您确定要删除此模块吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.template[item] = null;
        })
      },
      // 添加模块
      addModule() {
        switch (this.moduleRadio) {
          // case 0:
          //   // 模版1
          //   if (this.template.topBanner) {
          //     this.$message({
          //       type: 'error',
          //       message: '已存在该模块,该模块只能添加一个!'
          //     });
          //   } else {
          //     this.template.topBanner = {
          //       data: {
          //         image: 'http://images.lecshop.cn/shopTemplate/shop_top.jpg',
          //         backColor: '#f1f1f1',
          //         link: {actionType: '', actionParamId: ''}
          //       },
          //       editLayerVisible: false
          //     }
          //     this.dialogModuleVisible = false;
          //   }
          //   break;
          case 1:
            // 模版2
            if (this.template.swiperData) {
              this.$message({
                type: 'error',
                message: '已存在该模块,该模块只能添加一个!'
              });
            } else {
              this.template.swiperData = {
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/slides_01.jpg',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/slides_02.jpg',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/slides_03.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ],
                editLayerVisible: false
              }
              this.dialogModuleVisible = false;
            }
            break;
          case 2:
            // 模版3
            this.template.modules.push({
              id: Date.parse(new Date()),
              type: '1',
              moduleToolbarVisible: false,
              editLayerVisible: false,
              data: [
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_24.jpg',
                  link: {actionType: '', actionParamId: ''}
                }
              ]
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 3:
            this.template.modules.push({
              id: Date.parse(new Date()),
              type: '2',
              moduleToolbarVisible: false,
              editLayerVisible: false,
              data: [
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_16.jpg',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_17.jpg',
                  link: {actionType: '', actionParamId: ''}
                }
              ]
            },)
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 4:
            this.template.modules.push({
              id: Date.parse(new Date()),
              type: '3',
              moduleToolbarVisible: false,
              editLayerVisible: false,
              data: [
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_25.jpg',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_26.jpg',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/shopTemplate/shop_27.jpg',
                  link: {actionType: '', actionParamId: ''}
                }
              ]
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 5:
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '4',
              dataOne: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_18.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataTwo: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_19.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataThree: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_20.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataFour: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_21.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataFive: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_22.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              }
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 6:
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '5',
              dataOne: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_01.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataTwo: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_02.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataThree: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_03.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataFour: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_04.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataFive: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_05.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              }
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 7:
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '6',
              dataOne: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_06.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataTwo: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_07.jpg',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_08.jpg',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_09.jpg',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_10.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              }
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 8:
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '7',
              dataOne: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/shopTemplate/shop_11.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }
                ]
              },
              dataTwo: [
                {
                  editLayerVisible: false,
                  data: [
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_02.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_04.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_05.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }
                  ]
                },
                {
                  editLayerVisible: false,
                  data: [
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_07.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_08.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_09.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }
                  ]
                }
              ]
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case 9:
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '8',
              dataOne: [
                {
                  editLayerVisible: false,
                  data: [
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_12.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_13.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }
                  ]
                },
                {
                  editLayerVisible: false,
                  data: [
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_14.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/shopTemplate/shop_15.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }
                  ]
                }
              ]
            })
            this.dialogModuleVisible = false;
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
        }
      },
      toLink(link) {
        this.$router.push({path: link})
      },
      // 改变tab
      changeTab() {
        // 选中的是商品查询商品信息
        if (this.tabActiveName == '1') {
          this.querySkus();
        } else if (this.tabActiveName == '3') {
          //选中的是文章查询
          this.queryArticleList();
        } else if (this.tabActiveName == '4') {
          // 专题查询
          this.queryThematicList();
        } else if (this.tabActiveName == '5') {
          // 帮助查询
          this.queryHelpList();
        }
      },
      // 查询单品
      querySkus() {
        this.listLoading = true
        this.queryTemplateSkus(this.listQuery).then(response => {
          this.skus = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      // 选中单品
      selectSku(sku) {
        this.selectedId = sku.id;
        this.tempSelectedSku = sku;
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
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySkus();
      },
      // 查询文章
      queryArticleList() {
        this.articleListLoading = true
        this.queryTemplateArticleList(this.articleListQuery).then(response => {
          this.articles = response.data;
          this.articleTotal = response.recordsTotal;
          this.articleListLoading = false
        });
      },
      // 过滤查询
      handleArticleFilter() {
        this.articleListQuery.pageNum = 0;
        this.queryArticleList();
      },
      handleArticleSizeChange(val) {
        this.articleListQuery.pageNum = 0;
        this.articleListQuery.pageSize = val;
        this.queryArticleList();
      },
      handleArticleCurrentChange(val) {
        this.articleListQuery.pageNum = val - 1;
        this.queryArticleList();
      },
      // 选中文章
      selectArticle(article) {
        this.selectedArticleId = article.id;
        this.tempSelectedArticle = article;
      },
      // 查询帮助
      queryHelpList() {
        this.helpListLoading = true
        this.queryTemplateHelpList(this.helpListQuery).then(response => {
          this.helps = response.data;
          this.helpTotal = response.recordsTotal;
          this.helpListLoading = false
        });
      },
      // 过滤查询
      handleHelpFilter() {
        this.helpListQuery.pageNum = 0;
        this.queryHelpList();
      },
      handleHelpSizeChange(val) {
        this.helpListQuery.pageNum = 0;
        this.helpListQuery.pageSize = val;
        this.queryHelpList();
      },
      handleHelpCurrentChange(val) {
        this.helpListQuery.pageNum = val - 1;
        this.queryHelpList();
      },
      // 选中帮助
      selectHelp(help) {
        this.selectedHelpId = help.id;
        this.tempSelectedHelp = help;
      },

      // 查询专题
      queryThematicList() {
        this.thematicListLoading = true
        this.queryTemplateThematicList(this.thematicListQuery).then(response => {
          this.thematics = response.data;
          this.thematicTotal = response.recordsTotal;
          this.thematicListLoading = false
        });
      },
      // 过滤查询
      handleThematicFilter() {
        this.thematicListQuery.pageNum = 0;
        this.queryThematicList();
      },
      handleThematicSizeChange(val) {
        this.thematicListQuery.pageNum = 0;
        this.thematicListQuery.pageSize = val;
        this.queryThematicList();
      },
      handleThematicCurrentChange(val) {
        this.thematicListQuery.pageNum = val - 1;
        this.queryThematicList();
      },
      // 选中专题
      selectThematic(thematic) {
        this.selectedThematicId = thematic.id;
        this.tempSelectedThematic = thematic;
      },

      //选择boss分类
      checkCate(even) {
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setChecked(even.id, true, false)
        this.selectCateId = even.id;
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
      // 查询所有分类
      queryAllCates() {
        this.queryTemplateCategory().then(res => {
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
      // 编辑链接
      toEditLink(link) {
        this.clearLink();
        this.tabActiveName = '0';
        this.linkRef = link;
        this.dialogLinkVisible = true
        this.linkedSkus = []
        this.linkedThemtics = []
        this.linkedCate = {}
        this.linkedHelp = []
        this.linkedArticle = []
        this.linkedFunction = ''

        // 查询单品信息
        if (link.actionType == '1') {
          this.queryTemplateSkuById(link.actionParamId).then(res => {
            this.linkedSkus.push(res);
          })
        } else if (link.actionType == '2') {
          // 查询分类信息
          let cate = this.allCates.filter(cate => cate.id == link.actionParamId)[0];
          if (cate) {
            this.linkedCate.name = cate.name;
          }
        } else if (link.actionType == '3') {
          // 查询文章信息
          this.queryTemplateArticleById(link.actionParamId).then(res => {
            this.linkedArticle.push(res);
          })
        } else if (link.actionType == '4') {
          // 查询专题
          this.queryTemplateThematicById(link.actionParamId).then(res => {
            this.linkedThemtics.push(res);
          })
        } else if (link.actionType == '5') {
          //  查询帮助
          this.queryTemplateHelpById(link.actionParamId).then(res => {
            this.linkedHelp.push(res);
          })
        } else if (link.actionType == '6') {
          // 功能链接
          this.linkedFunction = functionUrlMapping[link.actionParamId];
        }

      },
      // 清除选中的链接
      clearLink() {
        this.tempSelectedSku = {};
        this.selectedId = '';
        this.selectCateId = 0;
        this.tempSelectedThematic = {};
        this.selectedThematicId = '';
        this.selectedArticleId = '';
        this.tempSelectedArticle = {};
        this.selectedHelpId = '';
        this.tempSelectedHelp = {};
        this.functionUrl = '-1';
        this.customizeUrl = '';
      },
      // 保存链接
      saveLink() {

        // 选中的是自定义链接，不能为空
        if (this.tabActiveName == '7' && !this.customizeUrl) {
          this.showError('自定义链接不能为空！');
          return;
        }
        // 当前选中的是商品
        if (this.selectedId != '') {
          this.linkRef.actionType = '1';
          this.linkRef.actionParamId = this.selectedId;
        } else if (this.selectCateId != 0) {
          // 当前选中的是分类
          this.linkRef.actionType = '2';
          this.linkRef.actionParamId = this.selectCateId;
        } else if (this.selectedArticleId != '') {
          // 当前选中的是文章
          this.linkRef.actionType = '3';
          this.linkRef.actionParamId = this.selectedArticleId;
        } else if (this.selectedThematicId != '') {
          // 当前选中的是专题
          this.linkRef.actionType = '4';
          this.linkRef.actionParamId = this.selectedThematicId;
        } else if (this.selectedHelpId != '') {
          // 当前选中的是帮助
          this.linkRef.actionType = '5';
          this.linkRef.actionParamId = this.selectedHelpId;
        } else if (this.functionUrl != '-1') {
          // 选择的是功能链接
          this.linkRef.actionType = '6';
          this.linkRef.actionParamId = this.functionUrl;
        } else if (this.customizeUrl != '') {
          // 选择的是自定义链接
          this.linkRef.actionType = '7';
          this.linkRef.actionParamId = this.customizeUrl;
        }

        this.dialogLinkVisible = false
        this.$refs.tree.setCheckedKeys([]);
      },
      // 清除已经选中的链接
      clearChoosedLink() {
        this.linkRef.actionType = '';
        this.linkRef.actionParamId = '';
      },
      // 判断是否是新增
      isAdd() {
        return this.addFlag == '0';
      },
      // 准备保存专题
      toSaveThematic() {
        this.saveDialogVisible = true;
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 保存专题
      saveThematic() {

        if (!!this.template) {
          this.form.desc = JSON.stringify(this.template);
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {

            this.isProcess = true;

            if (this.isAdd()) {

              this.addThematic(this.form).then(res => {
                this.isProcess = false;
                if (res == 1) {
                  this.$message({
                    type: 'success',
                    message: '新增专题成功'
                  });
                  this.$router.push({path: '/sitesetting/thematic/thematicsetting'})
                } else {
                  this.showError('新增专题失败，请稍后重试！');
                }
              })

            } else {

              this.updateThematic(this.form).then(response => {
                this.isProcess = false;
                if (response == 1) {
                  this.$message({
                    type: 'success',
                    message: '更新专题成功'
                  });
                  this.$router.push({path: '/sitesetting/thematic/thematicsetting'})
                } else {
                  this.showError('更新专题失败，请稍后重试！');
                }
              })
            }
          }
        })

      },
      showError(errorMessage) {
        this.$message({
          type: 'error',
          message: errorMessage
        })
      },
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
