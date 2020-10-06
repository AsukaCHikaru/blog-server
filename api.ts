import * as Express from "express";
import axios from "axios";

import { POSTS_API_ENDPOINT } from "./env";
import { normalizePostDetailData, normalizePostSummariesData } from "./utils";

export const SetAPI = (app: Express.Application) => {
  app.get(
    "/api/v1/posts",
    async (req: Express.Request, res: Express.Response) => {
      const posts = await axios.get(POSTS_API_ENDPOINT);
      const postSummaries = normalizePostSummariesData(posts.data);
      res.send(postSummaries);
    }
  );

  app.get(
    "/api/v1/posts/id/:id",
    async (req: Express.Request, res: Express.Response) => {
      const id = req.params.id;
      const post = await axios.get(`${POSTS_API_ENDPOINT}/${id}`);
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
      const category = req.params.category;
      const posts = await axios.get(POSTS_API_ENDPOINT);
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
      const tag = req.params.tag;
      const posts = await axios.get(POSTS_API_ENDPOINT);
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
