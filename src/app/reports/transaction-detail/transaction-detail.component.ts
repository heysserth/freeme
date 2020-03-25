import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {

  @Input() userInfo ;
  config = {icon: '', title: '', style: ''};

  constructor() { }

  ngOnInit() {
    console.log('TransactionDetailComponent', this.userInfo);
    if (this.userInfo.type === 'credit') {
      this.config.icon = 'assets/chart/gastos-icon-relleno.svg',
      this.config.title = 'GASTOS';
      this.config.style = 'secondary-color';
    } else {
      this.config.icon = 'assets/chart/ingresos-icon-relleno.svg',
      this.config.title = 'INGRESOS';
      this.config.style = 'primary-color';
    }
  }

}
