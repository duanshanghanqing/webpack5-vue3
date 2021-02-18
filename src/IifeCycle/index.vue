<template>
  <div>生命周期</div>
</template>

<script lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
export default {
  setup() {
      // 在 setup 内监听生命周期
    onBeforeMount(() => {
      // ...
    });
    onMounted(() => {
      // ...
    });
    onBeforeUpdate(() => {
      // ...
    });
    onUpdated(() => {
      // ...
    });
    onBeforeUnmount(() => {
      // ...
    });
    onUnmounted(() => {
      // ...
    });
    onActivated(() => {
      // ...
    });
    onDeactivated(() => {
      // ...
    });
    onErrorCaptured(() => {
      // ...
    });
    onRenderTriggered((event) => {
        console.log(event);
    });
  },
};
// 从Vue2 转换到 Vue3
/*
beforeCreate -> use setup() 初始化事件&生命周期
created -> use setup() 初始化注入&校验
                        将template编译到render函数中，或 将 el 外部的html作为template编译
beforeMount -> onBeforeMount 挂载在dom之前
mounted -> onMounted  挂载到dom之后
beforeUpdate -> onBeforeUpdate  当data响应式数据被修改时触发
updated -> onUpdated  当data响应式数据被修改时，虚拟dom重新渲染，并应用更新
beforeDestroy -> onBeforeUnmount   当调用 vm.$destroy()函数时，解除绑定销毁子组件以及事件监听器
destroyed -> onUnmounted    销毁完毕触发
errorCaptured -> onErrorCaptured 监听错误触发
*/

// 新的调试钩子函数
// 们还可以在Vue3中使用两个全新的钩子函数来进行调试。他们是：
// onRenderTracked
// onRenderTriggered
// 这两个事件都带有一个DebuggerEvent，它使我们能够知道是什么导致了Vue实例中的重新渲染。
// export default {
//   onRenderTriggered(e) {
//     debugger
//     // 检查哪个依赖项导致组件重新呈现
//   }
// }
</script>
