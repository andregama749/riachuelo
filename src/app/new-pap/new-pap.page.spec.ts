import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPapPage } from './new-pap.page';

describe('NewPapPage', () => {
  let component: NewPapPage;
  let fixture: ComponentFixture<NewPapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
