import axios from 'axios'
const baseurl = 'api/login'

const login = async credentials => {
    const repsonse = await axios.post(baseurl, credentials)
    return repsonse.data
}

export default { login }