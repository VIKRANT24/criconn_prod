export const LOADING_ACTION = "[Loading action] loading"

export function loadingToggleAction(status) {
    return {
        type: LOADING_ACTION,
        payload: status
    }
}