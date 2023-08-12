import {http} from "@/api/axios/interceptors";
import {defineStore} from 'pinia'


export const usePrivilegeStore = defineStore('privilege', {

    state:() => ({
        privileges: []
    }),

    getters: {
        getAllPrivilege: (state) => state.privileges
    },

    actions: {

       async setAllPrivilege() {
            const res = await http.get('/api/privilege')
            const json = await res.data
            this.privileges = json
            console.log(json);
        },

        async addPrivilege(obj) {
            try {
                const res = await http.post('/api/privilege', obj.privilege)
                const json = await res.data
                this.privileges.push(json.data)
                console.log(json);
                obj.cb()            
            } catch (error) {
                console.log(error);
            }

        }
    }
})