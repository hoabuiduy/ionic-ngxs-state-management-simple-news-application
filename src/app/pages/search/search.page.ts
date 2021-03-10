import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleSourceModel } from 'src/app/core/models/article-source.model';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ArticleFilterModel } from 'src/app/core/models/filter.model';
import { GetArticleListAction, LoadMoreArticleListAction, SetArticleSourceAction } from 'src/app/core/states/articles/article.actions';
import { ArticleState } from 'src/app/core/states/articles/article.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  public keywords = '';
  public infiniteEl: HTMLIonInfiniteScrollElement;
  public loadingEl: HTMLIonLoadingElement;
  public refresher: HTMLIonRefresherElement;

  private triggerSearch: boolean = false;

  @Select(ArticleState.listArticle) listArticle$: Observable<ArticleModel[]>;
  @Select(ArticleState.filters) filters$: Observable<ArticleFilterModel>;
  @Select(ArticleState.status) listArticleStatus$: Observable<{ code, message }>;
  @Select(ArticleState.source) source$: Observable<ArticleSourceModel>;

  constructor(
    private navCtrl: NavController,
    private store: Store,
    private loadingCtrl: LoadingController,
    private toast: ToastController) { }

  ngOnInit() {

    const source = this.store.selectSnapshot(ArticleState.source);
    this.filters$.subscribe(data => {
      this.keywords = data.keyword;
    });
    this.listArticleStatus$.subscribe(async (data) => {
      switch (data['code']) {
        case 'loading':
          this.loadingEl = (await this.loadingCtrl.create());
          this.loadingEl?.present();
          break;
        case 'success':
        case 'error':
        case 'empty':
          this.infiniteEl?.complete();
          this.refresher?.complete();
          this.loadingEl?.dismiss();
          if (data['code'] === 'error') {
            (await this.toast.create({
              color: 'danger',
              duration: 3000,
              message: data['message']
            })).present();
          }
          break;
      }
    });
    this.source$.subscribe(source => {
      this.getListArticle({
        page: 1,
        sources: source?.id || ''
      });
    })

  }

  ngOnDestroy() {
    console.log('destroy search');
  }
  viewDetail(article: ArticleModel) {
    this.navCtrl.navigateForward(['tabs', 'search', 'articleDetail'], {
      state: {
        article
      },
    });
  }

  search(event: any) {
    this.triggerSearch = true;
    this.getListArticle({
      q: event?.target?.value !== '' ? event?.target?.value : '*',
      keyword: event?.target?.value,
      page: 1
    });
  }
  onClearKeyword() {
    if (!this.triggerSearch) {
      return;
    }
    this.getListArticle({
      q: '*',
      keyword: '',
      page: 1
    });
    this.triggerSearch = false;
  }
  doRefresh(refresher: any) {
    this.refresher = refresher?.target;

    this.getListArticle({
      ...this.store.selectSnapshot(ArticleState.filters),
      page: 1
    }, 'initial')
  }
  loadMore(infinite: any) {
    this.infiniteEl = infinite.target;
    const filters = this.store.selectSnapshot(ArticleState.filters);
    this.loadMoreArticle(filters);
  }
  disableLoadmore() {
    const status = this.store.selectSnapshot(ArticleState.status);
    return ['error', 'empty', 'nomore'].indexOf(status.code) > -1;
  }
  getListArticle(filters: ArticleFilterModel, status = 'loading') {
    this.store.dispatch(new GetArticleListAction({
      ...filters
    }, status));
  }

  loadMoreArticle(filters: ArticleFilterModel) {
    this.store.dispatch(new LoadMoreArticleListAction({
      ...filters,
      page: filters.page + 1
    }))
  }

  clearSource() {
    this.store.dispatch(new SetArticleSourceAction(null))
  }
  selectSource() {
    this.navCtrl.navigateForward(['tabs', 'category']);
  }
}
