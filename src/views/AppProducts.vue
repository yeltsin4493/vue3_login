<template>
    <AppNavbar />
    <div class="container mt-4">
        <h2>Products</h2>
        <button class="btn btn-primary mb-3" @click="showAddProductModal = true">Add Product</button>

        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col" class="d-none d-md-table-cell">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productStore.products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td class="d-none d-md-table-cell">{{ product.description }}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Product Actions">
                                <button class="btn btn-primary btn-sm me-1" @click="editProduct(product)">Edit</button>
                                <button class="btn btn-danger btn-sm" @click="confirmDelete(product.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <NewProductModal v-if="showAddProductModal" :onClose="closeAddModal" @update="fetchProducts" />
        <EditProductModal :product="selectedProduct" :onClose="closeEditModal" v-if="showEditProductModal" @update="fetchProducts" />
        <DeleteProductModal :productId="selectedProductId" :onClose="closeDeleteModal" v-if="showDeleteProductModal" @update="fetchProducts" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductsStore } from '../stores/products';
import EditProductModal from '@/components/EditProductModal.vue';
import DeleteProductModal from '@/components/DeleteProductModal.vue';
import NewProductModal from '@/components/NewProductModal.vue';
import AppNavbar from '@/components/AppNavbar.vue';

const productStore = useProductsStore();
const showAddProductModal = ref(false);
const showEditProductModal = ref(false);
const showDeleteProductModal = ref(false);
const selectedProductId = ref(0);
const selectedProduct = ref({});

const editProduct = (product: any) => {
    selectedProduct.value = { ...product };
    showEditProductModal.value = true;
};

const confirmDelete = (productId: number) => {
    selectedProductId.value = productId;
    showDeleteProductModal.value = true;
};

const closeAddModal = () => {
    showAddProductModal.value = false;
};

const closeEditModal = () => {
    showEditProductModal.value = false;
};

const closeDeleteModal = () => {
    showDeleteProductModal.value = false;
};

const fetchProducts = () => {
    productStore.fetchProducts();
};

onMounted(() => {
    fetchProducts();
});
</script>

<style scoped>
@media (max-width: 767px) {
    .d-none.d-md-table-cell {
        display: none !important;
    }
}
</style>
