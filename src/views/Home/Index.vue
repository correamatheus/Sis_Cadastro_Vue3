<template>
  <custom-header @login="handleLogin" @create-account="handleAccountCreate" />
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useModal from '../../hooks/useModal'

export default {
    components: {CustomHeader},
    setup() {
        const router = useRouter();
        const modal = useModal();

        onMounted(() => {
            const token = window.localStorage.getItem('token')
            if (token) {
                router.push({ name: 'Home' })
            }
        })

        function handleLogin () {
           modal.open({
            component: 'ModalLogin'
           })
        }
         function handleAccountCreate () {
            modal.open({
            component: 'ModalAccountCreate'
           })
        }
        return {
            handleLogin,
            handleAccountCreate
        }
        
    }
}
</script>

<style>

</style>