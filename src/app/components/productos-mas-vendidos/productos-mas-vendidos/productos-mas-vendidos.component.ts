import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { AlertService } from '../../../services/alert.service';
import { ComparacionService } from '../../../services/comparacion.service';

@Component({
  selector: 'app-productos-mas-vendidos',
  templateUrl: './productos-mas-vendidos.component.html',
  styleUrls: ['./productos-mas-vendidos.component.css'],
})
export class ProductosMasVendidosComponent implements OnInit {
  year: number = 0;
  month?: number;
  topProductsChart: Chart | undefined;
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  constructor(
    private productosService: ComparacionService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.year = 2023;
    this.generateReport();
  }

  generateReport(): void {
    if (this.year) {
      if (this.month !== undefined) {
        this.loadTopSellingProductsByMonth();
      } else {
        this.loadTopSellingProductsByYear();
      }
    } else {
      this.alertService.error(
        'Por favor proporcione un año.',
        'Error de Entrada'
      );
    }
  }

  loadTopSellingProductsByYear(): void {
    this.productosService
      .getTopSellingProductsByYear(this.year)
      .subscribe((topProducts) => {
        const labels = topProducts.map(
          (product: any) => `${product.nombreProducto} (${product.cantidad} ${product.tipoMedida})`
        );
        const data = topProducts.map((product: any) => product.totalSold);
        const maxVal = Math.max(...data);
        this.createChart(
          'topProductsChart',
          'Productos Más Vendidos del Año',
          'Cantidad Vendida',
          labels,
          data,
          maxVal
        );
      });
  }

  loadTopSellingProductsByMonth(): void {
    this.productosService
      .getTopSellingProductsByMonth(this.year, this.month!)
      .subscribe((topProducts) => {
        const labels = topProducts.map(
          (product: any) => `${product.nombreProducto} (${product.cantidad} ${product.tipoMedida})`
        );
        const data = topProducts.map((product: any) => product.totalSold);
        const maxVal = Math.max(...data);
        this.createChart(
          'topProductsChart',
          `Productos Más Vendidos del Mes ${this.getMonthName(this.month!)}`,
          'Cantidad Vendida',
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
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',  // Color de hover
            hoverBorderColor: 'rgba(255, 99, 132, 1)',  // Borde de hover
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: maxVal,
          },
        },
      },
    };

    const chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {
      if (this.topProductsChart) {
        this.topProductsChart.destroy();
      }
      this.topProductsChart = new Chart(chartElement, config);
    }
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return monthNames[month - 1];
  }
}
