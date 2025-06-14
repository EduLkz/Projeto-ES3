import axios from "axios"

const apiAddr = 'http://127.0.0.1:5000'

export const validateLogin = async(body) => {
    console.log(JSON.stringify(body));
    
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

export const registerUser = async (nome, password, email, cel, endereco, user_type) => {
    const body = {
        nome: nome,
        passwd: password,
        email: email,
        cel: cel,
        user_type: user_type,
        endereco: endereco
    }

    try{
        let res = await axios.post(`${apiAddr}/users/register`,
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

export const getAPIRoute = (body) => {
    axios.post(`${apiAddr}/gen-route`, 
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
        console.log(res.data)
        window.open(res.data,'_blank', 'rel=noopener noreferrer')
      }).catch((e) => {
        console.error(e.message)
      })
}