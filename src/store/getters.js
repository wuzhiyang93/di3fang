const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name: state => state.user.name,
  baseinfoset: state => state.baseinfoset.baseinfoset
}
export default getters
