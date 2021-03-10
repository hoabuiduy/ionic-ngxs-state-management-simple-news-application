import { ArticleModel } from "../../models/article.model";

export class FavoriteArticleAddAction {
  static readonly type = '[FavoriteArticle] Add item';
  constructor(public article: ArticleModel) { }
}

export class GetFavoriteArticleAction {
  static readonly type = '[FavoriteArticel] get list';
}