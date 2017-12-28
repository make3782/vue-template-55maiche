/**
 * ajax 接口请求统一放在这里管理
 */
import http from './http'

/**
 * 测试
 */
export const api_test = () => http.apiPost('/index/wzx', {aid:1})
