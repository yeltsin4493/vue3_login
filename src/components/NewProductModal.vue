<!-- src/components/NewProductModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Product</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addProduct">
                        <div class="mb-3">
                            <label for="newName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="newName" v-model="newProduct.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="newPrice" class="form-label">Price</label>
                            <input type="number" class="form-control" id="newPrice" v-model="newProduct.price" required>
                        </div>
                        <div class="mb-3">
                            <label for="newDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="newDescription" v-model="newProduct.description"
                                required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { useProductsStore } from '../stores/products';

const props = defineProps<{
    onClose: () => void;
}>();
const emits = defineEmits(["update"]);

const newProduct = ref({ id: 0, name: '', price: 0, description: '' });

const productStore = useProductsStore();

const addProduct = async () => {
    await productStore.addProduct(newProduct.value);
    emits('update')
    props.onClose()
    // newProduct.value = { name: '', price: 0, description: '' };
};

const closeModal = () => {
    props.onClose()
};

</script>
