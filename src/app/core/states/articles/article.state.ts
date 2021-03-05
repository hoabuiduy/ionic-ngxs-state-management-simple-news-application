import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleSourceModel } from '../../models/article-source.model';
import { ArticleModel } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleSourceListAction } from '../article-source/article-source.actions';



export interface NewsStateModel {
  items: ArticleModel[];
  status: string;
}

@State<NewsStateModel>({
  name: 'news',
  defaults: {
    status: '',
    items: []
  }
})
@Injectable()
export class ArticleState {

  constructor(private newsService: ArticleService) {

  }



  @Selector()
  static topNewsHeadlines(state: NewsStateModel) {
    return state.items;

  }


  @Action(GetArticleSourceListAction)
  async getArticleListAction(ctx: StateContext<NewsStateModel>) {
    ctx.patchState({
      status: 'loading'
    });
    try {
      const res = await this.newsService.getArticleTopHeadlines().toPromise();
      ctx.patchState({
        status: 'success',
        items: res['articles']
      })
    } catch {
      ctx.patchState({
        status: 'error',
        items: []
      })
    }
  }
}
