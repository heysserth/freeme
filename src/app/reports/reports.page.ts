import { Router } from '@angular/router';
import { UserService } from './../http/user.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  userInfo;
  hasLoaded;
  summary;
  chartBars;
  selectedTypeGraph = 'quarterly';
  title = '';
  constructor(private userSvr: UserService, public actionSheetController: ActionSheetController,
              private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.initializeGraphOptions();
    this.userSvr.getUserBalanceGraph().subscribe((response: any) => {
      if (response.status === 200) {
        this.userInfo = response.data;
        this.loadViewData();
      }
    }, (error) => { this.presentAlert(error.message); this.hasLoaded = true; } );

  }
  
  initializeGraphOptions() {
    this.chartBars = {
      chart: {
        type: 'area',
        height: 350,
        stacked: false,
        colors: ['#11D5EF', '#E71D73'],
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          }
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      colors: ['#11D5EF', '#E71D73'],

      stroke: {
        curve: 'straight'
      },
      fill: {
        type: 'gradient',
        colors: ['#11D5EF', '#E71D73'],
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
      zoom: {
        enabled: true,
        type: 'x',
      },
      series: [],
      labels: []
    };
  }

  /* Call to load all data on actual view,  */
  loadViewData() {
    this.chartBars.series = [
      {
        name: 'Ingresos',
        data: this.userInfo[this.selectedTypeGraph].detail.income
      },
      {
        name: 'Gastos',
        data: this.userInfo[this.selectedTypeGraph].detail.expense
      },
    ];
    this.chartBars.labels = this.userInfo[this.selectedTypeGraph].detail.labels;
    this.title = this.userInfo[this.selectedTypeGraph].dateShow;
    this.summary = this.reloadGraphData();
    this.hasLoaded = true;
  }

  /* Return a {} with data formated from DB to be used on componenet app-transaction-detail */
  reloadGraphData() {

    return {
      credit : {  ...this.userInfo[this.selectedTypeGraph].summary.credit,
                  date: this.userInfo[this.selectedTypeGraph].summary.date,
                  dateShow: this.userInfo[this.selectedTypeGraph].summary.dateShow,
                  type: 'credit'},
      debit : { ...this.userInfo[this.selectedTypeGraph].summary.debit,
                date: this.userInfo[this.selectedTypeGraph].summary.date,
                dateShow: this.userInfo[this.selectedTypeGraph].summary.dateShow,
                type: 'debit'}
    };

  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Periodos',
      buttons: [{
        text: 'Mensual',
        handler: () => {
          this.selectedTypeGraph = 'monthly';
          this.loadViewData();
        }
      }, {
        text: 'Último trimestre',
        handler: () => {
          this.selectedTypeGraph = 'quarterly';
          this.loadViewData();
        }
      }, {
        text: 'Anual',
        handler: () => {
          this.selectedTypeGraph = 'annual';
          this.loadViewData();
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlert(headerMsg) {
    const alert = await this.alertController.create({
      header: headerMsg,
      message: 'Inicia sesion nuevamente',
      buttons: ['Cerrar']
    });
    await alert.present().then(() => {
      this.router.navigateByUrl('/login');
    });
  }


}
