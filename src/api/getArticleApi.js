import axiosClient from './axiosClient';

const getArticleApi = {
  getMultipleArticles: () => {
    const url = '/articles';
    return axiosClient.get(url);
  },

  getSingleArticle: (country) => {
    const url = `/article/${country}`;
    return axiosClient.get(url);
  },
};

export default getArticleApi;
