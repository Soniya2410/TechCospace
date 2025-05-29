import axios from 'axios';
import { BASE_URL } from './config';
import { CONSTANT } from '../utils/Constant';

export const fetchArticles = async (page = 1, query = '') => {
  const url = query
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=20&page=${page}&apiKey=${CONSTANT.API_KEY}`
    : `${BASE_URL}?country=us&pageSize=20&page=${page}&apiKey=${CONSTANT.API_KEY}`;

  const response = await axios.get(url);
  return response.data; 
};