import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ArticleFilterModel } from 'src/app/core/models/filter.model';
import { GetArticleListAction, LoadMoreArticleListAction } from 'src/app/core/states/articles/article.actions';
import { ArticleState } from 'src/app/core/states/articles/article.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public keywords = '';
  public infiniteEl: HTMLIonInfiniteScrollElement;
  public loadingEl: HTMLIonLoadingElement;


  @Select(ArticleState.listArticle) listArticle$: Observable<ArticleModel[]>;
  @Select(ArticleState.filters) filters$: Observable<ArticleFilterModel>;
  @Select(ArticleState.status) listArticleStatus$: Observable<string>;

  constructor(
    private navCtrl: NavController,
    private store: Store,
    private loadingCtrl: LoadingController,
    private toast: ToastController) { }

  ngOnInit() {
    this.filters$.subscribe(data => {
      this.keywords = data.q;
    });
    this.listArticleStatus$.subscribe(async (data) => {
      switch (data['code']) {
        case 'loading':
          this.loadingEl = (await this.loadingCtrl.create());
          this.loadingEl?.present();
          break;
        case 'success':
        case 'error':
          this.infiniteEl?.complete();
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
    this.getListArticle({
      q: '*',
      page: 1
    });
  }

  viewDetail(article: ArticleModel) {
    this.navCtrl.navigateForward(['tabs', 'search', 'articleDetail'], {
      state: {
        article
      },
    });
  }

  search() {
    this.getListArticle({
      q: this.keywords,
      page: 1
    });
  }
  loadMore(infinite: any) {
    this.infiniteEl = infinite.target;
    const filters = this.store.selectSnapshot(ArticleState.filters);
    this.loadMoreArticle(filters);

  }
  getListArticle(filters: ArticleFilterModel) {
    this.store.dispatch(new GetArticleListAction({
      ...filters
    }));
  }

  loadMoreArticle(filters: ArticleFilterModel) {
    this.store.dispatch(new LoadMoreArticleListAction({
      ...filters
    }))
  }
}
