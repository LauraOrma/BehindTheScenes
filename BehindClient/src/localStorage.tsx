export const loadToken = () => {
    try {
        const serializedState = localStorage.getItem('token');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
};
export const saveToken = (token: any) => {
    try {
        let serializedState = JSON.stringify(token);
        localStorage.setItem('token', serializedState)
    } catch (error) {
    }
};