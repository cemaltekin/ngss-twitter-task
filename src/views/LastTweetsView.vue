<template>
  <h2 class="text-2xl font-semibold text-gray-700 dark:text-white">
    Last 10 Tweets by Date
  </h2>
  <div class="flex items-center justify-center" v-if="loading || !tweets.length">
    <Spinner />
  </div>
  <div class="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-2" v-else>
    <div v-for="tweet in latestTweets" :key="tweet.id" >
      <div
        class="w-full h-full p-5 transition-shadow bg-white hover:shadow-xl rounded-2xl dark:bg-gray-600 dark:text-white"
      >
        <div class="flex items-center justify-between gap-5">
          <div class="flex items-center gap-1 text-sm">
            <img
              :src="tweet.user.profile_photo"
              class="max-w-[48px] aspect-square rounded-full"
              alt=""
            />
            <div class="ml-2 font-semibold">{{ tweet.user.name }}</div>
            <div class="opacity-50">@{{ tweet.user.screen_name }}</div>
            <div class="opacity-50">{{ tweet.created_at }}</div>
          </div>
        </div>
        <div class="pl-16 text-sm">
          {{ tweet.text }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
export default {
  name: "LatestTweets",
  components: { Spinner },
  computed: {
    ...mapState(['tweets', 'loading']),
    latestTweets() {
      return this.tweets
        .slice()
        .sort((a, b) => this.sortByDate(b.created_at) - this.sortByDate(a.created_at))
        .slice(0, 10);
    },
  },
  methods: {
    ...mapActions(['fetchTweets']),
    sortByDate(dateString) {
      const [day, month, year] = dateString.split('/');
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return formattedDate.getTime();
    },
  },

  created() {
    this.fetchTweets();
  },
};
</script>
