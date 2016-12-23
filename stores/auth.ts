import { autorun, observable, action, computed } from "mobx";

const AUTH_STORAGE_NAME = "gearworks-auth";

export class AuthStore {
    constructor() {
        this.token = localStorage.getItem(AUTH_STORAGE_NAME) || "";

        autorun("AuthStore-autorun", (runner) => {
            // Persist the auth changes to localstorage
            localStorage.setItem(AUTH_STORAGE_NAME, this.token);
        });
    }

    @observable token: string;

    @action login(token: string) {
        this.token = token;
    }

    @action logout() {
        this.token = "";
    }
}

const store = new AuthStore();

export default store;