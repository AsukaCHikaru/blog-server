import { raw } from "express";
import {
  GithubIssue,
  GitHubIssueResponse,
  PostCategory,
  PostSummary,
} from "./types";

export const readPostMetaData = (postBody: string) => {
  const authorRaw = /author:\s(.+)\r/.exec(postBody);
  const author = authorRaw ? authorRaw[1] : "";

  const publishDateRaw = /date:\s(.+)\r/.exec(postBody);
  const publishDate = publishDateRaw ? publishDateRaw[1] : "";

  const pathRaw = /path:\s(.+)\r/.exec(postBody);
  const path = pathRaw ? pathRaw[1] : "";

  const tagsRaw = /tags:\s(.+)\r/.exec(postBody);
  const tags = tagsRaw ? tagsRaw[1].split(", ") : [];

  const categoryRaw = /category:\s(.+)\r/.exec(postBody);
  let category: PostCategory = "others";
  if (categoryRaw && categoryRaw[1] === "gaming") category = "gaming";
  if (categoryRaw && categoryRaw[1] === "programming") category = "programming";
  if (categoryRaw && categoryRaw[1] === "others") category = "others";

  return { author, publishDate, path, tags, category };
};

export const normalizePostSummariesData = (rawData: GitHubIssueResponse) => {
  const postSummaries: PostSummary[] = [];

  rawData.forEach((postData: GithubIssue) => {
    const { author, publishDate, path, tags, category } = readPostMetaData(
      postData.body
    );
    const postSummaryBodyRaw = /-start-\r\n(.+)/.exec(postData.body);
    const postSummaryBody = postSummaryBodyRaw ? postSummaryBodyRaw[1] : "";

    const postSummary: PostSummary = {
      author,
      title: postData.title,
      body: postSummaryBody,
      publishDate,
      path,
      tags: tags,
      category: category,
      id: postData.number.toString(),
    };
    postSummaries.push(postSummary);
  });

  return postSummaries;
};

export const normalizePostDetailData = (rawData: GithubIssue) => {
  const { author, publishDate, path, tags, category } = readPostMetaData(
    rawData.body
  );

  const postSummary: PostSummary = {
    author,
    title: rawData.title,
    body: "",
    publishDate,
    path,
    tags: tags,
    category: category,
    id: rawData.number.toString(),
  };

  return postSummary;
};
