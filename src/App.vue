<template>
  <div>
    <button @click="increase">
      <!-- vue 内部对 count 做了处理，能直接使用-->
      Clicked {{ count }} times.
    </button>
    <p>{{ double }}</p>
    <br />

    <h2>动态添加属性</h2>
    <ul>
      <li v-for="number of numbers" :key="number">{{ number }}</li>
    </ul>
    <div>{{ person.name }}</div>

    <br />
    <h2>watch</h2>
    <p>{{ greetings }}</p>
    <button @click="updataGreeting">updataGreeting</button>

    <br />
    <h2>显示坐标</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <br />
    <h2>加载图片</h2>
    <p v-if="loading">加载中...</p>
    <img v-if="result" :src="result.message" />

    <br />
    <h2>Modal</h2>
    <div>
      <button @click="setModalIsOpen(true)">打开</button>
      <button @click="setModalIsOpen(false)">关闭</button>
    </div>
    <Modal :isOpen="modalIsOpen" @close-modal="setModalIsOpen(false)" />

    <br />
    <h2>AsyncShow</h2>
    <Suspense>
      <template #default>
        <div>
          <async-show />
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <h1>加载中...</h1>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
h2 {
  color: aqua;
}
</style>

<style scoped lang="less" rel="stylesheet/less">
@import "./assets/less/app.less";
h2 {
  font-weight: bold;
  background-color: rgb(32, 163, 119);
}
</style>

<script lang="ts">
/*
import { defineComponent, ref, computed } from "vue";
// 1
export default defineComponent({
  // 访问不到this
  setup() {
    const count = ref(0); // 返回一个响应式对象
    const increase = () => {
      count.value++;
    };
    // computed: 计算方法，内部依赖的值变了返回新值
    const double = computed(() => {
      return count.value * 2;
    });
    return {
      count,
      double,
      increase,
    };
  },
});
*/

/*
import { defineComponent, ref, computed, reactive, toRefs } from "vue";
// 2 改写1
export default defineComponent({
    setup() {
        const data = reactive({
            count: 0,
            increase: () => { data.count++; }, // 每次加1
            double: computed(() => data.count * 2), // count 变化 * 2
        });

        // 直接这样返回，没有用。因为丢失了响应式模仿
        // return {
        //     ...data,
        // }

        // 需要用 toRefs 包一下
        return {
            ...toRefs(data)
        }

    }
})
*/

import { defineComponent, ref, computed, reactive, toRefs, watch, onErrorCaptured } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from './components/DogShow.vue';
interface DogResult {
  message: string;
  status: string;
}
export default defineComponent({
  setup(props, context) {
    onErrorCaptured((e: any) => {
      console.log(e);
      return true;// 表示向上传播
    });

    const data = reactive({
      count: 0,
      increase: () => {
        data.count++;
      }, // 每次加1
      double: computed(() => data.count * 2), // count 变化 * 2

      // vue2 返回的data是个响应式对象，不支持对象动态添加属性成响应式，数组添动态加元素成响应式，
      // 需要使用 Vue.set(vm.obj, 'b', 2), this.set(this.obj, 'b', 2) 来解决
      // 因为 vue2 使用了 Object.defineProperty(data, 'count', { get() {}, set() {} }) ,
      // 这个方法比较弱，对新新增加的key需要手动调一下

      // vue3使用了 new Proxy(data, { get(key) {}, set(key, value) {}, }), 对任意key进行拦截

      numbers: [],
      person: {},
    });

    // 两秒后就渲染在模版上了, 让 Vue.set 成了过去式
    setTimeout(() => {
      data.numbers[0] = 1;
      data.numbers.push(2);
      data.person.name = "张三";
    }, 2000);

    // 测试watch
    const greetings = ref("");
    const updataGreeting = () => {
      greetings.value += "Hello! ";
    };
    // 监听的是一个响应式对象，同时监听多个，就是个数组
    // watch(greetings, (newValue, oldValue) => {
    //   console.log("newValue", newValue);
    //   console.log("oldValue", oldValue);
    //   document.title = `${greetings.value}`;
    // });

    // 监听多个值
    // watch([greetings, data], (newValue, oldValue) => {
    //   console.log("newValue", newValue);
    //   console.log("oldValue", oldValue);
    //   document.title = `${greetings.value} ${data.count}`;
    // });

    // 监听具体值, 响应式具体值需要用 函数包装一下
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log("newValue", newValue);
      console.log("oldValue", oldValue);
      document.title = `${greetings.value} ${data.count}`;
    });

    const { x, y } = useMousePosition();
    const { result, loading } = useURLLoader<DogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );
    // https://api.thecatapi.com/v1/images/search?limit=1

    const modalIsOpen = ref(false);
    const setModalIsOpen = (isOpen: boolean) => {
      modalIsOpen.value = isOpen;
    };
    return {
      ...toRefs(data), // 需要用 toRefs 包一下
      greetings,
      updataGreeting,
      x,
      y,
      result,
      loading,
      modalIsOpen,
      setModalIsOpen,
    };
  },
  components: {
    Modal,
    AsyncShow,
    DogShow,
  },
});
</script>
