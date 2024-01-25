
const getBackEnd = () =>{
    const backend = import.meta.env.VITE_BACKEND_URL ;

    return backend
}

export default {
    getBackEnd
}