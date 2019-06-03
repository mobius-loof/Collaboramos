import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { HomeProjectComponent } from './home-project/home-project';
import { HomeCandidateComponent } from './home-candidate/home-candidate';
import { TimelineComponentModule } from './timeline/timeline.module';

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

import { Timer } from './countdown-timer/timer';
import { TimerProgress } from './timer-progress/timer-progress';
import { ExpandableHeader } from './expandable-header/expandable-header';
import { FlashCardComponent } from './flash-card/flash-card';
import { AccordionListComponent } from './accordion-list/accordion-list';

export const components = [
  Timer,
  TimerProgress,
  ExpandableHeader,
  FlashCardComponent,
  AccordionListComponent,
];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components, TimelineComponentModule]
})
export class ComponentsModule {}