import axios from "axios"

const api = axios.create({
  baseURL: window._env_.API_URL || process.env.REACT_APP_API_URL
});

export const validateLogin = async(email, password, user_type) => {
    const body = {
        email: email,
        password: password,
        user_type: String(user_type)
    }
    
    try{
        let res = await api.post(`/users/login`,
            JSON.stringify(body),
            {
                headers: {
                'Content-Type': 'application/json',
                // * The next headers I wrote because i think the problem could be CORS too, but I dont know if are necessary *
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true ,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Headers': 'Content-type, Accept'
                }
            }
        )

        console.log(res)
        return res.data
    }catch(e) {
        const res_e = {
            msg: e.message,
            status: 404
        }
        
        return res_e
    }
}

export const registerUser = async (body) => {
    console.log(JSON.stringify(body));

    try{
        let res = await api.post(`/users/register`,
            JSON.stringify(body),
            {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true ,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Headers': 'Content-type, Accept'
                }
            }
        )
        console.log(res);
        
        return [res.data, res.status]
    }catch(e) {
        const res_e = {
            msg: e.message,
            status: 404
        }
        
        return [res_e, 404]
    }
}

export const getPedidos = async (body) => {
    console.log(JSON.stringify(body));

    try{
        let res = await api.post(`/users/buscarpedidos`,
            JSON.stringify(body),
            {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true ,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Headers': 'Content-type, Accept'
                }
            }
        )

        return res.data
    }catch(e) {
        const res_e = {
            msg: e.message,
            status: 404
        }
        
        return res_e
    }
}

export const getPedidosRota = async (body) => {
    console.log(JSON.stringify(body));

    try{
        let res = await api.post(`/users/buscarpedidosrota`,
            JSON.stringify(body),
            {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true ,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Headers': 'Content-type, Accept'
                }
            }
        )

        return res.data
    }catch(e) {
        const res_e = {
            msg: e.message,
            status: 404
        }
        
        return res_e
    }
}

export const getAPIRoute = (body) => {
    api.post(`/gen-route`, 
      JSON.stringify(body),
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Credentials': true ,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': 'Content-type, Accept'
        }
      }
    ).then((res) => {
        console.log(res.data)
        window.open(res.data,'_blank', 'rel=noopener noreferrer')
      }).catch((e) => {
        console.error(e.message)
      })
}

export const confirmarEntrega = async(body) => {
    try{
        let res = await api.post(`/users/confirmarEntrega`,
            JSON.stringify(body),
            {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true ,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Headers': 'Content-type, Accept'
                }
            }
        )

        return res.data
    }catch(e) {
        const res_e = {
            msg: e.message,
            status: 404
        }
        
        return res_e
    }
}