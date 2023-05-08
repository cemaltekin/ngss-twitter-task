<template>
  <div
    class="max-w-[400px] mx-auto px-5 lg:px-0 min-h-screen flex flex-col items-center justify-center"
  >
    <div class="w-full">
      <h2 class="text-lg font-semibold">Giriş Yap</h2>
      <form class="grid grid-cols-1 gap-5 mt-5">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-xs font-medium">E-Posta:</label>
          <input
            class="w-full h-10 p-3 text-xs font-semibold transition-all border outline-none placeholder:text-gray-500 focus:border-black valid:border-black"
            type="email"
            id="email"
            name="email"
            v-model="email"
            placeholder="E-Posta Adresi"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-xs font-medium">Şifre:</label>
          <input
            class="w-full h-10 p-3 text-xs font-semibold transition-all border outline-none autofill:bg-yellow-200 placeholder:text-gray-500 focus:border-black valid:border-black"
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Şifre"
            required
          />
        </div>
        <div class="text-xs">
          Hesabınız yok mu ?
          <router-link
            to="/register"
            class="font-semibold text-blue-500 underline"
            >Hemen Üye Olun</router-link
          >
        </div>
        <button
          type="submit"
          @click.prevent="login"
          class="w-full h-10 text-xs text-white transition-colors bg-gray-500 hover:bg-gray-600"
        >
          Giriş Yap
        </button>
        <span
          @click="loginWithGoogle"
          class="flex items-center justify-center w-full h-10 gap-2.5 text-xs text-gray-600 border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          <img class="max-w-[20px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
            alt=""
          />
          <span>Sign İn With Google</span>
        </span>
      </form>
    </div>
  </div>
</template>
  
  <script>
import 'mosha-vue-toastify/dist/style.css'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['signInWithGoogle']),
    async loginWithGoogle() {
      await this.signInWithGoogle()
      this.$router.push("/");
    },
    async login() {
      const { email, password } = this
      await this.$store.dispatch('login', { email, password })
      this.$router.push('/');
    },
  }
}
  </script>
  