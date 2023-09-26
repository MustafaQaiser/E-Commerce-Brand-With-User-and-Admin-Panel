import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        id: null,
        username: null,
        email: null,
        password: null,
        address: null,
        city: null,
        phone: null,
        role:null,
        image:null,
        token: null,

    }),
    actions: {
        setUserDetails(details) {
           
            this.id = details.id;
            this.username = details.username;
            this.email = details.email;
            this.password=details.password;
            this.address=details.address;
            this.city=details.city;
            this.phone=details.phone;
            this.role= details.role;
            this.image= details.image;
            this.token = details.token;
        },
        clearUserDetails() {
            this.id = null;
            this.username = null;
            this.email = null;
            this.password = null;
            this.address = null;
            this.city = null;
            this.phone = null;
            this.role= null;
            this.image= null;
            this.token = null;
        }
    }
});

