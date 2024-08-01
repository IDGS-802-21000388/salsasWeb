import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { AlertService } from '../../../services/alert.service';
import { ComparacionService } from '../../../services/comparacion.service';

@Component({
  selector: 'app-ventas-distribuidas',
  templateUrl: './ventas-distribuidas.component.html',
  styleUrls: ['./ventas-distribuidas.component.css'],
})
export class VentasDistribuidasComponent implements OnInit {
  year: number = 0;
  salesDistributionChart: Chart | undefined;

  constructor(
    private comparacionService: ComparacionService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.year = 2023;
    this.generateReport();
  }

  generateReport(): void {
    if (this.year) {
      this.loadSalesDistributionByYear();
    } else {
      this.alertService.error(
        'Por favor proporcione un año.',
        'Error de Entrada'
      );
    }
  }

  loadSalesDistributionByYear(): void {
    this.comparacionService
      .getSalesDistributionByYear(this.year)
      .subscribe((salesDistribution) => {
        const labels = salesDistribution.map((item: any) => item.rol);
        const data = salesDistribution.map((item: any) => item.totalVentas);
        const maxVal = Math.max(...data);
        this.createChart(
          'salesDistributionChart',
          'Distribución de Ventas por Tipo de Cliente',
          'Ventas',
          labels,
          data,
          maxVal
        );
      });
  }

  createChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    data: number[],
    maxVal: number
  ): void {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: 'rgba(228, 0, 124, 0.2)',  // Color de fondo de los puntos
            borderColor: '#e4007c',  // Color de la línea
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: '#e4007c',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#e4007c'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: maxVal
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.dataset.label}: ${context.raw}`
            }
          }
        }
      }
    };

    const chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {
      if (this.salesDistributionChart) {
        this.salesDistributionChart.destroy();
      }
      this.salesDistributionChart = new Chart(chartElement, config);
    }
  }
}
