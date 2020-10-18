import * as Express from "express";
import axios, { AxiosRequestConfig } from "axios";

import { POSTS_API_ENDPOINT } from "./env";
import { normalizePostDetailData, normalizePostSummariesData } from "./utils";
import { GITHUB_TOKEN } from "./secret";

const axiosAuthHeader: AxiosRequestConfig = {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};

export const SetAPI = (app: Express.Application) => {
  app.get(
    "/api/v1/posts",
    async (req: Express.Request, res: Express.Response) => {
      console.log(req.url);
      const posts = await axios.get(POSTS_API_ENDPOINT, axiosAuthHeader);
      const postSummaries = normalizePostSummariesData(posts.data);
      res.send(postSummaries);
    }
  );

  app.get(
    "/api/v1/posts/id/:id",
    async (req: Express.Request, res: Express.Response) => {
      console.log(req.url);
      const id = req.params.id;
      const post = await axios.get(
        `${POSTS_API_ENDPOINT}/${id}`,
        axiosAuthHeader
      );
      const postDetail = normalizePostDetailData(post.data);
      const postBody: any = await axios.get(
        `${POSTS_API_ENDPOINT}/${id}/comments`
      );
      postDetail.body = postBody.data[0].body;
      res.send(postDetail);
    }
  );

  app.get(
    "/api/v1/posts/category/:category",
    async (req: Express.Request, res: Express.Response) => {
      console.log(req.url);
      const category = req.params.category;
      const posts = await axios.get(POSTS_API_ENDPOINT, axiosAuthHeader);
      const postSummaries = normalizePostSummariesData(posts.data);
      const filteredPostSummaries = postSummaries.filter(
        (postSummary) => postSummary.category === category
      );
      res.send(filteredPostSummaries);
    }
  );

  app.get(
    "/api/v1/posts/tag/:tag",
    async (req: Express.Request, res: Express.Response) => {
      console.log(req.url);
      const tag = req.params.tag;
      const posts = await axios.get(POSTS_API_ENDPOINT, axiosAuthHeader);
      const postSummaries = normalizePostSummariesData(posts.data);
      const filteredPostSummaries = postSummaries.filter((postSummary) =>
        postSummary.tags
          .map((tag) => tag.toLowerCase())
          .includes(tag.toLowerCase())
      );
      res.send(filteredPostSummaries);
    }
  );
};
