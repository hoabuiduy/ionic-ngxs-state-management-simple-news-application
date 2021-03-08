import { ArticleFilterModel } from "../../models/filter.model";

export class GetArticleListAction {
  static readonly type = '[Article] get list';
  constructor(public filters: ArticleFilterModel) { }
}
export class LoadMoreArticleListAction {
  static readonly type = '[Article] load more';
  constructor(public filters: ArticleFilterModel) { }
}