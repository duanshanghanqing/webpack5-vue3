<template>
    <h3>{{ result }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        // 返回一个 Promise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    result: 42
                });
            }, 3000);
        });
    }
})
</script>
