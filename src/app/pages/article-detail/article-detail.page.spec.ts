import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Plugins } from '@capacitor/core';
import { IonicModule, NavController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FavoriteArticleAddAction } from 'src/app/core/states/favorite-article/favorite-article.actions';
import { NavMock } from 'src/app/shared/mocks';

import { ArticleDetailPage } from './article-detail.page';

describe('ArticleDetailPage', () => {
  let component: ArticleDetailPage;
  let fixture: ComponentFixture<ArticleDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleDetailPage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot()
      ],
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('#navCtrl.back should be called', () => {
      spyOn(component.navCtrl, 'back');
      history.pushState({
        article: null
      }, '', '');
      component.ngOnInit();
      expect(component.navCtrl.back).toHaveBeenCalled();
    })
    it('#navCtrl.back should not be called', () => {
      spyOn(component.navCtrl, 'back');
      history.pushState({
        article: {
          author: 'abc'
        }
      }, '', '');
      component.ngOnInit();
      expect(component.navCtrl.back).toHaveBeenCalledTimes(0);
    })
  })

  it('#openArticleOnBrowser', () => {
    const { Browser } = Plugins;
    spyOn(Browser, 'open');
    component.openArticleOnBrowser({
      url: 'test.com'
    });
    expect(Browser.open).toHaveBeenCalledWith({
      url: 'test.com'
    })
  })

  it('#openFullImage', () => {
    const { Browser } = Plugins;
    spyOn(Browser, 'open');
    component.openFullImage('imgUrl');
    expect(Browser.open).toHaveBeenCalledWith({
      url: 'imgUrl'
    })
  })

  it('#share', () => {
    const { Share } = Plugins;
    spyOn(Share, 'share');
    component.article = {
      url: 'test'
    }
    component.share();
    expect(Share.share).toHaveBeenCalledWith({
      dialogTitle: 'Share This Article',
      url: 'test'
    })
  })

  it('#addToFavorite', () => {
    spyOn(component.store, 'dispatch');
    component.article = {
      favorite: false
    }
    component.addToFavorite();
    expect(component.store.dispatch).toHaveBeenCalledWith(new FavoriteArticleAddAction({
      favorite: true
    }))
  })
});
