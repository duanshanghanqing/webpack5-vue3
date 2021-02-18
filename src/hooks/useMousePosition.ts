import { onMounted, onUnmounted, ref } from "vue";

function useMousePosition() {
    const x = ref(0);
    const y = ref(0);
    const updataMouse = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    }
    onMounted(() => {
        document.addEventListener('click', updataMouse);
    });
    onUnmounted(() => {
        document.removeEventListener('click', updataMouse);
    });
    return {
        x,
        y
    };
}

export default useMousePosition;