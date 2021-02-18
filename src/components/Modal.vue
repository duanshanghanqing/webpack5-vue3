<template>
    <!-- 传送带组件，把包裹的组件挂载到指定的标签上 -->
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
          <slot>this is a modal</slot>
          <button @click="buttonClick">关闭</button>
      </h2>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        isOpen: Boolean,
    },
    // 注册 子组件触发父组件的方法
    emits: {
        'close-modal': (payload: any) => { // payload: 接收事件的参数
            return payload.type === 'close';
        }
    },
    setup(props, context) {
        // context: 当前上下文
        // context.emit('close-modal', { type: 'close' });

        const buttonClick = () => {
            // 触发事件
            context.emit('close-modal', { type: 'close' });
        }

        return {
            buttonClick,
        }
    }
})
</script>

<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid #000000;
  background: #ffffff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>