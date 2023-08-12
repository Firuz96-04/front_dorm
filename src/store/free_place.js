import {defineStore} from 'pinia'
import {http} from "@/api/axios/interceptors";
import {useBuildingStore} from './building'

export const useFreePlaceStore = defineStore('free_place', {
    state:() => ({
        free_places: []
    }),

    getters: {
        getAllFreePlace: (state) => state.free_places,
    },

    actions: {
        async setAllFreePlace(obj) {
            const res = await http.get('/api/free-place',
            { params: obj }
            ) 
            const data = await res.data
            this.free_places = data.free_place
            const buildStore = useBuildingStore()
            buildStore.$state.buildings = data.building

         },
    }
})