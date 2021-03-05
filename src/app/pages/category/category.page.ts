import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleSourceModel } from 'src/app/core/models/article-source.model';
import { GetArticleSourceListAction } from 'src/app/core/states/article-source/article-source.actions';
import { ArticleSourceState } from 'src/app/core/states/article-source/article-source.state';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  private loadingEl: HTMLIonLoadingElement;

  @Select(ArticleSourceState.articleSources) articleSources$: Observable<ArticleSourceModel[]>;
  @Select(ArticleSourceState.status) articleSourceStatus$: Observable<string>;

  constructor(
    private store: Store,
    private loading: LoadingController,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.articleSourceStatus$.subscribe(async (data) => {
      switch (data) {
        case 'loading':
          this.loadingEl = await this.loading.create();
          await this.loadingEl.present();
          break;
        case 'success':
        case 'error':
          this.loadingEl.dismiss();
          break;
      }
    })
    this.getArticleSources();
  }


  viewDetail(source: ArticleSourceModel) {
    this.navCtrl.navigateForward(['tabs', 'category', 'search'])
  }
  getArticleSources() {
    this.store.dispatch(new GetArticleSourceListAction());
  }
}
