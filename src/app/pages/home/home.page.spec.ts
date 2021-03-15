import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetListArticleHeadlineAction, LoadMoreArticleHeadlienAction } from 'src/app/core/states/article-headline/article-headline.actions';

import { HomePage } from './home.page';

class NavMock {
  public navigateForward() {

  }
}
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
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

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("#getArticleHeadlines should be called", fakeAsync(() => {
    spyOn(component, 'getArticleHeadlines');
    component.ngOnInit();
    tick();
    expect(component.getArticleHeadlines).toHaveBeenCalledWith('loading');
  }));

  it('#viewDetail', () => {
    spyOn(component.navCtrl, 'navigateForward');
    const article = {};
    component.viewDetail(article);
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'home', 'articleDetail'], {
      state: {
        article
      },
    });
  })

  it('#goToSearch', () => {
    spyOn(component.navCtrl, 'navigateForward');
    component.goToSearch();
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'search']);
  })

  it('#loadMore', () => {
    spyOn(component, 'loadMoreArticleHeadlines');
    component.loadMore({});
    expect(component.loadMoreArticleHeadlines).toHaveBeenCalled();
  })

  it('#doRefresh', () => {
    spyOn(component, 'getArticleHeadlines');
    component.doRefresh({});
    expect(component.getArticleHeadlines).toHaveBeenCalledWith('initial');
  });
  it('#getArticleHeadlines', () => {
    const dispatchSpy = spyOn(TestBed.inject(Store), 'dispatch').and.returnValue(of());
    component.getArticleHeadlines('initial');
    expect(dispatchSpy).toHaveBeenCalledWith(new GetListArticleHeadlineAction('initial'));
  })
  it('#loadMoreArticleHeadlines', () => {
    const dispatchSpy = spyOn(TestBed.inject(Store), 'dispatch').and.returnValue(of());
    component.loadMoreArticleHeadlines();
    expect(dispatchSpy).toHaveBeenCalledWith(new LoadMoreArticleHeadlienAction());
  })
});
