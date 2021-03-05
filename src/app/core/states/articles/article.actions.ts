import { ArticleFilterModel } from "../../models/filter.model";

export class GetArticleListAction {
  static readonly type = '[Article] get list';
  constructor(public filters: ArticleFilterModel) { }
}