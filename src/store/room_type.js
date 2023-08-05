import {defineStore} from 'pinia'
import {http} from "@/api/axios/interceptors";

export const useRoomTypeStore = defineStore('room-type', {
    state:() => ({
        room_types: []
    }),

    getters: {
        AllRoomType:(state) => state.room_types
    },

    actions: {
        async setAllRoomType() {
            const res = await http.get('/api/room-type')
            const data = await res.data
            this.room_types = data
        },
    }
})