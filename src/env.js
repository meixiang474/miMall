let baseURL

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.spring.cn/api'
    break
  case 'test':
    baseURL = 'http://test-mall-pre.spring.cn/api'
    break
  case 'production':
    baseURL = 'http://mall-pre.spring.cn/api'
    break
  default:
    baseURL = 'http://mall-pre.spring.cn/api'
    break
}

export default baseURL
