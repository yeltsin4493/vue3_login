import { defineStore } from 'pinia';
import apiClient from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await apiClient.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Failed to load products', error);
      }
    },
    async addProduct(product: Product) {
      try {
        await apiClient.post('/products', product);
        await this.fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error('Failed to add product', error);
      }
    },
    async updateProduct(product: Product) {
      try {
        await apiClient.put(`/products/${product.id}`, product);
        await this.fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error('Failed to update product', error);
      }
    },
    async deleteProduct(id: number) {
      try {
        await apiClient.delete(`/products/${id}`);
        await this.fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    },
  },
});
