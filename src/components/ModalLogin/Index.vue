<template>
  <div class="d-flex flex-column">
    <div class="modal-login-titles login">
      <h1 class="login__title">Entre na sua conta</h1>
      <p class="login__subtitle">
        Para acesssar sua conta informe seu e-mail e senha
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="modal-login-inputs loginForm">
      <div class="loginInputsGroup">
        <div class="d-flex">
          <input
            type="text"
            class="loginForm__input"
            v-model="state.email.value"
            placeholder="Seu e-mail"
          />
          <span v-if="!!state.email.errorMessage" class="loginForm--error">{{
            state.email.errorMessage
          }}</span>
        </div>

        <div class="d-flex">
          <input
            type="password"
            v-model="state.password.value"
            placeholder="Seu senha"
            class="loginForm__input"
          />
          <span class="loginForm--error">{{
            state.password.errorMessage
          }}</span>
        </div>
      </div>
      <a class="loginForm__forgotPassword">Esqueceu a senha?</a>

      <div class="modal-login-buttons">
        <button
          :disabled="!!state.isLoading"
          type="submit"
          class="loginForm__button btn btn-primary"
        >
          Login
        </button>
      </div>

      <div class="loginSocial d-flex">
        <div class="loginSocial__text d-flex">
          <span class="loginSocial__lineBefore"></span>
          <span class="loginSocial__text">Ou entre com</span>
          <span class="loginSocial__lineAfter"></span>
        </div>       
      </div>

      <div class="loginSocial__icon d-flex">
          <span class="loginSocial__icon--Google"><img src="../../assets/google.svg" alt=""></span>
          <span class="loginSocial__text--Google">Google</span>
      </div>


    </form>
  </div>
</template>

<style>
.login__title {
  font-size: 20px;
  font-weight: bold;
}

.login__subtitle {
  font-size: 13px;
  color: #636363;
}

.loginForm {
  display: flex;
  flex-direction: column;
}

.loginForm__input {
  width: 100%;
  border: 1px solid #818181;
  border-radius: 12px;
  padding: 16px;
}

.loginForm__input::placeholder {
  font-size: 14px;
  color: #6f6f6f;
}

.loginForm__button {
  width: 100%;
  padding: 1rem 0;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
}

.loginForm__forgotPassword {
  color: #4285f4;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  align-self: end;
  margin-bottom: 2rem;
}

.loginInputsGroup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loginSocial {
  margin-top: 2rem;
  justify-content: center;
}

.loginSocial__lineBefore::before,
.loginSocial__lineAfter::after {
  content: "";
  display: inline-block;
  width: 100px; /* ajuste o comprimento da linha conforme necessário */
  border-top: 1px solid #a39797; /* cor e estilo da linha */
  margin: 0 10px; /* espaço em branco entre a linha e o texto */
}

.loginSocial__lineBefore::before {
  margin-right: 20px;
}

.loginSocial__lineAfter::after {
  margin-right: 20px;
}

.loginSocial__text {
  font-size: 12px;
  color: #757171;
}

.loginSocial__icon {
  margin-top: 2rem;
  justify-content: center;
}
</style>


<script>
import { reactive } from "vue";
import { useField } from "vee-validate";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators.js";
import services from "../../services";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );
    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          username: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Dashboard" });
          state.isLoading = false;
          return;
        }

        if (errors.status == 404) {
          toast.error("E-mail não encontrado");
        }
        if (errors.status == 401) {
          toast.error("E-mail ou senha inválidos");
        }
        if (errors.status == 400) {
          toast.error("Ocorreu um erro ao fazer o login");
        }

        state.isLoading = false;
      } catch (error) {
        console.log(error);
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao fazer o login");
      }
    }

    return { state, handleSubmit };
  },
};
</script>