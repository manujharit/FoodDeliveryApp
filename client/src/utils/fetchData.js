import axios from "axios"

const fetchData = async () => {
    const url = 'http://localhost:3000/data'
    const params = {
        'lat': '26.9195875',
        'lng': '75.78796080000001',
        'is-seo-homepage-enabled': 'true',
        'page_type': 'DESKTOP_WEB_LISTING'
    }

    const data = axios.get(url, { params: params }).then((res) => res.data).catch((err) => console.log(err))

    return data
}

export default fetchData