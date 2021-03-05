import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleModel } from '../../models/article.model';
import { ArticleFilterModel, ArticleHeadlineFilterModel } from '../../models/filter.model';
import { ArticleService } from '../../services/article.service';
import { GetListArticleHeadlineAction, LoadMoreArticleHeadlienAction } from './article-headline.actions';
import { patch, append } from '@ngxs/store/operators';

export interface ArticleHeadlineStateModel {
  items: ArticleModel[];
  status: string;
  filters: ArticleHeadlineFilterModel;
}

@State<ArticleHeadlineStateModel>({
  name: 'articleHeadline',
  defaults: {
    items: [],
    status: 'initial',
    filters: {
      category: 'general',
      country: 'us',
      page: 1,
      pageSize: 10
    }
  }
})
@Injectable()
export class ArticleHeadlineState {

  constructor(private articleService: ArticleService) { }


  @Selector()
  static articleHeadlines(state: ArticleHeadlineStateModel) {
    return state.items;
  }

  @Selector()
  static status(state: ArticleHeadlineStateModel) {
    return state.status;
  }

  @Action(GetListArticleHeadlineAction)
  async getListArticleHealine(ctx: StateContext<ArticleHeadlineStateModel>, action: GetListArticleHeadlineAction) {
    const state = ctx.getState();
    ctx.patchState({
      status: action.loadingStatus
    });
    try {
      const res = await this.articleService.getArticleTopHeadlines({
        ...state.filters,
        page: 1
      }).toPromise();
      ctx.patchState({
        status: 'success',
        items: res['articles'],
        filters: {
          ...state.filters,
          page: 1
        }
      })
    } catch {
      ctx.patchState({
        status: 'error',
        items: []
      })
    }
  }

  @Action(LoadMoreArticleHeadlienAction)
  async loadMoreArticleHeadline(ctx: StateContext<ArticleHeadlineStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      status: 'loadmore'
    });
    try {
      const res = await this.articleService.getArticleTopHeadlines({
        ...state.filters,
        page: state.filters.page + 1
      }).toPromise();
      if (res['articles'].length < 10) {
        ctx.patchState({
          status: 'empty'
        });
      } else {
        ctx.patchState({
          status: 'success',
          filters: {
            ...state.filters,
            page: state.filters.page + 1
          }
        })
        ctx.setState(patch({
          items: append(res['articles'])
        }))
      }
    } catch {
      ctx.patchState({
        status: 'error',
        items: []
      })
    }
  }
}
