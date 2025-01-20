<template>
  <div>
    <v-divider class="mx-2" inset vertical></v-divider>

    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
      light
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-text': 'Itens por página'
      }"
      :search="search"
      :loading="loading"
      v-if="isShowList"
    >
      <template v-slot:no-data>Sem dados disponíveis</template>

      <template v-slot:top>
        <v-toolbar flat color="primary">
          <v-toolbar-title>
            <v-icon color="default" size="36" class="mr-5">mdi-sitemap</v-icon>
            Vendedores
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn class="white--text" color="info" depressed @click="fetchSellers">
            Atualizar
          </v-btn>

          <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="viewSeller(item)">mdi-eye</v-icon>
        <v-icon
          small
          class="mr-2"
          color="primary"
          @click="goToSales(item.id)"
        >
          mdi-cart-outline
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    data: [],
    urlApi: 'http://localhost:8000/api', // Substitua pela URL real da API
    loading: false,
  }),
  computed: {
    headers() {
      return [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Comissão', value: 'total_comission' },
        { text: 'Ações', value: 'actions', sortable: false },
      ];
    },
    isShowList() {
      return this.data.length > 0;
    },
  },
  methods: {
    async fetchSellers() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token'); // Obtenha o token armazenado

        const response = await fetch(`${this.urlApi}/sellers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Adicione o token no cabeçalho
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar vendedores');
        }

        if (response.status === 204) {
          console.log('Nenhum vendedor encontrado');
        } else {
          const result = await response.json();
          this.data = result.data;
        }
      } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
        this.$router.push('/login');
      } finally {
        this.loading = false;
      }
    },
    viewSeller(item) {
      // Função para visualizar os detalhes do vendedor
      console.log('Visualizar vendedor:', item);
    },
    goToSales(sellerId) {
      // Redireciona para a página de vendas do vendedor
      this.$router.push(`/sales/${sellerId}`);
    },
  },
  mounted() {
    this.fetchSellers(); // Busca os vendedores ao carregar a página
  },
};
</script>
