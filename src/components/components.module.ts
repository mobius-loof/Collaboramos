import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { HomeProjectComponent } from './home-project/home-project';

@NgModule({
	declarations: [
        HomeProjectComponent
    ],
	imports: [
        IonicModule,
        SwingModule,
        HttpModule,
    ],
	exports: [
        HomeProjectComponent
    ]
})
export class HomeProjectModule {}
