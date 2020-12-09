<template>
  <div ref="pageTop" style="position: relative; padding-top: 60px">

    <div class="mainPage">

    <!-- 顶部操作栏 -->
    <div class="pageEdit_toolbar">
      <ul class="toolbar_list">
        <li><a href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a></li>
        <li><a href="javascript:;" @click="updateTemplate"><i class="el-icon-s-claim"></i> 保存</a></li>
        <li><a href="javascript:;" @click="publishPageData"><i class="el-icon-upload"></i> 发布</a></li>
      </ul>
    </div>

    <!-- 顶部广告 -->
    <div v-if="template.topBanner" class="top_banner" style="height:80px; position: relative"
         :style="{background: template.topBanner.data.backColor}"
         @mouseenter="template.topBanner.editLayerVisible = true"
         @mouseleave="template.topBanner.editLayerVisible = false">
      <div class="container">
        <a href="javascript:;">
          <img style="display:block" :src="template.topBanner.data.images[0].image" width="1190" height="80"/>
        </a>
      </div>
      <div v-show="template.topBanner.editLayerVisible" class="edit_layer">
        <div class="edit_btn" @click="toEditTopBanner(template.topBanner)">编辑</div>
        <div class="edit_btn" @click="deleteTemplateDialog('topBanner')">删除</div>
      </div>
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
              <a href="javascript:;">待处理订单 </a>
              <a href="javascript:;">已完成订单 </a>
              <a href="javascript:;">已取消订单 </a>
              <a href="javascript:;">已退货订单 </a>
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
      <div class="logo_main" @mouseenter="template.logo.editLayerVisible = true"
           @mouseleave="template.logo.editLayerVisible = false">
        <a class="logo" href="javascript:;"><img :src="template.logo.data.image"/></a>
        <div v-show="template.logo.editLayerVisible" class="edit_layer">
          <div class="edit_btn" @click="toEditLogoImg(template.logo,'图片建议尺寸:150px * 60px')">编辑</div>
        </div>
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
        <div class="hotwords_link" style="position: relative" @mouseenter="template.hotSearch.editLayerVisible = true"
             @mouseleave="template.hotSearch.editLayerVisible = false">
          <a v-for="item in template.hotSearch.data" href="javascript:;">{{ item.name }}</a>
          <div v-show="template.hotSearch.editLayerVisible" class="edit_layer">
            <div class="edit_btn" style="padding: 0 20px" @click="toEditHotSearch(template.hotSearch)">编辑</div>
          </div>
        </div>
      </div>

      <div v-if="template.qrCode" class="qrcode" style="position: relative"
           @mouseenter="template.qrCode.editLayerVisible = true"
           @mouseleave="template.qrCode.editLayerVisible = false">
        <img :src="template.qrCode.data.image" width="60" height="60"/>
        <div v-show="template.qrCode.editLayerVisible" class="edit_layer" style="flex-flow: column">
          <div class="edit_btn" style="padding: 2px 5px; margin: 2px 0"
               @click="toEditLogoImg(template.qrCode,'图片建议尺寸:60px * 60px')">编辑
          </div>
          <div class="edit_btn" style="padding: 2px 5px; margin: 2px 0" @click="deleteTemplateDialog('qrCode')">
            删除
          </div>
        </div>
      </div>
    </div>

    <!-- 导航分类 -->
    <div class="nav_main">
      <div class="container clearfix">
        <div class="categorys" @mouseenter="template.category.editLayerVisible = true"
             @mouseleave="template.category.editLayerVisible= false">
          <div class="categorys_list">
            <div v-if="index < 15" v-for="(item,index) in template.category.first" class="categorys_item"
                 :class="{hover : item.secondVisible}" @mouseenter="item.secondVisible = true"
                 @mouseleave="item.secondVisible = false">
              <!-- 一级分类 -->
              <a href="javascript:;" style="display: block" @mouseenter="item.editLayerVisible = true"
                 @mouseleave="item.editLayerVisible = false">{{ item.data.name }}
                <div v-show="item.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditFCate(item)">编辑
                  </div>
                  <div class="edit_btn" @click="deleteFCate(index)"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important">
                    删除
                  </div>
                </div>
              </a>
              <!-- 二级分类 -->
              <div v-show="item.secondVisible" class="categorys_layer">
                <div class="sub_items">
                  <!-- 三级分类 -->
                  <dl v-for="(element,index) in item.data.second" style="position: relative"
                      @mouseenter="element.editLayerVisible = true" @mouseleave="element.editLayerVisible = false">
                    <dt><a href="javascript:;">{{ element.data.name }}</a></dt>
                    <dd><a v-for="i in element.data.third" href="javascript:;">{{ i.name }}</a></dd>
                    <div v-show="element.editLayerVisible" class="edit_layer">
                      <div class="edit_btn"
                           style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                           @click="toEditSCate(element)">编辑
                      </div>
                      <div class="edit_btn" @click="()=>item.data.second.splice(index,1)"
                           style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important">
                        删除
                      </div>
                    </div>
                  </dl>
                </div>
                <!-- 品牌广告 -->
                <div class="items_brands" style="position: relative"
                     @mouseenter="item.brands.editLayerVisible = true"
                     @mouseleave="item.brands.editLayerVisible = false">
                  <a href="javascript:;" v-for="element in item.brands.data"><img :src="element.image" width="83"
                                                                                  height="35"/></a>
                  <div v-show="item.brands.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditSlides(item.brands, '图片建议尺寸:83px * 35px')">编辑
                    </div>
                  </div>
                </div>
                <!-- 广告位 -->
                <div class="item_promotions" style="position: relative"
                     @mouseenter="item.advert.editLayerVisible = true"
                     @mouseleave="item.advert.editLayerVisible = false">
                  <a href="javascript:;" v-for="element in item.advert.data"><img :src="element.image" width="168"
                                                                                  height="134"/></a>
                  <div v-show="item.advert.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditSlides(item.advert,'图片建议尺寸:168px * 134px')">编辑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="template.category.editLayerVisible" class="add_one_bar"><a href="javascript:;"
                                                                                  @click="firstCateLinkVisible = true"><i
            class="el-icon-plus"></i> 添加一级分类</a></div>
        </div>


        <!-- 页面导航 -->
        <div class="nav_links" style="position: relative" @mouseenter="template.navData.editLayerVisible = true"
             @mouseleave="template.navData.editLayerVisible = false">
          <a v-for="item in template.navData.data" href="javascript:;">{{ item.name }}</a>
          <div v-show="template.navData.editLayerVisible" class="edit_layer">
            <div class="edit_btn" style="padding: 5px 20px" @click="toEditMultiWord(template.navData)">编辑</div>
          </div>
        </div>


        <!-- 导航广告 -->
        <a v-if="template.navBannerImgUrl" class="nav_pic"
           style="float:right; height:40px; margin-top:-5px; position: relative" href="javascript:;"
           @mouseenter="template.navBannerImgUrl.editLayerVisible = true"
           @mouseleave="template.navBannerImgUrl.editLayerVisible = false">
          <img :src="template.navBannerImgUrl.data[0].image" width="190" height="40">
          <div v-show="template.navBannerImgUrl.editLayerVisible" class="edit_layer">
            <div class="edit_btn" style="padding: 5px 20px"
                 @click="toEditMultiPic(template.navBannerImgUrl,'图片建议尺寸:190px * 40px')">编辑
            </div>
            <div class="edit_btn" style="padding: 5px 20px" @click="deleteTemplateDialog('navBannerImgUrl')">删除</div>
          </div>
        </a>
      </div>
    </div>

    <!-- 轮播广告&登录状态&新闻 -->
    <div class="container clearfix">
      <div class="fll">
        <!-- 轮播广告 -->
        <div class="slideshow_wrapper" @mouseenter="template.swiperData.editLayerVisible = true"
             @mouseleave="template.swiperData.editLayerVisible = false">
          <swiper ref="swiper" :options="swiperOption">
            <swiper-slide v-for="item in template.swiperData.data">
              <img :src="item.image" style="width: 790px; height: 340px; display: block">
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination"/>
          </swiper>
          <div v-show="template.swiperData.editLayerVisible" class="edit_layer">
            <div class="edit_btn" style="padding: 5px 20px"
                 @click="toEditSlides(template.swiperData,'图片建议尺寸:790px * 340px')">编辑
            </div>
          </div>
        </div>
        <!-- 轮播底部广告 -->
        <div class="slideshow_bottom clearfix" style="position: relative"
             @mouseenter="template.swiperBottomBanner.editLayerVisible = true"
             @mouseleave="template.swiperBottomBanner.editLayerVisible  = false">
          <a v-for="(item,index) in template.swiperBottomBanner.data" href="javascript:;"
             style="display: block; float: left"
             :style="{margin: index === 0 ? '0' : '0 0 0 10px'}" @click="toLink(item.link)"><img :src="item.image"
                                                                                                 width="390"
                                                                                                 height="130"></a>
          <div v-show="template.swiperBottomBanner.editLayerVisible" class="edit_layer">
            <div class="edit_btn" style="padding: 5px 20px"
                 @click="toEditMultiPic(template.swiperBottomBanner,'图片建议尺寸:390px * 130px')">编辑
            </div>
          </div>
        </div>
      </div>
      <div class="fll">
        <!-- 登录状态 -->
        <div class="user_info">
          <div class="user_img">
            <a href="javascript:;">
              <span class="hover"></span>
            </a>
          </div>
          <p class="info_n">Hi,你好</p>
          <div class="user_btn"><a href="javascript:;" class="login">登录</a><a href="javascript:;"
                                                                              class="register">新人有礼</a></div>
        </div>
        <!-- 新闻列表 -->
        <div class="news_box">
          <div class="news_title" style="position: relative"
               @mouseenter="template.newsData.newsTitle.editLayerVisible = true"
               @mouseleave="template.newsData.newsTitle.editLayerVisible =  false">
            <h4 class="fll">{{ template.newsData.newsTitle.data.name }}</h4>
            <a class="flr" href="javascript:;">更多</a>
            <div v-show="template.newsData.newsTitle.editLayerVisible " class="edit_layer">
              <div class="edit_btn"
                   style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                   @click="toEditword(template.newsData.newsTitle)">编辑
              </div>
            </div>
          </div>
          <div class="news_list" style="position: relative"
               @mouseenter="template.newsData.content.editLayerVisible = true"
               @mouseleave="template.newsData.content.editLayerVisible =  false">
            <a v-if="index < 9" v-for="(item,index) in template.newsData.content.data" href="javascript:;"
               @click="toLink(item.link)">{{ item.name }}</a>
            <div v-show="template.newsData.content.editLayerVisible" class="edit_layer">
              <div class="edit_btn" style="padding: 5px 20px" @click="toEditMultiWord(template.newsData.content)">编辑
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="pageBody" ref="pageBody"></div><!-- 楼层导航定位坐标 -->

    <draggable v-model="template.modules">
      <transition-group>
        <div v-for="(item,index) in template.modules" :key="item.id">

          <!-- 商城特惠 -->
          <div v-if="item.type === '1'" class="container todays_recommend clearfix" style="position: relative"
               @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div class="box_hd clearfix">
              <i class="box_hd_dec"></i>
              <div class="clearfix fll" style="width: 50%; position: relative; height: 55px"
                   @mouseenter="item.leftTitle.editLayerVisible = true"
                   @mouseleave="item.leftTitle.editLayerVisible = false">
                <h3 class="box_tit">{{item.leftTitle.data.name}}</h3>
                <div v-show="item.leftTitle.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditword(item.leftTitle)">编辑
                  </div>
                </div>
              </div>
              <div class="clearfix flr" style="width: 50%; position: relative; height: 55px"
                   @mouseenter="item.rightTitle.editLayerVisible = true"
                   @mouseleave="item.rightTitle.editLayerVisible = false">
                <a href="Javascript:;" class="box_subtit">{{item.rightTitle.data.name}}<i
                  class="box_subtit_arrow"></i></a>
                <div v-show="item.rightTitle.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditSingleWordLink(item.rightTitle)">编辑
                  </div>
                </div>
              </div>
            </div>
            <div class="box_bd">
              <div class="recommend_slides"
                   @mouseenter="item.moduleToolbarVisible = true, item.swiperData.editLayerVisible = true"
                   @mouseleave="item.moduleToolbarVisible = false, item.swiperData.editLayerVisible  = false">
                <swiper>
                  <swiper-slide v-for="element in item.swiperData.data" class="sk_item"
                                @click="toLink(element.link)">
                    <div class="sk_item_pic">
                      <a href="Javascript:;" class="sk_item_pic_lk">
                        <img :src="element.image" class="sk_item_img">
                        <p class="sk_item_name">{{ element.name }}</p>
                      </a>
                      <span class="sk_item_shadow"></span>
                    </div>
                    <p class="sk_item_price"><span class="mod_price"><i>¥</i><span>{{ element.price }}</span></span></p>
                  </swiper-slide>
                </swiper>
                <div v-show="item.swiperData.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditGoods(item.swiperData,'建议配置个数为5的倍数,图片建议尺寸:130px*130px')">编辑
                  </div>
                </div>
              </div>
              <a class="sk_special" style="position: relative" href="Javascript:;"
                 @mouseenter="item.todaysBanner.editLayerVisible = true"
                 @mouseleave="item.todaysBanner.editLayerVisible = false">
                <img :src="item.todaysBanner.data[0].image" width="180" height="225"/>
                <div v-show="item.todaysBanner.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       @click="toEditMultiPic(item.todaysBanner,'图片建议尺寸:180px * 225px')">编辑
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- 专题排行榜 -->
          <div v-if="item.type === '2'" class="container clearfix"
               style="margin: 20px auto 30px auto; position: relative" @mouseenter="item.moduleToolbarVisible = true"
               @mouseleave="item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div class="fbt_col find">
              <div class="box_hd clearfix">
                <i class="box_hd_arrow"></i>
                <i class="box_hd_dec"></i>
                <div class="clearfix fll" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicOne.leftTitle.editLayerVisible = true"
                     @mouseleave="item.thematicOne.leftTitle.editLayerVisible = false">
                  <h3 class="box_tit">{{ item.thematicOne.leftTitle.data.name }}</h3>
                  <div v-show="item.thematicOne.leftTitle.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditword(item.thematicOne.leftTitle)">编辑
                    </div>
                  </div>
                </div>
                <div class="clearfix flr" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicOne.rightTitle.editLayerVisible = true"
                     @mouseleave="item.thematicOne.rightTitle.editLayerVisible = false">
                  <a href="javascript:;" class="box_subtit" @click="toLink()">{{item.thematicOne.rightTitle.data.name }}<i
                    class="box_subtit_arrow"></i></a>
                  <div v-show="item.thematicOne.rightTitle.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditSingleWordLink(item.thematicOne.rightTitle)">编辑
                    </div>
                  </div>
                </div>
              </div>
              <div class="box_bd clearfix" style="position: relative"
                   @mouseenter="item.thematicOne.spus.editLayerVisible = true"
                   @mouseleave="item.thematicOne.spus.editLayerVisible = false">
                <ul class="find_list clearfix">
                  <li v-for="element in item.thematicOne.spus.data" class="find_item">
                    <a href="javascript:;" class="find_item_lk" @click="toLink(element.link)">
                      <p class="find_item_name">{{ element.name }}</p>
                      <img :src="element.image" class="find_item_img">
                    </a>
                  </li>
                </ul>
                <div v-show="item.thematicOne.spus.editLayerVisible" class="edit_layer">
                  <div class="edit_btn" @click="toEditPicWordLink(item.thematicOne.spus)">编辑</div>
                </div>
              </div>
            </div>
            <div class="fbt_col sup">
              <div class="box_hd clearfix">
                <i class="box_hd_arrow"></i>
                <i class="box_hd_dec"></i>
                <div class="clearfix fll" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicTwo.leftTitle.editLayerVisible = true"
                     @mouseleave="item.thematicTwo.leftTitle.editLayerVisible = false">
                  <h3 class="box_tit">{{ item.thematicTwo.leftTitle.data.name }}</h3>
                  <div v-show="item.thematicTwo.leftTitle.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditword(item.thematicTwo.leftTitle)">编辑
                    </div>
                  </div>
                </div>
                <div class="clearfix flr" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicTwo.rightTitle.editLayerVisible = true"
                     @mouseleave="item.thematicTwo.rightTitle.editLayerVisible  = false">
                  <a href="javascript:;" class="box_subtit">{{item.thematicTwo.rightTitle.data.name }}
                    <i class="box_subtit_arrow"></i></a>
                  <div v-show="item.thematicTwo.rightTitle.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditSingleWordLink(item.thematicTwo.rightTitle)">编辑
                    </div>
                  </div>
                </div>
              </div>
              <div class="sup_page" style="position: relative"
                   @mouseenter="item.thematicTwo.spus.editLayerVisible = true"
                   @mouseleave="item.thematicTwo.spus.editLayerVisible = false">
                <div v-for="(element,index) in item.thematicTwo.spus.data">
                  <div class="edit_item">
                    <a class="sup_page_lk" href="javascript:;" @click="toLink()">
                      <p class="sup_desc">{{ element.name }}</p>
                      <div class="sup_img_box">
                        <img v-for="i in element.images" class="sup_img" :src="i.image">
                      </div>
                    </a>
                  </div>
                  <div v-if="index === 0" class="sup_sep"></div>
                </div>
                <div v-show="item.thematicTwo.spus.editLayerVisible" class="edit_layer">
                  <div class="edit_btn" @click="toEditThematic(item.thematicTwo.spus)">编辑</div>
                </div>
              </div>
            </div>
            <div class="fbt_col top">
              <div class="box_hd clearfix">
                <i class="box_hd_arrow"></i>
                <i class="box_hd_dec"></i>
                <div class="clearfix fll" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicThree.leftTitle.editLayerVisible = true"
                     @mouseleave="item.thematicThree.leftTitle.editLayerVisible  = false">
                  <h3 class="box_tit">{{ item.thematicThree.leftTitle.data.name }}</h3>
                  <div v-show="item.thematicThree.leftTitle.editLayerVisible " class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditword(item.thematicThree.leftTitle)">编辑
                    </div>
                  </div>
                </div>
                <div class="clearfix flr" style="width: 50%; position: relative; height: 55px"
                     @mouseenter="item.thematicThree.rightTitle.editLayerVisible = true"
                     @mouseleave="item.thematicThree.rightTitle.editLayerVisible = false">
                  <a href="javascript:;" class="box_subtit">{{item.thematicThree.rightTitle.data.name }}<i
                    class="box_subtit_arrow"></i></a>
                  <div v-show="item.thematicThree.rightTitle.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditSingleWordLink(item.thematicThree.rightTitle)">编辑
                    </div>
                  </div>
                </div>
              </div>
              <div class="top_tab">
                <ul class="tab_list">
                  <li v-for="(element,index) in item.thematicThree.tabs"
                      @mouseenter="thematicNavChange(item.thematicThree,index)">{{ element.data.name }}
                  </li>
                  <transition>
                    <p :style="{transform: item.thematicThree.thematicTopNavLeftValue }"></p>
                  </transition>
                </ul>
                <div class="product_wrap" style="position: relative">
                  <ul v-if="index === item.thematicThree.thematicTopNavIndex"
                      v-for="(element,index) in item.thematicThree.tabs" class="top_list clearfix"
                      @mouseenter="element.editLayerVisible = true" @mouseleave="element.editLayerVisible = false">
                    <li v-for="(i,index) in element.data.spus" class="top_item">
                      <a href="javascript:;" class="top_lk">
                        <div v-if="index === 0" class="top_rank top_rank_1">1</div>
                        <div v-if="index === 1" class="top_rank top_rank_2">2</div>
                        <div v-if="index === 2" class="top_rank top_rank_3">3</div>
                        <div v-if="index === 3" class="top_rank">4</div>
                        <div v-if="index === 4" class="top_rank">5</div>
                        <div v-if="index === 5" class="top_rank">6</div>
                        <div class="top_pic"><img :src="i.image" class="top_img"></div>
                        <p class="top_name">{{ i.name }}</p>
                      </a>
                    </li>
                    <div v-show="element.editLayerVisible" class="edit_layer">
                      <div class="edit_btn" @click="toEditTopGoods(element)">编辑</div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 楼层通栏广告 -->
          <div v-if="item.type === '3'" class="clearfix"
               style="height: 100px; margin-top:30px; position: relative" :style="{background: item.data.backColor}"
               @mouseenter="item.editLayerVisible = true, item.moduleToolbarVisible = true"
               @mouseleave="item.editLayerVisible = false, item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div class="container clearfix">
              <ul class="rec_list clearfix">
                <li v-for="element in item.data.images"><a href="javascript:;" @click="toLink()"><img
                  :src="element.image"></a></li>
              </ul>
            </div>
            <div v-show="item.editLayerVisible" class="edit_layer">
              <div class="edit_btn" @click="toEditTopBanner(item,'图片建议尺寸:396px * 100px')">编辑</div>
            </div>
          </div>

          <!-- 楼层标题 -->
          <div v-if="item.type === '4'" class="container ftit_inner" style="position: relative"
               @mouseenter="item.editLayerVisible = true, item.moduleToolbarVisible = true"
               @mouseleave="item.editLayerVisible = false, item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <h3>{{ item.data.name }}</h3>
            <div v-show="item.editLayerVisible" class="edit_layer">
              <div class="edit_btn"
                   style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                   @click="toEditword(item)">编辑
              </div>
            </div>
          </div>

          <!-- 楼层一 -->
          <div :ref="item.id" v-if="item.type === '5'" class="fbt_inner clearfix" style="position: relative"
               @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar" style="top: -8px">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div v-for="element in item.floorData" class="chn_col">
              <div class="pt_hd" style="position: relative" :style="{background: element.top.data.backColor}"
                   @mouseenter="element.top.editLayerVisible = true"
                   @mouseleave="element.top.editLayerVisible = false"><h3 class="pt_tit">{{ element.top.data.name
                }}</h3>
                <div class="pt_tags">
                  <a v-for="i in element.top.data.content" href="javascript:;" @click="">{{ i.name }}</a>
                </div>
                <div v-show="element.top.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditFloorHead(element.top)">编辑
                  </div>
                </div>
              </div>
              <div class="pt_bd_wrapper">
                <div class="pt_cover" style="position: relative"
                     @mouseenter="element.dataOne.editLayerVisible = true"
                     @mouseleave="element.dataOne.editLayerVisible = false">
                  <a href="javascript:;"><img :src="element.dataOne.data[0].image"
                                              class="pt_cover_img"></a>
                  <div v-show="element.dataOne.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataOne,'图片建议尺寸:193px * 260px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_bi" style="position: relative" @mouseenter="element.dataTwo.editLayerVisible = true"
                     @mouseleave="element.dataTwo.editLayerVisible = false">
                  <span class="pt_bi_split pt_bi_split_h"></span>
                  <span class="pt_bi_split pt_bi_split_v"></span>
                  <a v-for="i in element.dataTwo.data" href="javascript:;" class="pt_bi_item"><img :src="i.image"
                                                                                                   class="pt_bi_img"></a>
                  <div v-show="element.dataTwo.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataTwo,'图片建议尺寸:188px * 130px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_more" style="position: relative" @mouseenter="element.dataThree.editLayerVisible = true"
                     @mouseleave="element.dataThree.editLayerVisible = false">
                  <a v-for="(i,index) in element.dataThree.data" href="javascript:;" class="pt_more_item"
                     :style="{margin: index === 2 ? '0' : '0 10px 0 0'}"><img :src="i.image"
                                                                              class="pt_more_img"></a>
                  <div v-show="element.dataThree.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataThree,'图片建议尺寸:193px * 130px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_ft" style="position: relative" @mouseenter="element.dataFour.editLayerVisible = true"
                     @mouseleave="element.dataFour.editLayerVisible = false">
                  <ul class="logo_list clearfix">
                    <li v-for="i in element.dataFour.data" class="pt_logo_item"><a href="javascript:;"><img
                      :src="i.image" class="pt_logo_img"></a></li>
                  </ul>
                  <div v-show="element.dataFour.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditMultiPic(element.dataFour,'图片建议尺寸:70px * 35px')">编辑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 楼层二 -->
          <div :ref="item.id" v-if="item.type === '6'" class="fbt_inner clearfix" style="position: relative"
               @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar" style="top: -8px">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div class="chn_col" style="width: 100%">
              <div class="pt_hd" style="position: relative" :style="{background: item.top.data.backColor}"
                   @mouseenter="item.top.editLayerVisible = true" @mouseleave="item.top.editLayerVisible = false"><h3
                class="pt_tit">{{ item.top.data.name }}</h3>
                <div class="pt_tags" style="max-width:1005px">
                  <a v-for="element in item.top.data.content" href="javascript:;">{{ element.name}}</a>
                </div>
                <div v-show="item.top.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditFloorHead(item.top)">编辑
                  </div>
                </div>
              </div>
              <div class="pt_bd_wrapper">
                <div v-for="(element,index) in item.floorData" class="pt_bd" :class="{pt_bd_col2 : index === 1}">
                  <div class="pt_cover" style="position: relative"
                       @mouseenter="element.dataOne.editLayerVisible = true"
                       @mouseleave="element.dataOne.editLayerVisible = false">
                    <a href="javascript:;"><img :src="element.dataOne.data[0].image" class="pt_cover_img"></a>
                    <div v-show="element.dataOne.editLayerVisible" class="edit_layer">
                      <div class="edit_btn" @click="toEditMultiPic(element.dataOne,'图片建议尺寸:193px * 260px')">
                        编辑
                      </div>
                    </div>
                  </div>
                  <div class="pt_bi" style="position: relative" @mouseenter="element.dataTwo.editLayerVisible = true"
                       @mouseleave="element.dataTwo.editLayerVisible = false">
                    <span class="pt_bi_split pt_bi_split_h"></span>
                    <span class="pt_bi_split pt_bi_split_v"></span>
                    <a v-for="i in element.dataTwo.data" href="javascript:;" class="pt_bi_item"><img :src="i.image"
                                                                                                     class="pt_bi_img"></a>
                    <div v-show="element.dataTwo.editLayerVisible" class="edit_layer">
                      <div class="edit_btn" @click="toEditMultiPic(element.dataTwo,'图片建议尺寸:188px * 130px')">
                        编辑
                      </div>
                    </div>
                  </div>
                  <div class="pt_more" style="position: relative"
                       @mouseenter="element.dataThree.editLayerVisible = true"
                       @mouseleave="element.dataThree.editLayerVisible = false">
                    <a v-for="(i,index) in element.dataThree.data" href="javascript:;" class="pt_more_item"
                       :style="{margin: index === 2 ? '0' : '0 10px 0 0'}"><img :src="i.image" class="pt_more_img"></a>
                    <div v-show="element.dataThree.editLayerVisible" class="edit_layer">
                      <div class="edit_btn" @click="toEditMultiPic(element.dataThree,'图片建议尺寸:193px * 130px')">
                        编辑
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt_ft" style="position: relative"
                     @mouseenter="item.bottom.editLayerVisible = true"
                     @mouseleave="item.bottom.editLayerVisible = false">
                  <ul class="logo_list clearfix" style="padding-left:16px">
                    <li v-for="element in item.bottom.data" class="pt_logo_item"><a href="javascript:;""><img
                      :src="element.image" class="pt_logo_img"></a></li>
                  </ul>
                  <div v-show="item.bottom.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditMultiPic(item.bottom,'图片建议尺寸:70px * 35px')">编辑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 楼层三 -->
          <div :ref="item.id" v-if="item.type === '7'" class="fbt_inner clearfix" style="position: relative"
               @mouseenter="item.moduleToolbarVisible = true" @mouseleave="item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar" style="top: -8px">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <div v-for="element in item.floorData" class="chn_col col_3x">
              <div class="pt_hd" style="position: relative" :style="{background: element.top.data.backColor}"
                   @mouseenter="element.top.editLayerVisible = true"
                   @mouseleave="element.top.editLayerVisible = false"><h3 class="pt_tit">{{ element.top.data.name
                }}</h3>
                <div class="pt_tags">
                  <a v-for="i in element.top.data.content" href="javascript:;">{{ i.name }}</a>
                </div>
                <div v-show="element.top.editLayerVisible" class="edit_layer">
                  <div class="edit_btn"
                       style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                       @click="toEditFloorHead(element.top)">编辑
                  </div>
                </div>
              </div>
              <div class="pt_bd_wrapper">
                <div class="pt_cover" style="position: relative"
                     @mouseenter="element.dataOne.editLayerVisible = true"
                     @mouseleave="element.dataOne.editLayerVisible = false">
                  <a href="javascript:;"><img :src="element.dataOne.data[0].image" class="pt_cover_img"></a>
                  <div v-show="element.dataOne.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataOne,'图片建议尺寸:193px * 260px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_bi" style="position: relative" @mouseenter="element.dataTwo.editLayerVisible = true"
                     @mouseleave="element.dataTwo.editLayerVisible = false">
                  <span class="pt_bi_split pt_bi_split_h"></span>
                  <span class="pt_bi_split pt_bi_split_v"></span>
                  <a v-for="i in element.dataTwo.data" href="javascript:;" class="pt_bi_item"><img :src="i.image"
                                                                                                   class="pt_bi_img"></a>
                  <div v-show="element.dataTwo.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataTwo,'图片建议尺寸:188px * 130px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_more" style="position: relative" @mouseenter="element.dataThree.editLayerVisible = true"
                     @mouseleave="element.dataThree.editLayerVisible= false">
                  <a v-for="(i,index) in element.dataThree.data" href="javascript:;" class="pt_more_item"
                     :style="[{margin: index === 1 ? '0' : '0 10px 0 0'}, {width: index === 1 ? '177px' : '183px'}]"><img
                    :src="i.image" class="pt_more_img"></a>
                  <div v-show="element.dataThree.editLayerVisible" class="edit_layer">
                    <div class="edit_btn" @click="toEditMultiPic(element.dataThree,'图片建议尺寸:193px * 130px')">编辑
                    </div>
                  </div>
                </div>
                <div class="pt_ft" style="position: relative" @mouseenter="element.bottom.editLayerVisible = true"
                     @mouseleave="element.bottom.editLayerVisible = false">
                  <ul class="logo_list clearfix">
                    <li v-for="i in element.bottom.data" class="pt_logo_item"><a href="javascript:;"><img
                      :src="i.image" class="pt_logo_img"></a></li>
                  </ul>
                  <div v-show="element.bottom.editLayerVisible" class="edit_layer">
                    <div class="edit_btn"
                         style="padding: 0 10px; height: 30px; line-height: 26px; font-size: 12px; box-sizing: border-box!important"
                         @click="toEditMultiPic(element.bottom,'图片建议尺寸:70px * 35px')">编辑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 还没逛够 -->
          <div :ref="item.id" v-if="item.type === '8'" class="fbt_inner clearfix" style="position: relative"
               @mouseenter="item.editLayerVisible = true, item.moduleToolbarVisible = true"
               @mouseleave="item.editLayerVisible = false, item.moduleToolbarVisible = false">
            <div v-show="item.moduleToolbarVisible" class="module_toolbar">
              <div class="module_toolbar_btn">
                <a class="add_module" href="javascript:;" @click="dialogModuleVisible = true"><i class="el-icon-plus"></i> 添加模块</a>
                <a class="del_module" href="javascript:;" @click="deleteModulesDialog(index)"><i class="icon-trash"></i>
                  删除</a>
              </div>
              <div class="module_tip">拖拽模块以挪动位置</div>
            </div>
            <ul class="more_list clearfix">
              <li v-for="element in item.data" class="more_item">
                <a href="Javascript:;" class="more_item_lk">
                  <img :src="element.image" class="more_photo">
                  <div class="more_info">
                    <p class="more_info_name">{{ element.name }}</p>
                    <p class="more_info_price mod_price"><i>¥</i><span>{{ element.price }}</span></p>
                  </div>
                </a>
              </li>
            </ul>
            <div v-show="item.editLayerVisible" class="edit_layer">
              <div class="edit_btn" @click="toEditGoods(item,'图片建议尺寸:220px*220px')">编辑</div>
            </div>
          </div>

        </div>
      </transition-group>
    </draggable>

    <!-- 楼层浮动导航 -->
    <ul v-if="sideBarVisible" class="sideBar" style="left: 10px; top: 30%; opacity: 1;">
      <li v-for="item in template.modules" v-if="item.name !== undefined"><a class="sideItem" href="javascript:;"
                                                                             @click="toPage(item.id)"><span>{{ item.name }}</span></a>
      </li>
      <li><a class="backtop_btn sideItem" href="javascript:;" @click="toPageTop"><span>顶部<i class="lift_btn_arrow"></i></span></a>
      </li>
    </ul>

    <!-- 帮助服务 -->
    <div ref="pageBottom" class="service_main clearfix">
      <dl v-for="item in template.serviceData" class="service_box" style="position: relative"
          @mouseenter="item.editLayerVisible = true" @mouseleave="item.editLayerVisible = false">
        <dt>{{ item.data.name }}</dt>
        <dd>
          <a v-for="element in item.data.services" href="javascript:;">{{ element.name
            }}</a>
        </dd>
        <div v-show="item.editLayerVisible" class="edit_layer">
          <div class="edit_btn" @click="toEditHelp(item)">编辑</div>
        </div>
      </dl>
    </div>

    <!-- 底部信息 -->
    <div class="container footer_main" style="position: relative"
         @mouseenter="template.footerData.editLayerVisible = true"
         @mouseleave="template.footerData.editLayerVisible  = false">
      <div v-html="template.footerData.html"></div>
      <div v-show="template.footerData.editLayerVisible " class="edit_layer">
        <div class="edit_btn" @click="toEditFooter(template.footerData)">编辑</div>
      </div>
    </div>

    </div>

    <!-- 通栏广告编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="topBannerVisible"
      direction="rtl"
    >
      <div class="img_container">
        <el-alert
          :title="drawerTipsValue"
          type="warning"
          :closable="false"
        />
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="item in editObject.images" :span="12">
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
                           plain
                           icon="el-icon-link"
                           @click="toEditLink(item.link)"/>
              </el-button-group>
            </div>
          </el-col>
          <el-col>
            <div style="line-height: 40px; font-size: 14px">背景色</div>
            <el-color-picker v-model="editObject.backColor"></el-color-picker>
            <span style="vertical-align: top; line-height: 40px; margin-left: 10px">{{ editObject.backColor }}</span>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveTopBanner">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 单图片编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="logoImgVisible"
      direction="rtl"
    >
      <div class="img_container">
        <el-alert
          :title="drawerTipsValue"
          type="warning"
          :closable="false"
        />
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="12">
            <div class="imgBox">
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
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveLogoImg">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 多文字编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="hotSearchVisible"
      direction="rtl"
    >
      <div class="img_container">
        <el-row v-for="(element,index) in editObject" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="element.name">
              <el-button slot="append" icon="el-icon-delete" @click="deleteHotSearch(editObject,index)"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="toAddHotSearch">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveHotSearch">保存</el-button>
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
                <el-button icon="el-icon-link" @click="toEditLink(item.link)"
                           :class="{hasLink:item.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                <el-button icon="el-icon-delete" @click="deleteMultiWordItem(editObject,index)"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addMultiWordItem()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveMultiWord">保存</el-button>
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
                <el-button class="isLink" :class="{hasLink:item.link.actionType!=''}" type="primary" plain
                           icon="el-icon-link"
                           @click="toEditLink(item.link)"/>
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

    <!-- 单文字编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="wordVisible"
      direction="rtl"
    >
      <div class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name"/>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveWord">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 一级分类编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="topCateEditVisible"
      direction="rtl"
    >
      <div v-if="topCateEditVisible" class="img_container">
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">一级分类</div>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(editObject.link)"
                           :class="{hasLink:editObject.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">二级分类</div>
        <el-row v-for="item in editObject.second" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="item.data.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(item.data.link)"
                           :class="{hasLink:item.data.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addSCate()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="updateFCate()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 二级分类编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="secCateEditVisible"
      direction="rtl"
    >
      <div v-if="secCateEditVisible" class="img_container">
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">二级分类</div>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name" maxlength="32">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(editObject.link)"
                           :class="{hasLink:editObject.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">三级分类</div>
        <el-row v-for="(item,index) in editObject.third" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="item.name" maxlength="32">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(item.link)"
                           :class="{hasLink:item.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                <el-button icon="el-icon-delete" @click="deleteTCate(index)"/>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addTCate()">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="updateSCate()">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 添加一级分类编辑编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="firstCateLinkVisible"
      direction="rtl"
    >
      <div v-if="firstCateLinkVisible" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="fCate.data.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(fCate.data.link)"
                           :class="{hasLink:fCate.data.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveFirstCate">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 单文字链接编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="singleWordLinkVisible"
      direction="rtl"
    >
      <div v-if="singleWordLinkVisible" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(editObject.link)"
                           :class="{hasLink:editObject.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveSingleWordLink">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 商品列表编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="goodsVisible"
      direction="rtl"
    >
      <div v-if="goodsVisible" class="img_container">
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
              <el-input placeholder="请输入标题" class="drawer-input" v-model="item.name"/>
              <el-input placeholder="请输入价格" class="drawer-input" v-model="item.price"/>
              <el-button-group class="imgBar">
                <el-button class="isLink" :class="{hasLink:item.link.actionType!=''}" type="primary" plain
                           icon="el-icon-link"
                           @click="toEditLink(item.link)"/>
                <el-button type="danger" plain icon="el-icon-delete" @click="deleteGoodsItem(editObject,index)"/>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveGoods">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 单图片加文字链接编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="picWordLinkVisible"
      direction="rtl"
    >
      <div v-if="picWordLinkVisible" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="(item , index) in editObject" :span="12">
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
              <el-input placeholder="请输入标题" class="drawer-input" v-model="item.name"/>
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
          <el-button type="success" @click="savePicWordLink">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 多图片加文字链接编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="thematicVisible"
      direction="rtl"
    >
      <div v-if="thematicVisible" class="img_container">
        <div v-for="item in editObject">
          <el-row :gutter="10" style="padding: 10px 5px">
            <el-col :span="24" class="inputCol">
              <el-input placeholder="请输入内容" class="input-with-select" v-model="item.name">
                <div slot="append">
                  <el-button icon="el-icon-link" @click="toEditLink(item.link)"
                             :class="{hasLink:item.link.actionType!=''}"
                             style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                </div>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="padding: 10px 5px">
            <el-col v-for="i in item.images" :span="12">
              <div class="imgBox">
                <el-upload
                  class="pageUploader"
                  :action="uploadApi"
                  :show-file-list="false"
                  :headers="headers"
                  :on-success="(res,file)=>{return uploadSuccess(res,file, i)}"
                  name="image"
                  accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
                >
                  <img v-if="i.image" :src="i.image" class="pageAvatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="24">
          <el-button type="success" @click="saveEditThematic">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 商品排行榜编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="topGoodsVisible"
      direction="rtl"
    >
      <div v-if="topGoodsVisible" class="img_container">
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入标题内容" class="input-with-select" v-model="editObject.name"/>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col v-for="item in editObject.spus" :span="12">
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
              <el-input placeholder="请输入标题" class="drawer-input" v-model="item.name"/>
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
          <el-button type="success" @click="saveTopGoods">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 楼层头部编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="floorHeadVisible"
      direction="rtl"
    >
      <div v-if="floorHeadVisible" class="img_container">
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">标题（建议字数4字以内）</div>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name"/>
          </el-col>
        </el-row>
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">背景色</div>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-color-picker v-model="editObject.backColor"></el-color-picker>
            <span style="vertical-align: top; line-height: 40px; margin-left: 10px">{{ editObject.backColor }}</span>
          </el-col>
        </el-row>
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">标签</div>
        <el-row v-for="(item,index) in editObject.content" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="item.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(item.link)"
                           :class="{hasLink:item.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                <el-button icon="el-icon-delete" @click="deleteFloorHeadSpan(index)"/>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="addFloorHead(editObject.content)">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveFloorHead">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 底部帮助列表编辑 -->
    <el-drawer
      title="编辑"
      size="400px"
      :visible.sync="helpVisible"
      direction="rtl"
    >
      <div v-if="helpVisible" class="img_container">
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">帮助分类</div>
        <el-row :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="editObject.name"/>
          </el-col>
        </el-row>
        <div style="line-height: 40px; font-size: 14px; padding-left: 5px">帮助列表</div>
        <el-row v-for="(item,index) in  editObject.services" :gutter="10" style="padding: 10px 5px">
          <el-col :span="24" class="inputCol">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="item.name">
              <div slot="append">
                <el-button icon="el-icon-link" @click="toEditLink(item.link)"
                           :class="{hasLink:item.link.actionType!=''}"
                           style="border-right: 1px solid #DCDFE6; border-radius: 0"></el-button>
                <el-button icon="el-icon-delete" @click="deleteHelpItem(index)"/>
              </div>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row class="imgFooter" :gutter="10">
        <el-col :span="12">
          <el-button icon="el-icon-plus" @click="toAddHelpItem(editObject.services)">添加</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="saveEditHelp">保存</el-button>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 底部信息编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogCopyrightVisible" width="75%">
      <tinymce v-model="footerContent" :height="300"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCopyrightVisible = false">取消</el-button>
        <el-button type="primary" @click="saveFooter">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加模块 -->
    <el-dialog title="添加模块" :visible.sync="dialogModuleVisible" width="65%">
      <el-tabs v-model="moduleActiveName" type="card">
        <el-tab-pane label="楼层" name="0">
          <el-radio-group v-model="floorRadio">
            <el-radio :label="0" style="width: 48%; margin: 0 1%">楼层样式一
              <el-input placeholder="请输入楼层名称(建议4字)" class="input-with-select" style="display: block; margin-top: 10px"
                        v-model="floorOneName" maxlength="64"/>
              <img src="../../../../assets/template1/floor1.png" width="100%" style="display: block; margin-top: 5px">
            </el-radio>
            <el-radio :label="1" style="width: 48%; margin: 0 1%">楼层样式二
              <el-input placeholder="请输入楼层名称(建议4字)" class="input-with-select" style="display: block; margin-top: 10px"
                        v-model="floorTwoName" maxlength="64"/>
              <img src="../../../../assets/template1/floor2.png" width="100%" style="display: block; margin-top: 5px">
            </el-radio>
            <el-radio :label="2" style="width: 48%; margin: 0 1%">楼层样式三
              <el-input placeholder="请输入楼层名称(建议4字)" class="input-with-select" style="display: block; margin-top: 10px"
                        v-model="floorThreeName" maxlength="64"/>
              <img src="../../../../assets/template1/floor3.png" width="100%" style="display: block; margin-top: 5px">
            </el-radio>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="商城特惠" name="1">
          <div style="line-height: 30px">样式示例</div>
          <img src="../../../../assets/template1/scth.png" width="100%" style="margin-top: 10px">
        </el-tab-pane>
        <el-tab-pane label="专题&排行榜" name="2">
          <div style="line-height: 30px">样式示例</div>
          <img src="../../../../assets/template1/phb.png" width="100%" style="margin-top: 10px">
        </el-tab-pane>
        <el-tab-pane label="还没逛够" name="3">
          <div style="line-height: 30px">样式示例</div>
          <img src="../../../../assets/template1/goods_more.png" width="100%" style="margin-top: 10px">
        </el-tab-pane>
        <el-tab-pane label="标题" name="4">
          <div style="line-height: 30px">样式示例</div>
          <img src="../../../../assets/template1/title.png" width="100%" style="margin-top: 10px">
        </el-tab-pane>
        <el-tab-pane label="广告位" name="5">
          <el-radio-group v-model="bannerRadio">
            <el-radio :label="0" style="width: 100%; margin: 0">楼层通栏广告
              <img src="../../../../assets/template1/banner.png" width="100%" style="display: block; margin-top: 10px">
            </el-radio>
            <el-radio :label="1" style="width: 100%; margin: 0">顶部通栏广告
              <img src="../../../../assets/template1/banner_top.png" width="100%"
                   style="display: block; margin-top: 10px">
            </el-radio>
            <el-radio :label="2" style="width: 100%; margin: 0">导航栏广告
              <img src="../../../../assets/template1/navBanner.jpg" style="display: block; margin-top: 10px">
            </el-radio>
            <el-radio :label="3" style="width: 100%; margin: 0">二维码广告
              <img src="../../../../assets/template1/qrcode.png" style="display: block; margin-top: 10px">
            </el-radio>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">取消</el-button>
        <el-button type="primary" @click="addModule()">确定</el-button>
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

  </div>
