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

          <v-btn class="white--text" color="info" depressed @click="fetchSales">
            Atualizar
          </v-btn>
        </v-toolbar>

        <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
      </template>

      <template v-slot:item.sale_value="{ item }">
        <span>R$ {{ item.sale_value.toFixed(2).replace('.', ',') }}</span>
      </template>

      <template v-slot:item.commission_value="{ item }">
        <span>R$ {{ item.commission_value.toFixed(2).replace('.', ',') }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="viewSale(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    data: [],
    urlApi: 'http://localhost:8000/api', 
    loading: false,
  }),
  computed: {
    headers() {
      return [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'seller_name' },
        { text: 'Email', value: 'seller_email' },
        { text: 'Valor da Venda', value: 'sale_value' },
        { text: 'Comissão', value: 'commission_value' },
        { text: 'Data da Venda', value: 'sale_date' },
      ];
    },
    isShowList() {
      return this.data.length > 0;
    },
  },
  methods: {
    async fetchSales() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token'); 
        const sellerId = this.$route.params.seller_id; 

        const response = await fetch(`${this.urlApi}/sales/${sellerId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar vendas: ${response.status}`);
        }

        if (response.status === 204) {
          console.log('Nenhuma venda encontrada');
        } else {
          const result = await response.json();
          this.data = result.data;
        }
      } catch (error) {
        console.error('Erro ao buscar vendas:', error.message);
        this.$router.push('/login');
      } finally {
        this.loading = false;
      }
    },
    viewSale(item) {
      console.log('Visualizar venda:', item);
    },
  },
  mounted() {
    this.fetchSales();
  },
};
</script>
