const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  id: state => state.user.id,
  AuthCode: state => state.user.authCode,
  apiUrl:state=>"http://61.147.70.90:55301/api",
  loginUrl:state=>"http://61.147.70.90:9000"
}
export default getters
