/**
 * 评论路由
 *
 * @author Caizize created on 2019/5/23
 */

import request from '@/utils/request';


/**
 * 分页查询评论列表
 *
 * @param query 查询参数
 */
export function queryComments(query) {
  return request({
    url: 'comments',
    method: 'get',
    params: query
  })
}

/**
 * 根据id查询评论信息详情
 *
 * @param id 评论id
 */
export function queryCommentById(id) {
  return request({
    url: 'comment/' + id,
    method: 'get',
  })
}

/**
 * 更新评论显示状态
 *
 * @param commentId 评论id
 * @param isShow  是否显示 0显示 1不显示
 */
export function updateCommentIsShow(commentId, isShow) {
  return request({
    url: 'updatecommentisshow/' + commentId,
    method: 'put',
    params: {isShow: isShow}
  })
}

/**
 * 更新回复显示状态
 *
 * @param replyId 回复id
 * @param isShow  是否显示 0显示 1不显示
 */
export function updateReplyIsShow(replyId, isShow) {
  return request({
    url: 'updatereplyisshow/' + replyId + '/' + isShow,
    method: 'put'
  })
}

/**
 * 新增回复
 *
 * @param commentReply 回复信息
 */
export function addCommentReply(commentReply) {
  return request({
    url: 'addcommentreply',
    method: 'post',
    data: commentReply
  })
}

/**
 * 删除评论
 *
 * @param ids 评论id数组
 */
export function deleteComment(ids) {
  return request({
    url: 'comment',
    method: 'delete',
    params: ids
  })
}
