import axiosClient from './axiosClient';

const getArticleApi = {
  getMultipleArticles: () => {
    const url = '/articles';
    return axiosClient.get(url);
  },

  getSingleArticle: (urlString) => {
    const url = `/article/${urlString}`;
    return axiosClient.get(url);
  },
};

export default getArticleApi;
