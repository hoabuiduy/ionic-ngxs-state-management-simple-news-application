import { ArticleSourceModel } from "../../models/article-source.model";
import { ArticleFilterModel } from "../../models/filter.model";

export class GetArticleListAction {
  static readonly type = '[Article] get list';
  constructor(public filters: ArticleFilterModel, public status?: string) { }
}
export class LoadMoreArticleListAction {
  static readonly type = '[Article] load more';
  constructor(public filters: ArticleFilterModel) { }
}

export class SetArticleSourceAction {
  static readonly type = '[Article] set article source';
  constructor(public source: ArticleSourceModel) { }
}