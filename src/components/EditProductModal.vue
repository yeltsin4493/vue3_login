<!-- src/components/EditProductModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Product</h5>
                    <button type="button" class="btn-close" @click="$props.onClose()"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateProduct">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="editName" v-model="editedProduct.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="editPrice" class="form-label">Price</label>
                            <input type="number" class="form-control" id="editPrice" v-model="editedProduct.price"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="editDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="editDescription" v-model="editedProduct.description"
                                required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,  defineProps, defineEmits } from 'vue';
import { useProductsStore } from '../stores/products';

const props = defineProps(["product", "onClose"]);
const emits = defineEmits(["update"]);

const editedProduct = ref({ ...props.product });

const productStore = useProductsStore();

const updateProduct = async () => {
    await productStore.updateProduct(editedProduct.value);
    emits('update')
    props.onClose();
};
</script>
