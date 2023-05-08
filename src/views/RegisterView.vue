<template>
  <div
    class="max-w-[400px] mx-auto px-5 lg:px-0 min-h-screen flex flex-col items-center justify-center"
  >
    <div class="w-full">
      <h2 class="text-lg font-semibold">Üye Ol</h2>
      <form class="grid grid-cols-1 gap-5 mt-5">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium">Kullanıcı Adı:</label>
          <input
            type="text"
            v-model="username"
            required
            class="w-full h-10 p-3 text-xs font-semibold transition-all border outline-none placeholder:text-gray-500 focus:border-black valid:border-black"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium">E-Posta:</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full h-10 p-3 text-xs font-semibold transition-all border outline-none placeholder:text-gray-500 focus:border-black valid:border-black"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium">Şifre:</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full h-10 p-3 text-xs font-semibold transition-all border outline-none placeholder:text-gray-500 focus:border-black valid:border-black"
          />
        </div>
        <div class="text-xs">
          Zaten Üye misiniz ?
          <router-link to="/login" class="font-semibold text-blue-500 underline"
            >Giriş Yapın</router-link
          >
        </div>
        <button
          type="submit"
          @click.prevent="register"
          class="w-full h-10 text-xs text-white transition-colors bg-gray-500 hover:bg-gray-600"
        >
          Üye Ol
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: 'register',
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch("register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        if (this.$store.state.error === "") {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
  </script>
  