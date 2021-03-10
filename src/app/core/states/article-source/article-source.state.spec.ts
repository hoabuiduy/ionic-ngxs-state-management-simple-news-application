import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ArticleSourceState } from './article-source.state';
import { GetArticleSourceListAction } from './article-source.actions';
import { ArticleService } from '../../services/article.service';
import { ArticleSourceModel } from '../../models/article-source.model';

const mockSources = {
  data: {
    sources: [
      {
        id: '1',
        category: 'a',
        country: 'us',
        language: 'en'
      }
    ],
    status: 'success'
  }
}
fdescribe('ArticleSource actions', () => {
  let store: Store;
  let valueServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ArticleService', ['getArticleSources']);
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ArticleSourceState])],
      providers: [
        {
          provide: ArticleService,
          useValue: spy
        }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    valueServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;

  }));

  it('should get list article source', fakeAsync(() => {
    valueServiceSpy.getArticleSources.and.returnValue(new Promise(resolve => {
      resolve(mockSources as any)
    }));
    store.dispatch(new GetArticleSourceListAction());
    tick();
    store.select(ArticleSourceState.articleSources).subscribe((items: ArticleSourceModel[]) => {
      expect(items).toEqual(jasmine.objectContaining([
        {
          id: '1',
          category: 'a',
          country: 'us',
          language: 'en'
        }
      ]));
    });
  }));

});