</template>

<style scoped src='../../../../styles/css.css'></style>
<style scoped src='../../../../styles/template1.css'></style>
<style>
  *, *:before, *:after { box-sizing: initial }
  .mainPage { background-color: #f6f6f6; font: 12px/150% Microsoft YaHei, tahoma, arial, Hiragino Sans GB, \\5b8b\4f53, sans-serif; color: #666; -webkit-font-smoothing: antialiased }
  .mainPage div,.mainPage span,.mainPage h1,.mainPage h2,.mainPage h3,.mainPage h4,.mainPage h5,.mainPage h6,.mainPage p,.mainPage a,.mainPage del,.mainPage em,.mainPage font,.mainPage img,.mainPage s,.mainPage strong,.mainPage i,.mainPage dl,.mainPage dt,.mainPage dd,.mainPage ol,.mainPage ul,.mainPage li,.mainPage form,.mainPage label,.mainPage table,.mainPage tbody,.mainPage tfoot,.mainPage thead,.mainPage tr,.mainPage th,.mainPage td { margin: 0; padding: 0; border: 0; outline: 0 }
  .mainPage .swiper-pagination-bullet { width: 10px; height: 10px; opacity: 1; background: rgba(255,255,255,.4); border: 1px solid rgba(0,0,0,.05) }
  .mainPage .swiper-pagination-bullet-active { background: #fff; border: 1px solid rgba(255,255,255,.4) }
  .mainPage .slidesjs-navigation.swiper-button-disabled { opacity: 0.35; cursor: auto; pointer-events: none }
  .mainPage .edit_layer { width: 100%; height: 100%; top: 0; left: 0; position: absolute; border: 2px dashed #f10214; background: rgba(0,0,0,0.4); box-sizing: border-box!important; z-index: 99; display: flex; align-items: center; justify-content: center }
  .mainPage .edit_layer .edit_btn { display: inline-block; cursor: pointer; padding: 10px 20px; border: 2px dashed #fff; color: #fff; font-size: 16px; margin: 0 5px }
  .mainPage .add_one_bar { width:44px; height:480px; position:absolute; top:0; left:-44px; }
  .mainPage .add_one_bar a { width:14px; display:block; padding: 10px 15px; background:#323641; color:#fff; font-size:14px; line-height: 18px }
  .mainPage .add_one_bar a i { margin-left:1px }
  .mainPage .module_toolbar { position:absolute; top:-38px; left:0; width:100%; height:38px }
  .mainPage .module_toolbar_btn { position:absolute; top:0; right:0 }
  .mainPage .module_toolbar_btn a { display:inline-block; padding: 10px 15px; background:#323641; color:#fff; font-size:14px }
  .mainPage .module_toolbar_btn a:last-child { background:#ccc; color:#666 }
  .mainPage .module_tip { cursor:all-scroll; position:absolute; z-index:11; top:7px; line-height:30px; width:200px; left:50%; margin-left:-100px; text-align:center; background:#eee; border:solid 1px #ccc; border-bottom:0; border-top-left-radius:4px; border-top-right-radius:4px }
  .mainPage .pageEdit_toolbar { width:100%; background:#fff; position:fixed; top:0; z-index:100; border-bottom:solid 1px #eee }
  .mainPage .toolbar_list { float:right }
  .mainPage .toolbar_list li { float:left; border-right: solid 1px #eee; font-size:18px; cursor:pointer }
  .mainPage .toolbar_list li a { padding:20px }
  .mainPage .toolbar_list li a:hover { background:#eee }
  .mainPage .inputCol .el-input-group__append { overflow: hidden }
  .mainPage .footer_main { margin: 20px auto 0 auto; padding-bottom: 40px }
  .mainPage .search_main .search_input input { padding: 5px 10px; height: 34px; line-height: 34px; border: 0 }
</style>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import draggable from 'vuedraggable'
  import Tinymce from '@/components/Tinymce'
  import {getToken} from '@/utils/token'

  import {
    queryTemplateSkus,
    queryArticleList,
    queryThematic,
    queryHelpList,
    queryAllCategory,
    querySkuById,
    queryArticleById,
    queryThematicById,
    queryHelpById,
    queryTemplate,
    updateTemplate
  } from '@/api/templateone';

  import {isMoney} from '@/utils/validate';


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
      swiper,
      swiperSlide,
      draggable,
      Tinymce
    },
    data() {
      return {
        content: '',
        fCate: {
          editLayerVisible: false,
          secondVisible: false,
          data: {
            name: '',
            second: [],
            link: {actionType: '', actionParamId: ''}
          },
          brands:
            {
              data: [],
              editLayerVisible: false
            },
          advert:
            {
              data: [],
              editLayerVisible: false
            }

        }, //一级分类
        firstCateLinkVisible: false,// 添加一级分类编辑显示隐藏标记
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        editObject: {},// 编辑的实体
        editRef: {},// 当前编辑的引用
        template: {}, // 模版数据
        functionUrl: '-1', // 当前选中的功能链接
        tabActiveName: '0',// 当前选中的tab
        bannerRadio: 0, // 广告位选择标记 0 楼层通栏广告 1 顶部通栏广告 2 导航通栏广告 3 二维码广告
        floorRadio: 0, // 楼层的选择标记 0 楼层样式一 1 楼层样式二 2 楼层样式三
        moduleActiveName: '0', // 添加模版的时候选择的tab  0 楼层 1 商城特惠 2 专题排行 3 还没逛够 4 标题 5 广告
        drawerTipsValue: '', // 图片建议尺寸
        topBannerVisible: false, // 是否显示顶部广告标记
        logoImgVisible: false, // 单图片编辑显示隐藏标记
        hotSearchVisible: false, // 热搜显示隐藏标记
        multiWordVisible: false, // 多文字加链接编辑显示隐藏标记
        slidesVisible: false, // 轮播显示隐藏标记
        multiPicVisible: false, // 多图片加链接(不可删除)编辑 显示隐藏标记
        wordVisible: false, //单文字编辑显示隐藏标记
        topCateEditVisible: false, // 一级分类编辑显示隐藏标记
        secCateEditVisible: false, //二级分类编辑显示隐藏标记
        singleWordLinkVisible: false, //单文字链接编辑 显示隐藏标记
        goodsVisible: false, //商品列表编辑 显示隐藏标记
        picWordLinkVisible: false, // 单图片加文字链接编辑 显示隐藏标记
        thematicVisible: false, // 多图片加文字链接编辑显示隐藏标记
        topGoodsVisible: false, //  商品排行榜编辑显示隐藏
        floorHeadVisible: false, // 楼层头部编辑显示隐藏标记
        helpVisible: false, // 帮助编辑显示隐藏标记
        dialogCopyrightVisible: false, // 底部信息编辑显示隐藏
        dialogModuleVisible: false, // 添加模块显示隐藏标记
        dialogLinkVisible: false, // 链接编辑显示隐藏标记
        sideBarVisible: false, // 楼层浮动
        searchType: 0, // 搜索类型
        swiperOption: {
          loop: false,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }, // 轮播设置
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
        articles: null, // 专题数据
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
        thematicTotal: null, // 数据总数,
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
        floorOneName: '',// 楼层样式一名称
        floorTwoName: '',// 楼层样式二名称
        floorThreeName: '',// 楼层样式三名称
        footerContent: '',// 底部信息内容
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    created() {
      this.queryAllCates();
      this.queryTemplate();
    },
    methods: {
      // 编辑顶部广告
      toEditTopBanner(topBanner) {
        this.editObject = JSON.parse(JSON.stringify(topBanner.data));
        this.editRef = topBanner;
        this.topBannerVisible = true;
        this.drawerTipsValue = '图片建议尺寸:1190px * 80px'
      },
      // 保存顶部广告
      saveTopBanner() {
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.topBannerVisible = false;
      },
      //编辑单图片编辑
      toEditLogoImg(logo, tip) {
        this.editObject = JSON.parse(JSON.stringify(logo.data));
        this.editRef = logo;
        this.logoImgVisible = true
        this.drawerTipsValue = tip
      },
      // 保存单图片编辑
      saveLogoImg() {
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.logoImgVisible = false
      },
      // 编辑热搜
      toEditHotSearch(hotSearch) {
        this.editObject = JSON.parse(JSON.stringify(hotSearch.data));
        this.editRef = hotSearch;
        this.hotSearchVisible = true;
      },
      // 保存热搜
      saveHotSearch() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.hotSearchVisible = false;
      },
      // 删除热搜
      deleteHotSearch(item, index) {
        if (!item || item.length < 2) {
          return;
        }
        item.splice(index, 1);
      },
      // 添加热搜
      toAddHotSearch() {
        this.editObject.push({name: ""})
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
      // 编辑单文字编辑
      toEditword(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.wordVisible = true;
      },
      // 保存单文字编辑
      saveWord() {
        if (!this.editObject || !this.editObject.name) {
          this.showError('内容为空，请填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.wordVisible = false;
      },
      // 编辑多文字加链接编辑
      toEditMultiWord(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.multiWordVisible = true;
      },
      // 删除多文字加链接中的一项
      deleteMultiWordItem(items, index) {
        if (!items || items.length < 2) {
          return;
        }
        items.splice(index, 1);
      },
      // 保存多文字加链接
      saveMultiWord() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.multiWordVisible = false;
      },
      // 添加多文字加链接中的一项
      addMultiWordItem() {
        this.editObject.push({
          name: '',
          link: {actionType: '', actionParamId: ''}
        });
      },
      // 编辑单文字链接编辑
      toEditSingleWordLink(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.singleWordLinkVisible = true;
      },
      // 保存单文字链接编辑
      saveSingleWordLink() {
        if (!this.editObject || !this.editObject.name) {
          this.showError('内容为空，请填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.singleWordLinkVisible = false;
      },
      // 编辑商品列表
      toEditGoods(item, tip) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.goodsVisible = true;
        this.drawerTipsValue = tip;
      },
      // 删除一个商品
      deleteGoodsItem(items, index) {
        if (!items || items.length < 2) {
          return;
        }
        items.splice(index, 1);
      },
      // 保存商品
      saveGoods() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在商品名称为空的商品，请给所有商品都填写名称！');
          return;
        }
        if (this.editObject.some(editObj => !editObj.price || !isMoney(editObj.price))) {
          this.showError('存在金额为空或不合法的商品，请给所有商品填写合法金额！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.goodsVisible = false;
      },
      // 编辑单图片加文字链接
      toEditPicWordLink(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.picWordLinkVisible = true;
      },
      // 保存单图片加文字链接
      savePicWordLink() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.picWordLinkVisible = false;
      },
      // 编辑多图片加文字链接
      toEditThematic(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.thematicVisible = true;
      },
      // 保存多图片加文字链接
      saveEditThematic() {
        if (!this.editObject || this.editObject.some(editObj => !editObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.thematicVisible = false;
      },
      // 编辑商品排行
      toEditTopGoods(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.topGoodsVisible = true;
      },
      // 保存商品排行
      saveTopGoods() {
        if (!this.editObject || !this.editObject.name) {
          this.showError('标题内容不能为空，请填写标题内容！');
          return;
        }
        if (!this.editObject.spus || this.editObject.spus.some(spu => !spu.name)) {
          this.showError('存在商品名称为空的商品，请给所有商品都填写名称！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.topGoodsVisible = false;
      },
      // 编辑楼层头部
      toEditFloorHead(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.floorHeadVisible = true;
      },
      // 保存楼层头部
      saveFloorHead() {
        if (!this.editObject || !this.editObject.name) {
          this.showError('标题内容不能为空，请填写标题内容！');
          return;
        }
        if (!this.editObject.content || this.editObject.content.some(span => !span.name)) {
          this.showError('存在内容为空的标签，请给所有标签都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.floorHeadVisible = false;
      },
      // 删除楼层头部中的标签
      deleteFloorHeadSpan(index) {
        if (!this.editObject.content || this.editObject.content.length < 2) {
          return;
        }
        this.editObject.content.splice(index, 1);
      },
      // 添加楼层的😊
      addFloorHead(items) {
        items.push({
          name: '',
          link: {actionType: '', actionParamId: ''}
        });
      },
      // 编辑帮助
      toEditHelp(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.helpVisible = true;
      },
      // 添加帮助
      toAddHelpItem(items) {
        items.push({
          name: '',
          link: {actionType: '', actionParamId: ''}
        });
      },
      // 保存帮助
      saveEditHelp() {
        if (!this.editObject || !this.editObject.name) {
          this.showError('帮助分类不能为空，请填写帮助分类！');
          return;
        }
        if (!this.editObject.services || this.editObject.services.some(service => !service.name)) {
          this.showError('存在帮助内容为空的标签，请给所有帮助标签都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.helpVisible = false;
      },
      // 删除帮助
      deleteHelpItem(index) {
        if (!this.editObject.services || this.editObject.services.length < 2) {
          return;
        }
        this.editObject.services.splice(index,1);
      },
      // 编辑底部信息
      toEditFooter(item) {
        this.footerContent = item.html;
        this.dialogCopyrightVisible = true;
      },
      // 保存底部信息
      saveFooter() {
        this.template.footerData.html = this.footerContent;
        this.dialogCopyrightVisible = false;
      },
      // 图片上传成功回掉
      uploadSuccess(res, file, item) {
        item.image = res;
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
        queryTemplateSkus(this.listQuery).then(response => {
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
        queryArticleList(this.articleListQuery).then(response => {
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
        queryHelpList(this.helpListQuery).then(response => {
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
        queryThematic(this.thematicListQuery).then(response => {
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
        queryAllCategory().then(res => {
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
          querySkuById(link.actionParamId).then(res => {
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
          queryArticleById(link.actionParamId).then(res => {
            this.linkedArticle.push(res);
          })
        } else if (link.actionType == '4') {
          // 查询专题
          queryThematicById(link.actionParamId).then(res => {
            this.linkedThemtics.push(res);
          })
        } else if (link.actionType == '5') {
          //  查询帮助
          queryHelpById(link.actionParamId).then(res => {
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
      // 查询模版信息
      queryTemplate() {
        queryTemplate(1).then(res => {
          this.template = JSON.parse(res.template);
        })
      },
      toLink(link) {
        this.$router.push({path: link})
      },
      thematicNavChange(item, index) {
        item.thematicTopNavIndex = index
        item.thematicTopNavLeftValue = 'translateX(' + item.thematicTopNavIndex * 77 + 'px)'
      },
      toPage(item) {
        this.$nextTick(() => {
          this.$refs[item][0].scrollIntoView({behavior: 'smooth', block: 'start'})
        })
      },
      toPageTop() {
        this.$refs.pageTop.scrollIntoView({behavior: 'smooth', block: 'start'})
      },
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.sideBarVisible = this.$refs.pageBody.getBoundingClientRect().top <= scrollTop
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
         switch (this.moduleActiveName) {
          case "0":
            // 楼层
            if (this.floorRadio == '0') {
              if (!this.floorOneName) {
                this.showError('楼层名称不能为空！');
                return;
              }
              // 楼层样式一
              this.template.modules.push({
                id: Date.parse(new Date()),
                moduleToolbarVisible: false,
                type: '5',
                name: this.floorOneName,
                floorData: [
                  {
                    top: {
                      editLayerVisible: false,
                      data: {
                        name: '爱逛',
                        backColor: 'rgba(120,83,142,1)',
                        content: [
                          {
                            name: 'Jack Jones',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '儿童腕表',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '钟表520',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '珠宝',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '小天鹅',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '自营服饰',
                            link: {actionType: '', actionParamId: ''}
                          }
                        ],
                      },
                    },
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111827.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111843.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/59223e64Nf7e872ba.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataFour: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58e73680N18a1c4d5.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae7dfN92c16b3e.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                  },
                  {
                    top: {
                      editLayerVisible: false,
                      data: {
                        name: '爱逛',
                        backColor: 'rgba(120,83,142,1)',
                        content: [
                          {
                            name: 'Jack Jones',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '儿童腕表',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '钟表520',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '珠宝',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '小天鹅',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '自营服饰',
                            link: {actionType: '', actionParamId: ''}
                          }
                        ],
                      },
                    },
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111827.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111843.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/59223e64Nf7e872ba.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataFour: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58e73680N18a1c4d5.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae7dfN92c16b3e.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                  },
                ]
              });
            } else if (this.floorRadio == '1') {
              // 楼层样式二
              if (!this.floorTwoName) {
                this.showError('楼层名称不能为空！');
                return;
              }
              this.template.modules.push({
                id: Date.parse(new Date()),
                moduleToolbarVisible: false,
                type: '6',
                name: this.floorTwoName,
                top: {
                  editLayerVisible: false,
                  data: {
                    name: '爱逛',
                    backColor: 'rgba(72,139,173,1)',
                    content: [
                      {
                        name: 'Jack Jones',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '儿童腕表',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '钟表520',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '珠宝',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '小天鹅',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '自营服饰',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: 'Jack Jones',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '儿童腕表',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '钟表520',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '珠宝',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '小天鹅',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '自营服饰',
                        link: {actionType: '', actionParamId: ''}
                      }
                    ],
                  }
                },
                floorData: [
                  {
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111827.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111843.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/59223e64Nf7e872ba.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    }
                  },
                  {
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111827.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111843.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/59223e64Nf7e872ba.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    }
                  }
                ],
                bottom:
                  {
                    data: [
                      {
                        image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/58e73680N18a1c4d5.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591ae7dfN92c16b3e.png',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/58e73680N18a1c4d5.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        image: 'http://images.lecshop.cn/template1/591ae7dfN92c16b3e.png',
                        link: {actionType: '', actionParamId: ''}
                      }
                    ],
                    editLayerVisible: false
                  }
              });
            } else if (this.floorRadio == '2') {
              // 楼层样式三
              if (!this.floorThreeName) {
                this.showError('楼层名称不能为空！');
                return;
              }
              this.template.modules.push({
                id: Date.parse(new Date()),
                moduleToolbarVisible: false,
                type: '7',
                name: this.floorThreeName,
                floorData: [
                  {
                    top: {
                      data: {
                        name: '爱逛',
                        backColor: 'rgba(100,103,160,1)',
                        content: [
                          {
                            name: 'Jack Jones',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '儿童腕表',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '钟表520',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '珠宝',
                            link: {actionType: '', actionParamId: ''}
                          }
                        ]
                      },
                      editLayerVisible: false,
                    },
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    bottom: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    }
                  },
                  {
                    top: {
                      data: {
                        name: '爱逛',
                        backColor: 'rgba(100,103,160,1)',
                        content: [
                          {
                            name: 'Jack Jones',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '儿童腕表',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '钟表520',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '珠宝',
                            link: {actionType: '', actionParamId: ''}
                          }
                        ]
                      },
                      editLayerVisible: false,
                    },
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    bottom: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    }
                  },
                  {
                    top: {
                      data: {
                        name: '爱逛',
                        backColor: 'rgba(100,103,160,1)',
                        content: [
                          {
                            name: 'Jack Jones',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '儿童腕表',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '钟表520',
                            link: {actionType: '', actionParamId: ''}
                          },
                          {
                            name: '珠宝',
                            link: {actionType: '', actionParamId: ''}
                          }
                        ]
                      },
                      editLayerVisible: false,
                    },
                    dataOne: {
                      data: [{
                        image: 'http://images.lecshop.cn/template1/5913cbc9N02c15647.jpg',
                        link: {actionType: '', actionParamId: ''},
                      }],
                      editLayerVisible: false
                    },
                    dataTwo: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111712.png',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/QQ20170523-111815.png',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    dataThree: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591e5cc0Naa9ab188.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/58501611Nd263645a.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    },
                    bottom: {
                      data: [
                        {
                          image: 'http://images.lecshop.cn/template1/591a5616Ndeae876c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5668N59abc95d.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591a5645N1b214e3c.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          image: 'http://images.lecshop.cn/template1/591ae829N5a2ae0c7.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                      editLayerVisible: false
                    }
                  },
                ]
              });
            }
            this.dialogModuleVisible = false
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case "1":
            // 商城特惠
            this.template.modules.push({
              id: Date.parse(new Date()),
              type: '1',
              moduleToolbarVisible: false,
              leftTitle: {
                data: {
                  name: '商城特惠'
                },
                editLayerVisible: false
              },
              rightTitle: {
                data: {
                  name: '总有你想不到的低价',
                  link: {actionType: '', actionParamId: ''}
                },
                editLayerVisible: false,
              },
              swiperData: {
                editLayerVisible: false,
                data: [
                  {
                    image: 'http://images.lecshop.cn/template1/58d228caN84b77584.jpg',
                    name: '五羊百白（ByeBye）深层洁净洗衣液（青苹果香）2kg',
                    price: '99.00',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/template1/5722d645Na4e40d05.jpg',
                    name: '北欧欧慕（nathome）苏打水机家用气泡水机汽水机1L NSD2000白色',
                    price: '249.00',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/template1/551b58e0Nd45a1f86.jpg',
                    name: '尼康（Nikon）D7100 单反套机（ AF-S 18-140mmf/3.5-5.6G ED VR 镜头）',
                    price: '5899.00',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/template1/57e090b0Ne91c50aa.jpg',
                    name: '飞利浦（PHILIPS）PPX4835 家用 办公 高清 投影机（DLP芯片 350ANSI流明 720P分辨率 微型 便携）',
                    price: '2599.00',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/template1/58f1cb42N60c2bd2c.jpg',
                    name: '佳农 越南进口红心火龙果 3个装 中果 总重约1.1KG 新鲜水果',
                    price: '25.90',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/20180313/1520932852978.jpg',
                    name: 'TCL 55A950C 55英寸32核人工智能 HDR曲面超薄4K电视金属机身（枪色）(32英寸/高清)',
                    price: '899.00',
                    link: {actionType: '', actionParamId: ''}
                  },
                  {
                    image: 'http://images.lecshop.cn/20180313/1520935196936.jpg',
                    name: 'TCL 55A950C 55英寸32核人工智能 HDR曲面超薄4K电视金属机身（枪色）(48英寸/高清)',
                    price: '3899.00',
                    link: {actionType: '', actionParamId: ''}
                  }
                ],
              },
              todaysBanner: {
                data: [{
                  image: 'http://images.lecshop.cn/template1/591c2046Nce057ddc.jpg',
                  link: {actionType: '', actionParamId: ''},
                }],
                editLayerVisible: false
              }
            });
            this.dialogModuleVisible = false
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case "2":
            // 专题排行
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '2',
              thematicOne: {
                leftTitle: {
                  data: {
                    name: '发现好货',
                  },
                  editLayerVisible: false
                },
                rightTitle: {
                  data: {
                    name: '发现品质生活',
                    link: {actionType: '', actionParamId: ''}
                  },
                  editLayerVisible: false,
                },
                spus:
                  {
                    data: [
                      {
                        name: 'Bose多媒体扬声器系统',
                        image: 'http://images.lecshop.cn/template1/591cfb46N4e8a758a.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '洛诗琳 丝绒系带衬衫',
                        image: 'http://images.lecshop.cn/template1/58f1a669Nf78a8a75.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '《悲惨世界》',
                        image: 'http://images.lecshop.cn/template1/59167d98N3a4b6475.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '漫步者 新一代电视音响',
                        image: 'http://images.lecshop.cn/template1/53a13dccN4b90e17b.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '漫步者有源2.1音箱',
                        image: 'http://images.lecshop.cn/template1/591d0156Nb0ac7809.jpg',
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: 'JBL 头戴式蓝牙耳机',
                        image: 'http://images.lecshop.cn/template1/58364761Ne9af2203.jpg',
                        link: {actionType: '', actionParamId: ''}
                      }
                    ],
                    editLayerVisible: false
                  }
              },
              thematicTwo: {
                leftTitle: {
                  data: {
                    name: '优品专辑'
                  },
                  editLayerVisible: false
                },
                rightTitle: {
                  data: {
                    name: '甄选优质好物',
                    link: {actionType: '', actionParamId: ''}
                  },
                  editLayerVisible: false,
                },
                spus:
                  {
                    data: [
                      {
                        name: '夏天视觉更清爽，蓝色系手机大盘点',
                        images: [{image: 'http://images.lecshop.cn/template1/58f6f520N2634a95d.jpg'}, {image: 'http://images.lecshop.cn/template1/591ab1ceNc5e0dfb2.jpg'},
                          {image: 'http://images.lecshop.cn/template1/58a43e5bN541988be.jpg'}],
                        link: {actionType: '', actionParamId: ''}
                      },
                      {
                        name: '让老电视复活，智能高清网络盒子盘点',
                        images: [{image: 'http://images.lecshop.cn/template1/579eca00N10071b6f.jpg'}, {image: 'http://images.lecshop.cn/template1/582c1296N83eea7b8.jpg'}
                          , {image: 'http://images.lecshop.cn/template1/572b1183N752468ad.jpg'}
                        ],
                        link: {actionType: '', actionParamId: ''}
                      }
                    ],
                    editLayerVisible: false
                  }
              },
              thematicThree: {
                leftTitle: {
                  data: {name: '排行榜'},
                  editLayerVisible: false
                },
                rightTitle: {
                  data: {
                    name: '专属你的购物指南',
                    link: {actionType: '', actionParamId: ''}
                  },
                  editLayerVisible: false,
                },
                thematicTopNavIndex: 0,
                thematicTopNavLeftValue: '',
                tabs: [
                  {
                    data: {
                      name: '手机通讯',
                      spus: [
                        {
                          name: 'Apple iPhone 7 128G 红色特别版 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d484a0N1d9d2ebf.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀8青春版 全网通 标配版 3GB+32GB 流光金',
                          image: 'http://images.lecshop.cn/template1/58b3a327N6d555c9f.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/542d0798N19d42ce3.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '小米 红米 4X 全网通版 2GB+16GB 磨砂黑 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d87bc4N015a9502.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 铂光金',
                          image: 'http://images.lecshop.cn/template1/5825a5a6Nde8ecb75.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6s Plus (A1699) 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/57e4a358N9ccc6645.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                    },
                    editLayerVisible: false,
                  },
                  {
                    data: {
                      name: '打印机',
                      spus: [
                        {
                          name: 'Apple iPhone 7 128G 红色特别版 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/551b58e0Nd45a1f86.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀8青春版 全网通 标配版 3GB+32GB 流光金',
                          image: 'http://images.lecshop.cn/template1/58b3a327N6d555c9f.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/542d0798N19d42ce3.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '小米 红米 4X 全网通版 2GB+16GB 磨砂黑 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d87bc4N015a9502.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 铂光金',
                          image: 'http://images.lecshop.cn/template1/5825a5a6Nde8ecb75.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6s Plus (A1699) 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/57e4a358N9ccc6645.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                    },
                    editLayerVisible: false,
                  },
                  {
                    data: {
                      name: '路由器',
                      spus: [
                        {
                          name: 'Apple iPhone 7 128G 红色特别版 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d484a0N1d9d2ebf.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀8青春版 全网通 标配版 3GB+32GB 流光金',
                          image: 'http://images.lecshop.cn/template1/58b3a327N6d555c9f.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/542d0798N19d42ce3.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '小米 红米 4X 全网通版 2GB+16GB 磨砂黑 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d87bc4N015a9502.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 铂光金',
                          image: 'http://images.lecshop.cn/template1/5825a5a6Nde8ecb75.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6s Plus (A1699) 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/57e4a358N9ccc6645.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                    },
                    editLayerVisible: false,
                  },
                  {
                    data: {
                      name: '牛奶',
                      spus: [
                        {
                          name: 'Apple iPhone 7 128G 红色特别版 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/551b58e0Nd45a1f86.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀8青春版 全网通 标配版 3GB+32GB 流光金',
                          image: 'http://images.lecshop.cn/template1/58b3a327N6d555c9f.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/542d0798N19d42ce3.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '小米 红米 4X 全网通版 2GB+16GB 磨砂黑 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d87bc4N015a9502.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 铂光金',
                          image: 'http://images.lecshop.cn/template1/5825a5a6Nde8ecb75.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6s Plus (A1699) 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/57e4a358N9ccc6645.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                    },
                    editLayerVisible: false,
                  },
                  {
                    data: {
                      name: '保温杯',
                      spus: [
                        {
                          name: 'Apple iPhone 7 128G 红色特别版 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d484a0N1d9d2ebf.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀8青春版 全网通 标配版 3GB+32GB 流光金',
                          image: 'http://images.lecshop.cn/template1/58b3a327N6d555c9f.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/542d0798N19d42ce3.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '小米 红米 4X 全网通版 2GB+16GB 磨砂黑 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/58d87bc4N015a9502.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: '荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 铂光金',
                          image: 'http://images.lecshop.cn/template1/5825a5a6Nde8ecb75.jpg',
                          link: {actionType: '', actionParamId: ''}
                        },
                        {
                          name: 'Apple iPhone 6s Plus (A1699) 32G 金色 移动联通电信4G手机',
                          image: 'http://images.lecshop.cn/template1/57e4a358N9ccc6645.jpg',
                          link: {actionType: '', actionParamId: ''}
                        }
                      ],
                    },
                    editLayerVisible: false,
                  }
                ]
              }
            },)
            this.dialogModuleVisible = false
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case "3":
            // 还没逛够
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '8',
              name: '还没逛够',
              editLayerVisible: false,
              data: [
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                },
                {
                  image: 'http://images.lecshop.cn/template1/579eca00N11172b6f.jpg',
                  name: '华为荣耀盒子Pro 旗舰高清网络机顶盒 电视盒子 4K 杜比+DTS 智能语音 跨屏续播 互补式双天线wifi + 网口',
                  price: '449.00',
                  link: {actionType: '', actionParamId: ''}
                }
              ]
            });
            this.dialogModuleVisible = false
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case "4":
            // 标题
            this.template.modules.push({
              id: Date.parse(new Date()),
              moduleToolbarVisible: false,
              type: '4',
              data: {
                name: '爱生活'
              },
              editLayerVisible: false
            });
            this.dialogModuleVisible = false
            this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            break;
          case "5":
            // 广告位
            if (this.bannerRadio == '0') {
              //楼层通栏广告
              this.template.modules.push({
                id: Date.parse(new Date()),
                moduleToolbarVisible: false,
                type: '3',
                editLayerVisible: false,
                data: {
                  backColor: 'rgba(224,224,224,1)',
                  images: [
                    {
                      image: 'http://images.lecshop.cn/template1/591eaab8Na43232f7.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/template1/591ae900N46db9112.jpg',
                      link: {actionType: '', actionParamId: ''}
                    },
                    {
                      image: 'http://images.lecshop.cn/template1/591a6e8aNb0611d90.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }
                  ],
                },
              });
              this.dialogModuleVisible = false
              this.$refs.pageBottom.scrollIntoView({behavior: 'auto', block: 'start'})
            } else if (this.bannerRadio == '1') {
              //顶部通栏广告
              // 已经有 则提示已经存在 只能有一个顶部通栏广告
              if (this.template.topBanner) {
                this.$message({
                  type: 'error',
                  message: '已存在该模块,该模块只能添加一个!'
                });
              } else {
                this.template.topBanner = {
                  data: {
                    images: [{
                      image: 'http://images.lecshop.cn/template1/5911999bN7800713c.jpg',
                      link: {actionType: '', actionParamId: ''}
                    }],
                    backColor: 'rgba(233,158,15,1)',
                  },
                  editLayerVisible: false
                }
                this.dialogModuleVisible = false
              }
            } else if (this.bannerRadio == '2') {
              //导航通栏广告
              if (this.template.navBannerImgUrl) {
                this.$message({
                  type: 'error',
                  message: '已存在该模块,该模块只能添加一个!'
                });
              } else {
                this.template.navBannerImgUrl = {
                  data: [{
                    image: 'http://images.lecshop.cn/template1/591131a2N6363b4f8.jpg',
                    link: {actionType: '', actionParamId: ''}
                  }],
                  editLayerVisible: false
                }
                this.dialogModuleVisible = false
              }
            } else if (this.bannerRadio == '3') {
              // 二维码广告
              if (this.template.qrCode) {
                this.$message({
                  type: 'error',
                  message: '已存在该模块,该模块只能添加一个!'
                });
              } else {
                this.template.qrCode = {
                  data: {
                    image: 'http://images.lecshop.cn/template1/qrcode.png'
                  },
                  editLayerVisible: false
                }
                this.dialogModuleVisible = false
              }
            }
            break;
          default:
            break
        }
      },
      // 保存一级分类
      saveFirstCate() {
        if (!this.fCate.data.name) {
          this.showError('内容不能为空，请输入内容！');
          return;
        }
        this.template.category.first.push(JSON.parse(JSON.stringify(this.fCate)))
        this.fCate.data = {
          name: '',
          second: [],
          link: {actionType: '', actionParamId: ''}
        }
        this.firstCateLinkVisible = false;
      },

      //删除一级分类
      deleteFCate(index) {
        this.template.category.first.splice(index, 1);
      },
      // 编辑一级分类
      toEditFCate(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.topCateEditVisible = true;
      },
      //添加二级分类
      addSCate() {
        this.editObject.second.push({
            editLayerVisible: false,
            data: {
              name: '',
              third: [],
              link: {actionType: '', actionParamId: ''}
            }
          }
        );
      },
      // 更新一级分类
      updateFCate() {
        if (!this.editObject.name || !this.editObject.second || this.editObject.second.some(secondObj => !secondObj.data.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.topCateEditVisible = false;
      },
      // 编辑二级分类
      toEditSCate(item) {
        this.editObject = JSON.parse(JSON.stringify(item.data));
        this.editRef = item;
        this.secCateEditVisible = true;
      },
      // 添加三级分类
      addTCate() {
        this.editObject.third.push({name: '', link: {actionType: '', actionParamId: ''}});
      },
      // 删除三级分类
      deleteTCate(index) {
        if (!this.editObject.third || this.editObject.third.length < 2) {
          return;
        }
        this.editObject.third.splice(index, 1);
      },
      // 更新二级分类
      updateSCate() {
        if (!this.editObject.name || !this.editObject.third || this.editObject.third.some(thirdObj => !thirdObj.name)) {
          this.showError('存在内容为空的项目，请给每项都填写内容！');
          return;
        }
        this.editRef.data = JSON.parse(JSON.stringify(this.editObject));
        this.secCateEditVisible = false;
      },
      // 更新模版
      updateTemplate() {
        const template = {};
        template.id = 1;
        template.template = JSON.stringify(this.template);
        updateTemplate(template).then(() => {
          this.$message({
            type: 'success',
            message: '保存模板成功!'
          });
          this.queryTemplate();
        })
      },
      // 发布模版
      publishPageData() {
        this.$confirm('您确定要保存并发布此模板应用到前台首页设置？', '发布模板', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const template = {};
          template.id = 1;
          template.isChange = '1';
          template.template = JSON.stringify(this.template);
          updateTemplate(template).then(() => {
            this.$message({
              type: 'success',
              message: '首页模板已发布成功！请前往前台首页刷新页面查看！'
            });
            this.queryTemplate();
          })
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
