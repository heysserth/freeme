import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportsPage } from './reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    NgApexchartsModule,
    
  ],
  declarations: [
    ReportsPage,
    TransactionDetailComponent
  ]
})
export class ReportsPageModule {}
