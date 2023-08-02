import {defineStore} from 'pinia'
import {http} from "@/api/axios/interceptors";


export const useStudentStore = defineStore('student', {
    state:() => ({
        students: [],

    }),

    getters: {
        getAllStudent: (state) => state.students
    },

    actions: {
       async setAllFaculty() {
            const res = await http.get('/api/student')
            const data = await res.data.results
            this.students = data
            console.log(data);
        }
    }
})
