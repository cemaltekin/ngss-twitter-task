<template>
  <nav
    class="fixed left-0 top-0 transition-all max-w-[80px] md:max-w-[300px] rounded-r-2xl bg-gradient-to-b from-gray-500 to-gray-400 dark:from-gray-700 dark:to-gray-500 h-screen min-h-screen max-h-screen overflow-y-auto gap-5 md:gap-1 flex flex-col w-full p-2.5 text-white"
  >
    <!--navigation links-->
    <router-link
      active-class="text-gray-700 bg-white"
      class="flex items-center justify-center h-10 gap-2 px-2 transition-colors duration-500 rounded-lg py-7 md:h-auto md:justify-start md:p-5 hover:bg-white hover:text-gray-700"
      to="/"
    >
      <font-awesome-icon icon="fa-solid fa-home" />
      <span class="hidden md:block">Dashboard</span>
    </router-link>
    <router-link
      active-class="text-gray-700 bg-white"
      class="flex items-center justify-center h-10 gap-2 px-2 transition-colors duration-500 rounded-lg py-7 md:h-auto md:justify-start md:p-5 hover:bg-white hover:text-gray-700"
      to="/user-details"
    >
      <font-awesome-icon icon="fa-solid fa-user" />
      <span class="hidden md:block">User Details</span>
    </router-link>
    <router-link
      active-class="text-gray-700 bg-white"
      class="flex items-center justify-center h-10 gap-2 px-2 transition-colors duration-500 rounded-lg py-7 md:h-auto md:justify-start md:p-5 hover:bg-white hover:text-gray-700"
      to="/last-tweets"
    >
      <font-awesome-icon icon="fa-brands fa-twitter" />
      <span class="hidden md:block">Last Tweets</span>
    </router-link>
    <!--dark mode-->
    <div class="pt-5 mt-auto">
      <label
        for="darkModeToggler"
        class="bg-[#fff] w-[50px] h-[26px] rounded-full relative p-1.5 cursor-pointer flex items-center justify-between ml-auto mb-5"
      >
        <input
          ref="darkModeRef"
          type="checkbox"
          id="darkModeToggler"
          class="hidden"
          @change="toggleDarkMode"
        />
        <font-awesome-icon icon="fa-solid fa-moon" />
        <font-awesome-icon icon="fa-solid fa-sun" />
        <span class="ball"></span>
      </label>
      <div
        class="flex items-center justify-center px-2 py-5 mt-auto transition-colors duration-500 rounded-lg md:justify-between hover:bg-white hover:text-gray-700 md:p-5"
      >
        <div class="hidden md:block">{{ user.displayName }}</div>
        <button @click="logout" class="rotate-180 rounded-lg">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    //log out method
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          localStorage.setItem('darkMode', false)
          document.querySelector("html").classList.remove("dark")
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    // dark mode method
    toggleDarkMode() {
      const darkMode = localStorage.getItem("darkMode");
      const newDarkMode = darkMode === "true" ? "false" : "true";

      document.querySelector("html").classList.toggle("dark");
      localStorage.setItem("darkMode", newDarkMode);
    }

  },
  computed: {
    user() {
      return this.$store.state.user || {};
    }
  },
  mounted() {
    // dark mode kontrolü
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
      document.querySelector("html").classList.add("dark");
      this.$refs.darkModeRef.checked = true;
    } else {
      document.querySelector("html").classList.remove("dark");
      this.$refs.darkModeRef.checked = false;
    }
  }
}
</script>

<style scoped>
.fa-moon {
  color: #f1c40f;
}

.fa-sun {
  color: #f39c12;
}

label[for='darkModeToggler'] .ball {
  background-color: #444;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: transform 0.2s linear;
}

#darkModeToggler:checked ~ .ball {
  transform: translateX(24px);
}
</style>
