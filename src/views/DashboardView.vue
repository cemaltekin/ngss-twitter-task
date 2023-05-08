<template>
  <div class="grid grid-cols-1 gap-5 xl:gap-10">
    <div class="grid grid-cols-1 gap-5 xl:gap-10 lg:grid-cols-2">
      <div
        class="w-full p-5 transition-shadow bg-white rounded-lg dark:bg-gray-600 dark:text-white hover:shadow-xl"
      >
        <h2 class="mb-5">Kullanıcı Cinsiyet Dağılımı</h2>
        <div
          class="flex items-center justify-center"
          v-if="loading || !twitterUsers.length"
        >
          <Spinner />
        </div>
        <Pie :options="genderOptions" :data="genderData" v-else />
      </div>
      <div
        class="w-full p-5 transition-shadow bg-white rounded-lg hover:shadow-xl dark:bg-gray-600 dark:text-white"
      >
        <h2 class="mb-5">Kullanıcıların Profil Onay Dağılımı</h2>
        <div
          class="flex items-center justify-center"
          v-if="loading || !twitterUsers.length"
        >
          <Spinner />
        </div>
        <Pie :options="profileCheckOptions" :data="profileCheckData" v-else />
      </div>
    </div>
    <div
      class="w-full p-5 transition-shadow bg-white rounded-lg hover:shadow-xl dark:bg-gray-600 dark:text-white"
    >
      <h2 class="mb-5">Kullanıcı Şehir Dağılımı</h2>
      <div
        class="flex items-center justify-center"
        v-if="loading || !twitterUsers.length"
      >
        <Spinner />
      </div>
      <Bar :options="cityOptions" :data="cityData" v-else />
    </div>
  </div>
</template>

<script>
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { mapState, mapActions } from 'vuex'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'dashboard',
  components: { Bar, Pie, Spinner },
  data() {
    return {
      isDark: true,
      cityOptions: {
        responsive: true,
        scales: {
          y: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray',
            },
          },
          x: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray'
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      },
      genderOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'gray', 
            },
          }
        },
        scales: {
          y: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray', 
            },
          },
          x: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray'
            }
          }
        },
      },
      profileCheckOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'gray', 
            },
          }
        },
        scales: {
          y: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray',
            },
          },
          x: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: 'gray'
            }
          }
        },
      }
    };
  },
  computed: {
    ...mapState(['twitterUsers', 'loading']),
    cityData() {
      const cityLabels = [];
      const cityData = [];
      this.twitterUsers.forEach(user => {
        const city = user.location;
        const existingIndex = cityLabels.indexOf(city);

        if (existingIndex !== -1) {
          cityData[existingIndex]++;
        } else {
          cityLabels.push(city);
          cityData.push(1);
        }
      });

      return {
        labels: cityLabels,
        datasets: [
          {
            backgroundColor: ['#8B1874', '#AFD3E2', '#19A7CE', '#FC4F00', '#F79540', '#146C94'],
            data: cityData
          }
        ]
      };
    },
    genderData() {
      const genderLabels = ['Man', 'Woman'];
      const genderData = [0, 0];

      this.twitterUsers.forEach(user => {
        const gender = user.gender;

        if (gender === 'man') {
          genderData[0]++;
        } else if (gender === 'woman') {
          genderData[1]++;
        }
      });

      return {
        labels: genderLabels,
        datasets: [
          {
            backgroundColor: ['#8B1874', '#FC4F00'],
            data: genderData
          }
        ]
      };
    },
    profileCheckData() {
      const profileCheckLabels = ['Checked', 'Unchecked'];
      const profileCheckData = [0, 0];

      this.twitterUsers.forEach(user => {
        const isChecked = user.verified;

        if (isChecked) {
          profileCheckData[0]++;
        } else {
          profileCheckData[1]++;
        }
      });

      return {
        labels: profileCheckLabels,
        datasets: [
          {
            backgroundColor: ['#8B1874', '#FC4F00'],
            data: profileCheckData
          }
        ]
      };
    }
  },
  methods: {
    ...mapActions(['fetchTwitterUsers']),
  },
  created() {
    this.fetchTwitterUsers()
  }
}
</script>


<style>
html.dark canvas {
  color: white !important;
}
</style>
