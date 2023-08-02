import {defineStore} from 'pinia'
import {http} from "@/api/axios/interceptors";


export const usePrincipalStore = defineStore('principal', {
    
    state:() => ({
        principals: []
    }),

    getters: {
        getAllPrincipal:(state) => state.principals
    },

    actions: {
       async setAllPrincipal() {
            const res = await http.get('/api/principal')
            const data = await res.data
            this.principals = data
        },

        async addPrincipal() {
            try {
                const res = await http.post('/api/principal')
                const data = await res.data     
                this.principals.push(data)
            } catch (error) {
                console.log(error);
            }
        }
    }
})