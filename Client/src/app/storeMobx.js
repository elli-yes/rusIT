import { makeAutoObservable } from "mobx"

export const authStore = makeAutoObservable({ isAuthenticated: false })

export const userStore = makeAutoObservable({ username: "" })
