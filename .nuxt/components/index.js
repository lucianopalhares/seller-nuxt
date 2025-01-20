export { default as Logo } from '../../components/Logo.vue'
export { default as UserForm } from '../../components/UserForm.vue'
export { default as Loading } from '../../components/loading.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyUserForm = import('../../components/UserForm.vue' /* webpackChunkName: "components/UserForm" */).then(c => c.default || c)
export const LazyLoading = import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => c.default || c)
