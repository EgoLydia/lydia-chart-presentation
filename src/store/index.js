import Vue from 'vue'
import Vuex from 'vuex'
import SERVER from "./server";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments:[],
  },
  getters:{
    comments: (state)=> {
      return state.comments;
    }
  },
  mutations: {
    addComments(state, comments){
      comments.forEach(comment => {
          const view = Math.floor(Math.random()*101)
          state.comments.push({...comment, view: view})
      });
      console.log(state.comments);
    }
  },
  actions: {
    fetchComments(context){
      const fetchPromise = new Promise((resolve, reject) =>{
        const response = SERVER.get("comments");
        response
        .then((res)=>{
          const comments=res.data.slice(0, 20)
            console.log(comments);
            context.commit("addComments", comments);
            resolve();
        })
        .catch((error) =>{
          reject(error);
        });
      });
      return fetchPromise;
    }
  },
  modules: {
  }
})
