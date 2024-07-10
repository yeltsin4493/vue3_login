<!-- src/components/DeleteProductModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Delete</h5>
                    <button type="button" class="btn-close" @click="props.onClose()"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this product?</p>
                    <div class="text-end">
                        <button class="btn btn-secondary me-2" @click="props.onClose()">Cancel</button>
                        <button class="btn btn-danger" @click="deleteProduct">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useProductsStore } from '../stores/products';

const props = defineProps<{ productId: number; onClose: () => void }>();
const emits = defineEmits(["update"]);

const productStore = useProductsStore();

const deleteProduct = async () => {
    await productStore.deleteProduct(props.productId);
    emits('update')
    props.onClose();
};
</script>
