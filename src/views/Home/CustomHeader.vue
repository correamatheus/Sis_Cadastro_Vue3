<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Logo</a>
            <div class="flex">
                <button class="btn" @click="() => emit('create-account')">Crie uma conta</button>
                <button class="btn" @click="() => emit('login')">Entrar</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  setup (_, { emit }) {
    return { emit }
  }
}
</script>
