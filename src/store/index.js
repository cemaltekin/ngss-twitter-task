import { createStore } from 'vuex'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createToast } from 'mosha-vue-toastify';
import axios from 'axios';
// firebase config ayarlarını store'da yapmayı tercih ettim
const firebaseConfig = {
  apiKey: "AIzaSyB-uyphJBbd7bIchPZWyZPrEg7sIqmieyU",
  authDomain: "twitter-api-task.firebaseapp.com",
  projectId: "twitter-api-task",
  storageBucket: "twitter-api-task.appspot.com",
  messagingSenderId: "717181799712",
  appId: "1:717181799712:web:6841be8397884fc3d7db45",
  measurementId: "G-EY6LTCGPJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// authguard fonksiyonum
export const authGuard = (to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
};

export default createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: '',
      tweets: [],
      twitterUsers: [],
      loading: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = '';
    },
    setTweets(state, tweets) {
      state.tweets = tweets
    },
    setTwitterUsers(state, twitterUsers) {
      state.twitterUsers = twitterUsers
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {

    //google ile giriş yap özelleştirilmiş toastlar kullanıldı
    async signInWithGoogle({ commit }) {
      try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);

        commit('setUser', user);
        localStorage.setItem('user', JSON.stringify(user));

        createToast(`Google ile giriş yapıldı: ${user.displayName}`, {
          position: 'top-right',
          type: 'success',
          transition: 'zoom',
        });
      } catch (error) {
        createToast(error.message, {
          position: 'top-right',
          type: 'danger',
          transition: 'zoom',
        });
      }
    },
    //üye ol özelleştirilmiş toastlar kullanıldı
    async register({ commit, state }, payload) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        await updateProfile(user, {
          displayName: payload.username,
        });
        localStorage.setItem('user', JSON.stringify(user));
        commit('setUser', user);
        commit('clearError');
        createToast(`Hoşgeldin ${user.displayName} kayıt işlemin başarılı`,
          {
            position: 'top-right',
            type: 'success',
            transition: 'zoom',
          });
      } catch (error) {
        let errorMessage = 'Kayıt işlemi sırasında bir hata oluştu.'; 
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Bu e-posta zaten kullanılıyor.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Zayıf bir şifre kullandınız. Daha güçlü bir şifre seçin.';
        }

        createToast(errorMessage,
          {
            position: 'top-right',
            type: 'danger',
            transition: 'zoom',
          });
        commit('setError', errorMessage);
      }
    },
// login özelleştirilmiş toastlar kullanıldı
    async login({ commit }, payload) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        commit('setUser', user);
        localStorage.setItem('user', JSON.stringify(user));
        commit('clearError');
        createToast(`Hoşgeldin ${user.displayName} giriş yapıldı`,
          {
            position: 'top-right',
            type: 'success',
            transition: 'zoom',
          })
      } catch (error) {
        let errorMessage = 'Giriş işlemi sırasında bir hata oluştu.'; 
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Bu kullanıcı bulunamadı.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Yanlış şifre girdiniz.';
        }

        createToast(errorMessage,
          {
            position: 'top-right',
            type: 'danger',
            transition: 'zoom',
          })
        commit('setError', errorMessage);
      }
    },
    // localstorage'da user bilgisi varsa giriş yapmış sayılacak 
    autoLogin({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user !== null) {
        commit('setUser', user);
      }
    },
    // logout özelleştirilmiş toastlar kullanıldı
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit('setUser', null);
        localStorage.removeItem('user');
        commit('clearError');
        createToast(`Çıkış yaptınız tekrar giriş yapabilmeniz için giriş sayfasına yönlendirildiniz`,
          {
            position: 'top-right',
            type: 'warning',
            transition: 'zoom',
          })
        router.push('/login');
      } catch (error) {
        commit('setError', error.message);
      }
    },
    // tweetleri çekiyorum veri yüklenene kadar loading true olacak yüklendiğinde false olacak bunun sebebi spinner döndürmek istiyorum veri yoksa
    async fetchTweets({ commit }) {
      commit('setLoading', true);

      try {
        const response = await axios.get('http://localhost:3000/tweets');
        commit('setTweets', response.data);
      } catch (error) {
        console.error(error);
      }

      commit('setLoading', false);
    },
    // twitter userları çekiyorum veri yüklenene kadar loading true olacak yüklendiğinde false olacak bunun sebebi spinner döndürmek istiyorum veri yoksa
    async fetchTwitterUsers({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get('http://localhost:3000/users')
          .then(response => {
            commit('setTwitterUsers', response.data);
          })
      } catch (error) {
        console.error(error);
      }
      commit('setLoading', false);
    },
  },
});
