import { ref } from 'vue';
import axios from 'axios';

export default function useURLLoade<T>(url: string) {
    const result = ref<T | null>(null);
    const loading = ref(true);
    axios.get(url).then((resData) => {
        result.value = resData.data;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    });
    return {
        result,
        loading
    };
}