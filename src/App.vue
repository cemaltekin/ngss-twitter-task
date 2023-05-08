<template>
  <Sidebar v-if="user" />
  <div
    class="min-h-screen bg-[#f7f7f7] dark:bg-gray-700"
    :class="[user ? 'pl-[100px] md:pl-[320px]  pt-5 pr-5 pb-20' : '']"
  >
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from './components/Sidebar.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      isAuthenticated: false
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style>
* {
  transition: 0.2s background-color, 0.2s color;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  transition-delay: 3600s;
}
</style>
