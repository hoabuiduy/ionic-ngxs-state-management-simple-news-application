import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleSourceModel } from 'src/app/core/models/article-source.model';
import { GetArticleSourceListAction } from 'src/app/core/states/article-source/article-source.actions';
import { ArticleSourceState } from 'src/app/core/states/article-source/article-source.state';
import { SetArticleSourceAction } from 'src/app/core/states/articles/article.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  @Select(ArticleSourceState.articleSources) articleSources$: Observable<ArticleSourceModel[]>;
  @Select(ArticleSourceState.status) articleSourceStatus$: Observable<{ code, message?}>;

  constructor(
    private store: Store,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.getArticleSources();
  }


  viewDetail(source: ArticleSourceModel) {
    this.setArticleSource(source);
    this.navCtrl.navigateForward(['tabs', 'search'])
  }
  getArticleSources() {
    this.store.dispatch(new GetArticleSourceListAction());
  }
  setArticleSource(source: ArticleSourceModel) {
    this.store.dispatch(new SetArticleSourceAction(source));
  }
}
