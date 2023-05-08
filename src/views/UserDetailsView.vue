<template>
  <h2 class="text-2xl font-semibold text-gray-700 dark:text-white">
    Kullanıcı profilini görmek için seçim yapmanız gerekir.
  </h2>
  <div class="pb-10 mt-5">
    <div
      class="flex items-center justify-center"
      v-if="loading || !twitterUsers.length"
    >
      <Spinner />
    </div>
    <select
      v-else
      name=""
      id=""
      class="w-full p-5 bg-white rounded-lg outline-none dark:bg-gray-600 dark:text-white"
      @change="userFilter"
    >
      <option value="#" selected>Seçim yapınız...</option>
      <option :value="user.id" v-for="user in twitterUsers" :key="user.id">
        {{ user.id }} - {{ user.name }}
      </option>
    </select>
    <div class="mt-5" v-if="filteredUser">
      <div
        class="w-full pt-[40%] md:pt-[30%] rounded-t-lg relative overflow-hidden"
      >
        <img
          :src="filteredUser.banner_image || 'https://via.placeholder.com/1000'"
          class="absolute top-0 left-0 object-cover w-full h-full"
          alt=""
        />
      </div>
      <div
        class="max-w-[100px] lg:max-w-[200px] w-full -mt-[50px] lg:-mt-[100px] ml-2 lg:ml-5 transition-all duration-500"
      >
        <div class="overflow-hidden w-full pt-[100%] relative rounded-full">
          <img
            :src="
              filteredUser.profile_image ||
              'https://im.haberturk.com/2017/04/01/ver1491048533/1446864_620x410.jpg'
            "
            class="absolute top-0 left-0 object-cover w-full h-full"
            alt=""
          />
        </div>
      </div>
      <div>
        <div class="mt-5">
          <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold leading-none dark:text-white">
              {{ filteredUser.name }}
            </h2>
            <span v-if="filteredUser.verified">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                aria-label="Verified account"
                role="img"
                class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                data-testid="icon-verified"
              >
                <g>
                  <path
                    fill="#1D9BF0"
                    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
          <span class="block text-sm opacity-50 dark:text-white"
            >@{{ filteredUser.username }}</span
          >
        </div>
        <div class="flex items-center gap-5 mt-3 dark:text-white">
          <div class="flex items-center gap-2">
            <font-awesome-icon
              icon="fa-solid fa-location-dot"
              class="text-gray-700 opacity-50 dark:text-white"
              size="lg"
            />
            <span class="opacity-50">{{ filteredUser.location }}</span>
          </div>

          <div class="flex items-center gap-2">
            <font-awesome-icon
              icon="fa-solid fa-calendar"
              class="text-gray-700 opacity-50 dark:text-white"
              size="lg"
            ></font-awesome-icon>
            <span class="opacity-50"
              >Joined from {{ filteredUser.created_at }}</span
            >
          </div>
        </div>
        <div class="flex items-center gap-5 mt-5 font-semibold dark:text-white">
          <div class="flex items-center gap-2">
            <span class="font-semibold">{{ filteredUser.friends_count }}</span>
            <span class="opacity-50">following</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="font-semibold">{{
              filteredUser.followers_count
            }}</span>
            <span class="opacity-50">followers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
export default {
  components: { Spinner },
  data() {
    return {
      filteredUser: null,
    }
  },
  computed: {
    ...mapState(['twitterUsers', 'loading'])
  },
  methods: {
    ...mapActions(['fetchTwitterUsers']),
    userFilter(e) {
      const selectedUserId = e.target.value;
      if (selectedUserId === '#') {
        this.filteredUser = null;
      } else {
        this.filteredUser = this.twitterUsers.find(user => user.id == selectedUserId);
      }
    }

  },
  created() {
    this.fetchTwitterUsers()
  },
}
</script>



