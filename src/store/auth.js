import {defineStore} from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', {
    state:() => ({
        animals: ['cao', 'bos', 'daug'],
        count: 10,
        hasChanged: false,
        items: []
    }),

    getters: {
        
       getDouble:(state) => state.count * 2,

      getDobulePlus() {
            return this.getDouble + 33
      },

      getUserById(state) {
        return (user_id) => {
            console.log(user_id);
        }
      }
    },
    actions: {
        addAnimal() {
            console.log(this.animals);
        },

        doubleCount() {
            this.count += 2
        }
    },

})

// export const useAuthStore = defineStore('auth', () => {
//     const animals = ref(['cao', 'bos', 'daug'])
//     const count = ref(0)
//     const addAnimal = () => {
//         console.log(animals.value);
//     }

//     const doubleCount = () => {
//         count.value += 2
//     }

//     const getDouble = computed(() => {
//         return count.value * 2
//     })
//     return {
//         animals,
//         count,
//         addAnimal,
//         doubleCount,
//         getDouble
//     }
// })