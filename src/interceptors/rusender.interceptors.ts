import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: process.env.RUSENDER_API_URL,
  headers: {
    'X-Api-Key': process.env.RUSENDER_API_KEY,
    'Content-Type': 'application/json',
  },
};

export const axiosForRusender = axios.create(options);
