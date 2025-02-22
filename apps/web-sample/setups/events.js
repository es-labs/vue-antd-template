import { openWs, closeWs } from './ws'

export const onLogin = () => openWs()
export const onLogout = () => closeWs()