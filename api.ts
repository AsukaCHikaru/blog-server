import * as Express from "express";
import axios from "axios";

import { FETCH_POSTS_API_ENDPOINT } from "./env";
import { normalizePostDetailData, normalizePostSummariesData } from "./utils";

export const SetAPI = (app: Express.Application) => {
  app.get(
    "/api/v1/posts",
    async (req: Express.Request, res: Express.Response) => {
      const posts = await axios.get(FETCH_POSTS_API_ENDPOINT);
      const postSummaries = normalizePostSummariesData(posts.data);
      res.send(postSummaries);
    }
  );

  app.get(
    "/api/v1/posts/:id",
    async (req: Express.Request, res: Express.Response) => {
      const id = req.params.id;
      const post = await axios.get(`${FETCH_POSTS_API_ENDPOINT}/${id}`);
      const postDetail = normalizePostDetailData(post.data);
      const postBody: any = await axios.get(
        `${FETCH_POSTS_API_ENDPOINT}/${id}/comments`
      );
      postDetail.body = postBody.data[0].body;
      res.send(postDetail);
    }
  );
};
