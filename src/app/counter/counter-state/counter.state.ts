export interface counterState {
    counter: number,
    isLoading?: boolean
}

export const initialState:counterState = {
    counter: 0,
}