export const state = () => ({
    user: null, // Dados do usuário atual
    isLoggedIn: false, // Indica se o usuário está logado
  });
  
  export const getters = {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  };
  
  export const mutations = {
    SET_USER(state, payload) {
      state.user = payload;
      state.isLoggedIn = !!payload; // Atualiza o estado de login
    },
    RESET_USER(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  };
  
  export const actions = {
    /**
     * Fetch the user data from an API or authentication service
     */
    async fetchUser({ commit }) {  
      try {
        const response = await this.$axios.$get('/user');
        console.log('fetchUser', response)
        if (response && response.status) {
          commit("SET_USER", response.user);
          this.commit("config/SET_LOADING", false);
        } else {
          this.$toast.error(response.msg || "Error fetching user data", {
            position: 'top-right',
            duration: 3000,
            keepOnHover: true,
          });
          commit("RESET_USER");
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right',
          duration: 3000,
          keepOnHover: true,
        });
        commit("RESET_USER");
      }
    },
  
    async loginUser({ commit }, userData) {
        this.commit("config/SET_LOADING", true);
      
        try {
          const response = await this.$axios.$post('/login', userData);
          console.log('response', response);
      
          if (response && response.token) {
            // Armazena o token no localStorage
            localStorage.setItem('token', response.token);
      
            commit("SET_USER", response.user);
      
            this.$toast.success(response.msg || "Sucesso!", {
              position: 'top-right',
              duration: 3000,
              keepOnHover: true,
            });

            this.$router.push('/sellers');
            //window.location.href = '/sellers';
          } else {
            this.$toast.error(response.msg || "Login falhou", {
              position: 'top-right',
              duration: 3000,
              keepOnHover: true,
            });
          }
        } catch (error) {
          this.$toast.error(error.message, {
            position: 'top-right',
            duration: 3000,
            keepOnHover: true,
          });
        } finally {
          this.commit("config/SET_LOADING", false);
        }
      },
      
  
    /**
     * Log out the current user
     */
    async logoutUser({ commit }) {
      this.commit("config/SET_LOADING", true);
  
      try {

        const token = localStorage.getItem('token');

        // Se o token existir, faz a requisição de logout
        if (token) {
          const response = await this.$axios.$post(
            'logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Adiciona o Bearer token no cabeçalho
              }
            }
          );

          // Ação após o logout bem-sucedido, como redirecionamento ou limpeza de estado
          console.log('Logout response', response);
          
          if (response && response.message) {
            commit("RESET_USER");
            this.$toast.success(response.message || "Saiu com sucesso!", {
              position: 'top-right',
              duration: 3000,
              keepOnHover: true,
            });
  
            this.$removeToken()
            this.$router.push('/login');
          } else {
            this.$toast.error(response.message || "Logout failed", {
              position: 'top-right',
              duration: 3000,
              keepOnHover: true,
            });
          }
        } else {
          console.log('Token de autenticação não encontrado');
        }
        

      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right',
          duration: 3000,
          keepOnHover: true,
        });
      } finally {
        this.commit("config/SET_LOADING", false);
      }
    },
  
    /**
     * Update user data
     */
    async updateUser({ commit }, userData) {
      this.commit("config/SET_LOADING", true);
  
      try {
        const response = await this.$axios.$patch('/api/user', userData);
        if (response && response.status) {
          commit("SET_USER", response.user);
          this.$toast.success(response.msg || "User updated successfully!", {
            position: 'top-right',
            duration: 3000,
            keepOnHover: true,
          });
        } else {
          this.$toast.error(response.msg || "Failed to update user", {
            position: 'top-right',
            duration: 3000,
            keepOnHover: true,
          });
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right',
          duration: 3000,
          keepOnHover: true,
        });
      } finally {
        this.commit("config/SET_LOADING", false);
      }
    },
  };
  