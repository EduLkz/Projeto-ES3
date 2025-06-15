import axios from "axios"

const apiAddr = 'http://127.0.0.1:5000'

export const validateLogin = async(email, password, user_type) => {
    const body = {
        email: email,
        password: password,
        user_type: String(user_type)
    }
    
    try{
        let res = await axios.post(`${apiAddr}/users/login`,
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
        let res = await axios.post(`${apiAddr}/users/register`,
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

export const getPedidos = async (body) => {
    console.log(JSON.stringify(body));

    try{
        let res = await axios.post(`${apiAddr}/users/buscarpedidos`,
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
    axios.post(`${apiAddr}/gen-route`, 
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