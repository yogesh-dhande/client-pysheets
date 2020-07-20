import Vue from 'vue'
import Vuex from 'vuex'
import * as bokeh from '@bokeh/bokehjs'

const fb = require('./firebaseConfig.js')
let io = require('socket.io-client')
let establishRemoteSocket = true

Vue.use(Vuex)

export function buildStore() {
    let socket;
    if (establishRemoteSocket) {
        socket = io('http://localhost:8000/');
    }

    let store = new Vuex.Store({
        state: {
            session: {
                script: '',
                id: ''
            },
            app: {
                models: {},
                layout: {
                    main: {},
                    side: {}
                }
            },
            currentUser: null,
            userProfile: {},
            posts: [],
            hiddenPosts: []
        },
        getters: {
            getConfig: (state) =>
                id => state.app.models[id]
        },
        actions: {
            updateValue({commit, state}, payload) {  // eslint-disable-line no-unused-vars
                payload.session_id = state.session.id
                console.log(payload.value)

                if (establishRemoteSocket) {
                    socket.emit("update value", payload);
                }
            },
            setControls({commit}, payload) {
                commit('setControls', payload)
            },
            setMain({commit}, payload) {
                commit('setMain', payload)
            },
            setModel({commit}, payload) {
                commit('setModel', payload)
            },
            setModels({commit}, payload) {
                commit('setModels', payload)
            },
            setSession({commit}, payload) {
                commit('setSession', payload)
            },
            dispatchAction({commit, state}, payload) {  // eslint-disable-line no-unused-vars
                payload.value.session_id = state.session.id
                if (establishRemoteSocket) {
                    socket.emit(payload.event, payload.value);
                    console.log(payload)
                } else {
                    console.log(payload)
                }
            },
            clearData({commit}) {
                commit('setCurrentUser', null)
                commit('setUserProfile', {})
                commit('setPosts', null)
                commit('setHiddenPosts', null)
            },
            fetchUserProfile({commit, state}) {
                fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                    commit('setUserProfile', res.data())
                }).catch(err => {
                    console.log(err)
                })
            },
            updateProfile({state}, data) {
                let name = data.name
                let title = data.title

                fb.usersCollection.doc(state.currentUser.uid)
                    .update({name, title})
                    .then(user => {  // eslint-disable-line no-unused-vars
                        // update all posts by user to reflect new name
                        fb.postsCollection
                            .where('userId', '==', state.currentUser.uid)
                            .get()
                            .then(docs => {
                                docs.forEach(doc => {
                                    fb.postsCollection.doc(doc.id).update({
                                        userName: name
                                    })
                                })
                            })
                        // update all comments by user to reflect new name
                        fb.commentsCollection
                            .where('userId', '==', state.currentUser.uid)
                            .get()
                            .then(docs => {
                                docs.forEach(doc => {
                                    fb.commentsCollection.doc(doc.id).update({
                                        userName: name
                                    })
                                })
                            })
                    }).catch(err => {
                    console.log(err)
                })
            }
        },
        mutations: {
            setControls(state, payload) {
                console.log(payload)
                Vue.set(state.app.layout, "side", payload)
            },
            setMain(state, payload) {
                console.log(payload)
                Vue.set(state.app.layout, "main", payload)
            },
            setModel(state, payload) {
                console.log(payload)
                Vue.set(state.app.models, payload.id, payload)
            },
            setModels(state, payload) {
                state.app.models = Object.assign({}, state.app.models, payload)
            },
            setSession(state, payload) {
                console.log(payload)
                state.session = payload
            },
            setCurrentUser(state, val) {
                state.currentUser = val
            },
            setUserProfile(state, val) {
                state.userProfile = val
            },
            setPosts(state, val) {
                if (val) {
                    state.posts = val
                } else {
                    state.posts = []
                }
            },
            setHiddenPosts(state, val) {
                if (val) {
                    // make sure not to add duplicates
                    if (!state.hiddenPosts.some(x => x.id === val.id)) {
                        state.hiddenPosts.unshift(val)
                    }
                } else {
                    state.hiddenPosts = []
                }
            }
        }
    })

    if (establishRemoteSocket) {
        socket.on('connect', function () {
            console.log('Connected to the socket')
            socket.emit('init app', {data: 'I\'m connected!'});
        })

        socket.on('create app', function (json) {
            store.dispatch('setSession', json)
        })

        socket.on('set controls', function (json) {
            console.log('setting controls');
            store.dispatch('setControls', json)
        })
        socket.on('set main', function (json) {
            console.log('setting main');
            store.dispatch('setMain', json)
        })
        socket.on('set model', function (json) {
            console.log('setting model');
            store.dispatch('setModel', json)
        })
        socket.on('set models', function (json) {
            console.log('setting models');
            store.dispatch('setModels', json)
        })
    }

    return store
}
