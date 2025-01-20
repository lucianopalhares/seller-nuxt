export const state = () => ({
    vendors: [],
  })
  
  export const mutations = {
    setVendors(state, vendors) {
      state.vendors = vendors
    },
  }
  
  export const actions = {
    async createVendor({ commit }, vendorData) {
      try {
        const response = await this.$axios.$post('/vendors', vendorData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        })
        return response
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create vendor')
      }
    },
    async getVendors({ commit }) {
      try {
        const response = await this.$axios.$get('/vendors', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        })
        commit('setVendors', response)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch vendors')
      }
    },
  }
  