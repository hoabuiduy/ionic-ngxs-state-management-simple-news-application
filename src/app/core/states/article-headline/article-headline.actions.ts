export class GetListArticleHeadlineAction {
  static readonly type = '[ArticleHeadline] get list';
  constructor(public loadingStatus: string = 'loading') { }
}
export class LoadMoreArticleHeadlienAction {
  static readonly type = '[ArticleHeadline] load more';
}