export type PostSummary = {
  author: string;
  title: string;
  body: string;
  publishDate: string;
  category: PostCategory;
  tags: string[];
  path: string;
};

export type PostDetail = {
  author: string;
  title: string;
  body: string;
  publishDate: string;
  category: PostCategory;
  tags: string[];
  path: string;
};

export type PostCategory = "gaming" | "programming" | "others";

export type GitHubIssueResponse = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  state: string;
  locked: boolean;
  assignee: GitHubUser | null;
  assignees: GitHubUser[];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: null;
  body: string;
  performed_via_github_app: null;
}[];

export type GithubIssue = GitHubIssueResponse[number];

type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
};

type GitHubLabel = {
  id: string;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
};
