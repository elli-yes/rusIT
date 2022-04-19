import { makeAutoObservable } from "mobx"

export const authStore = makeAutoObservable({ isAuthenticated: false })
