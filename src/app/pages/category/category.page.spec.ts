import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SetArticleSourceAction } from 'src/app/core/states/articles/article.actions';
import { ArticleState } from 'src/app/core/states/articles/article.state';

import { CategoryPage } from './category.page';
class NavMock {
  public navigateForward() {
  }
}
fdescribe('CategoryPage', () => {
  let component: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPage],
      imports: [IonicModule.forRoot(),
      NgxsModule.forRoot()],
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('ionInit', done => {
    component.store.dispatch(new SetArticleSourceAction({
      id: 'abc'
    }))
    const source = component.store.selectSnapshot(ArticleState.source);
    expect(source).toBeTruthy();
    expect(source?.id).toEqual('abc');
  })
});
