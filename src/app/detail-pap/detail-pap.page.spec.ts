import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPapPage } from './detail-pap.page';

describe('DetailPapPage', () => {
  let component: DetailPapPage;
  let fixture: ComponentFixture<DetailPapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
