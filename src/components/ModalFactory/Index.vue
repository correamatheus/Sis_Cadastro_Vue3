<template>
  <teleport to="body">
    <div
      class=".modall"
      v-if="state.isActive"
      tabindex="-1"
      @click="handleModalToggle({ status: false })"
    >
     
        <div class="modal-contentt" @click.stop>
          <component :is="state.component" />
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

const ModalLogin = defineAsyncComponent(() => import("../ModalLogin/Index.vue"));
const ModalAccountCreate  = defineAsyncComponent(() => import("../ModalCreateAccount/Index.vue"));
export default {
  components: { ModalLogin, ModalAccountCreate },
  setup() {
    const modal = useModal();
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
    });

    

    function handleModalToggle(payload) {
      console.log("Payload");
      console.log(state.isActive)
      if (payload.status) {
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
/* Estilo do modal */
.modall {
  display: none; /* Inicialmente esconde o modal */
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com transparência */
}

.modal-contentt {
  background-color: #fff;
  width: 400px;
  margin: 100px auto; /* Centraliza vertical e horizontalmente */
  padding: 20px;
  border-radius: 5px;
}

/* Estilo do botão de fechar */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

/* Estilo do botão de fechar no hover */
.close:hover {
  color: #000;
}
</style>