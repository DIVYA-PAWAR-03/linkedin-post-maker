export interface ContentItem {
  name: string;
  description: string;
  codeLang: string;
  code: string;
}

export interface PostData {
  title: string;
  description: string;
  hashtags: string[];
  content: ContentItem[];
}
