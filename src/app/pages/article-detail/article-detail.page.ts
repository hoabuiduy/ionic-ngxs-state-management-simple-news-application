import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ArticleModel } from 'src/app/core/models/article.model';
import { Plugins } from '@capacitor/core';
const { Browser, Share } = Plugins;
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {

  article: ArticleModel;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

    this.article = history.state?.article;
    if (!this.article) {
      this.navCtrl.back();
    }
  }

  openArticleOnBrowser(article: ArticleModel) {
    Browser.open({
      url: article.url
    })
  }

  openFullImage(imgUrl: string) {

    Browser.open({
      url: imgUrl
    })
  }

  share() {
    Share.share({
      dialogTitle: 'Share This Article',
      url: this.article?.url
    });
  }

}
