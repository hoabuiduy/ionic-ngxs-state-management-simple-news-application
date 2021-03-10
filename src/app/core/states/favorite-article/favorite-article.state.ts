import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleModel } from '../../models/article.model';
import { FavoriteArticleAddAction, GetFavoriteArticleAction } from './favorite-article.actions';
import { patch, removeItem } from '@ngxs/store/operators';

export class FavoriteArticleStateModel {
  public items: ArticleModel[];
}

const defaults = {
  items: []
};

@State<FavoriteArticleStateModel>({
  name: 'favoriteArticle',
  defaults
})
@Injectable()
export class FavoriteArticleState {


  constructor(public storage: Storage) {

  }

  @Selector()
  static articleList(state: FavoriteArticleStateModel) {
    return state.items;
  }

  @Action(FavoriteArticleAddAction)
  addToFavorite({ getState, setState }: StateContext<FavoriteArticleStateModel>, action: FavoriteArticleAddAction) {
    const article = action.article;
    article.favorite = true;
    const state = getState();
    const existed = this.checkExistingArticle(state.items, article);
    if (!existed) {
      setState({ items: [...state.items, article] });
      this.storage.set('favoriteArticles', [...state.items, article]);
    } else {
      setState(
        patch({
          items: removeItem<ArticleModel>(item => item.url === article.url)
        })
      )
      this.storage.set('favoriteArticles', this.removeAnArticle(state.items, article));
    }
  }

  @Action(GetFavoriteArticleAction)
  async getFavoriteArticles(ctx: StateContext<FavoriteArticleStateModel>) {
    const favorites = await this.storage.get('favoriteArticles');
    ctx.patchState({
      items: favorites || []
    });
  }

  private checkExistingArticle(articleList: ArticleModel[], article: ArticleModel) {
    const idx = articleList.findIndex(art => {
      return art.url === article.url;
    });
    return idx > -1;
  }

  private removeAnArticle(articleList: ArticleModel[], article: ArticleModel) {
    return articleList.filter(item => item.url !== article.url);
  }
}
