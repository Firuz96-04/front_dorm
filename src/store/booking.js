import {http} from "@/api/axios/interceptors";
import {defineStore} from 'pinia'


export const useBookingStore = defineStore('booking', {
        state:() => ({
            bookings: []
        }),

        getters: {
            getAllBookings:(state) => state.bookings
        },

        actions: {
           async setAllBooking() {
                const res = await http.get('/api/booking')
                const json = await res.data
                this.bookings = json.data
            }
        }
})