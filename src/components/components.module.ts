import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { HomeProjectComponent } from './home-project/home-project';
import { HomeCandidateComponent } from './home-candidate/home-candidate';

@NgModule({
	declarations: [
        HomeCandidateComponent,
    ],
	imports: [
        IonicModule,
        SwingModule,
        HttpModule,
    ],
	exports: [
        HomeCandidateComponent,
    ]
})
export class HomeCandidateModule{}

@NgModule({
	declarations: [
        HomeProjectComponent,
    ],
	imports: [
        IonicModule,
        SwingModule,
        HttpModule,
    ],
	exports: [
        HomeProjectComponent,
    ]
})
export class HomeProjectModule{}


