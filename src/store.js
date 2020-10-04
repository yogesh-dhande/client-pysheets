import Vue from "vue";
import Vuex from "vuex";
import * as bokeh from "@bokeh/bokehjs";

const fb = require("./firebaseConfig.js");
let io = require("socket.io-client");
let establishRemoteSocket = true;

Vue.use(Vuex);

export function buildStore() {
  let socket;
  if (establishRemoteSocket) {
    socket = io("http://localhost:8000/");
  }

  let store = new Vuex.Store({
    state: {
      session: null,
      app: {
        models: {},
        layout: {
          main: {},
          side: {},
        },
      },
      currentUser: null,
      userProfile: {},
      posts: [],
      hiddenPosts: [],
    },
    getters: {
      getConfig: (state) => (id) => state.app.models[id],
    },
    actions: {
      updateValue({ state }, payload) {
        // eslint-disable-line no-unused-vars
        payload.session_id = state.session.id;
        console.log(payload.value);

        if (establishRemoteSocket) {
          socket.emit("update value", payload);
        }
      },
      setControls({ commit }, payload) {
        commit("setControls", payload);
      },
      setMain({ commit }, payload) {
        commit("setMain", payload);
      },
      setModel({ commit }, payload) {
        commit("setModel", payload);
      },
      setModels({ commit }, payload) {
        commit("setModels", payload);
      },
      setSession({ commit }, token) {
        bokeh
          .pull_session("ws://localhost:5006/bkapp/ws", token)
          .then((res) => commit("setSession", res));
      },
      dispatchAction({ state }, payload) {
        // eslint-disable-line no-unused-vars
        payload.value.session_id = state.session.id;
        if (establishRemoteSocket) {
          socket.emit(payload.event, payload.value);
          console.log(payload);
        } else {
          console.log(payload);
        }
      },
      clearData({ commit }) {
        commit("setCurrentUser", null);
        commit("setUserProfile", {});
        commit("setPosts", null);
        commit("setHiddenPosts", null);
      },
      fetchUserProfile({ commit, state }) {
        fb.usersCollection
          .doc(state.currentUser.uid)
          .get()
          .then((res) => {
            commit("setUserProfile", res.data());
          })
          .catch((err) => {
            console.log(err);
          });
      },
      updateProfile({ state }, data) {
        let name = data.name;
        let title = data.title;

        fb.usersCollection
          .doc(state.currentUser.uid)
          .update({ name, title })
          .then(() => {
            // eslint-disable-line no-unused-vars
            // update all posts by user to reflect new name
            fb.postsCollection
              .where("userId", "==", state.currentUser.uid)
              .get()
              .then((docs) => {
                docs.forEach((doc) => {
                  fb.postsCollection.doc(doc.id).update({
                    userName: name,
                  });
                });
              });
            // update all comments by user to reflect new name
            fb.commentsCollection
              .where("userId", "==", state.currentUser.uid)
              .get()
              .then((docs) => {
                docs.forEach((doc) => {
                  fb.commentsCollection.doc(doc.id).update({
                    userName: name,
                  });
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mutations: {
      setControls(state, payload) {
        console.log(payload);
        Vue.set(state.app.layout, "side", payload);
      },
      setMain(state, payload) {
        console.log(payload);
        Vue.set(state.app.layout, "main", payload);
      },
      setModel(state, payload) {
        console.log(payload);
        Vue.set(state.app.models, payload.id, payload);
      },
      setModels(state, payload) {
        state.app.models = Object.assign({}, state.app.models, payload);
      },
      setSession(state, payload) {
        console.log(payload);
        Vue.set(state, "session", payload);
        console.log(state.session.document.roots());
        state.session.document.roots().forEach((root) => {
          console.log(root);
          console.log(root.default_view.name);
        });
      },
      setCurrentUser(state, val) {
        state.currentUser = val;
      },
      setUserProfile(state, val) {
        state.userProfile = val;
      },
      setPosts(state, val) {
        if (val) {
          state.posts = val;
        } else {
          state.posts = [];
        }
      },
      setHiddenPosts(state, val) {
        if (val) {
          // make sure not to add duplicates
          if (!state.hiddenPosts.some((x) => x.id === val.id)) {
            state.hiddenPosts.unshift(val);
          }
        } else {
          state.hiddenPosts = [];
        }
      },
    },
  });

  if (establishRemoteSocket) {
    socket.on("connect", function () {
      console.log("Connected to the socket");
      socket.emit("init app", { data: "I'm connected!" });
    });

    socket.on("create app", function (json) {
      // TODO show a loading symbol or something interesting
      //  so that the page is not empty while waiting
      store.dispatch("setSession", json.token);
    });
  }

  return store;
}
