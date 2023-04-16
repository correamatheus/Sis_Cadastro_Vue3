<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      tabindex="-1"
      @click="handleModalToggle({ status: false })"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <component :is="state.component" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
} from "vue";
import useModal from "../../hooks/useModal";

const ModalLogin = defineAsyncComponent(() => import("../ModalLogin/Index.vue"))
export default {
  components: { ModalLogin },
  setup() {
    const modal = useModal();
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
    });

    function handleModalToggle(payload) {
      console.log("Payload");
      if (payload.status) {
        console.log("Payload");
        state.component = payload.component;
        state.props = payload.props;
      } else {
        console.log("Payload");
        state.component = {};
        state.props = {};
      }

      state.isActive = payload.status;
    }

    onMounted(() => {
      modal.listen(handleModalToggle);
    });

    onBeforeUnmount(() => {
      modal.off(handleModalToggle);
    });

    return { state, handleModalToggle };
  },
};
</script>

<style>
</style>