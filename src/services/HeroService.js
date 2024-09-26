import axios from 'axios';
import md5 from 'md5';

export const fetchHeroes = async (publicKey, privateKey, search = '', page = 1, setHeroes) => {
    try {
        const ts = Date.now();
        const hash = md5(ts + privateKey + publicKey);
        const limit = 8;
        const offset = (page - 1) * limit;

        const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}&nameStartsWith=${search}`;

        const response = await axios.get(url);
        setHeroes(response.data.data.results);
    } catch (error) {
        console.error('Error fetching heroes:', error.response ? error.response.data : error.message);
    }
};
