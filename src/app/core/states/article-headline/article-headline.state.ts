import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleModel } from '../../models/article.model';
import { ArticleFilterModel, ArticleHeadlineFilterModel } from '../../models/filter.model';
import { ArticleService } from '../../services/article.service';
import { GetListArticleHeadlineAction, LoadMoreArticleHeadlienAction } from './article-headline.actions';
import { patch, append } from '@ngxs/store/operators';

export interface ArticleHeadlineStateModel {
  items: ArticleModel[];
  status: { code: string, message?: string };
  filters: ArticleHeadlineFilterModel;
}

@State<ArticleHeadlineStateModel>({
  name: 'articleHeadline',
  defaults: {
    items: [],
    status: {
      code: 'initial'
    },
    filters: {
      category: 'general',
      page: 1,
      pageSize: 10,
      country: 'us'
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
      status: {
        code: action.loadingStatus
      }
    });
    try {

      const res = await this.articleService.getArticleTopHeadlines({
        ...state.filters,
        page: 1
      });
      const articles = res['data']['articles'];
      const code = res['data']['status'];
      if (code === 'error') {
        throw res['data']['message'];
      }
      ctx.patchState({
        status: {
          code: 'success'
        },
        items: articles,
        filters: {
          ...state.filters,
          page: 1
        }
      })
    } catch (ex) {
      ctx.patchState({
        status: { code: 'error', message: ex },
        items: []
      })
    }
  }

  @Action(LoadMoreArticleHeadlienAction)
  async loadMoreArticleHeadline(ctx: StateContext<ArticleHeadlineStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      status: {
        code: 'loadmore'
      }
    });
    try {
      const res = await this.articleService.getArticleTopHeadlines({
        ...state.filters,
        page: state.filters.page + 1
      });
      const articles = res['data']['articles'];
      const code = res['data']['status'];
      if (code === 'error') {
        throw res['data']['message'];
      }
      if (articles.length < 10) {
        ctx.patchState({
          status: {
            code: 'empty'
          }
        });
      } else {
        ctx.patchState({
          status: { code: 'success' },
          filters: {
            ...state.filters,
            page: state.filters.page + 1
          }
        })
        ctx.setState(patch({
          items: append(articles)
        }))
      }
    } catch (ex) {
      ctx.patchState({
        status: {
          code: 'error',
          message: ex
        },
        items: []
      })
    }
  }
}
