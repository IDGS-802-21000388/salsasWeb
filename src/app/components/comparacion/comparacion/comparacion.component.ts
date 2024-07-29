import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ComparacionService } from '../../../services/comparacion.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css'],
})
export class ComparacionComponent implements OnInit {
  startDate?: string;
  endDate?: string;
  year: number = 0;
  salesChart: Chart | undefined;
  purchasesChart: Chart | undefined;
  profitsChart: Chart | undefined;

  constructor(
    private comparacionService: ComparacionService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.year = 2023;
    this.generateReport();
  }

  generateReport(): void {
    if (this.startDate && this.endDate && this.year) {
      this.alertService.error(
        'Por favor proporcione un rango de fechas o un año, no ambos.',
        'Error de Entrada'
      );
    } else if (this.startDate && this.endDate) {
      this.loadTotalSalesAndPurchases();
    } else if (this.year) {
      this.loadMonthlySalesAndPurchases();
    } else {
      this.alertService.error(
        'Por favor proporcione un rango de fechas o un año.',
        'Error de Entrada'
      );
    }
  }

  loadTotalSalesAndPurchases(): void {
    this.comparacionService
      .getTotalSales(this.startDate, this.endDate)
      .subscribe((totalSales) => {
        this.comparacionService
          .getTotalPurchases(this.startDate, this.endDate)
          .subscribe((totalPurchases) => {
            const maxVal = Math.max(totalSales, totalPurchases);
            this.createChart(
              'salesChart',
              'Ventas Totales',
              'Ventas',
              ['Ventas Totales'],
              [totalSales],
              maxVal
            );
            this.createChart(
              'purchasesChart',
              'Compras Totales',
              'Compras',
              ['Compras Totales'],
              [totalPurchases],
              maxVal
            );
          });
      });

    this.calculateProfits();
  }

  loadMonthlySalesAndPurchases(): void {
    this.comparacionService
      .getMonthlySales(this.year)
      .subscribe((monthlySales) => {
        this.comparacionService
          .getMonthlyPurchases(this.year)
          .subscribe((monthlyPurchases) => {
            const salesData = monthlySales.map((sale: any) => sale.total);
            const purchasesData = monthlyPurchases.map(
              (purchase: any) => purchase.total
            );
            const salesLabels = monthlySales.map((sale: any) =>
              this.getMonthName(sale.month)
            );
            const purchasesLabels = monthlyPurchases.map((purchase: any) =>
              this.getMonthName(purchase.month)
            );
            const maxVal = Math.max(...salesData, ...purchasesData);
            this.createChart(
              'salesChart',
              'Comparación de Ventas Mensuales',
              'Ventas',
              salesLabels,
              salesData,
              maxVal
            );
            this.createChart(
              'purchasesChart',
              'Comparación de Compras Mensuales',
              'Compras',
              purchasesLabels,
              purchasesData,
              maxVal
            );
          });
      });

    this.calculateProfits();
  }

  calculateProfits(): void {
    if (this.startDate && this.endDate) {
      this.comparacionService
        .getTotalSales(this.startDate, this.endDate)
        .subscribe((totalSales) => {
          this.comparacionService
            .getTotalPurchases(this.startDate, this.endDate)
            .subscribe((totalPurchases) => {
              const profits = totalSales - totalPurchases;
              this.createChart(
                'profitsChart',
                'Ganancias',
                'Ganancia',
                ['Ganancias'],
                [profits],
                Math.abs(profits)
              );
            });
        });
    } else if (this.year) {
      this.comparacionService
        .getMonthlySales(this.year)
        .subscribe((monthlySales) => {
          const salesData = monthlySales.map((sale: any) => sale.total);
          this.comparacionService
            .getMonthlyPurchases(this.year)
            .subscribe((monthlyPurchases) => {
              const purchasesData = monthlyPurchases.map(
                (purchase: any) => purchase.total
              );
              const profitsData = salesData.map(
                (sales: number, index: number) => sales - purchasesData[index]
              );
              const labels = monthlySales.map((sale: any) =>
                this.getMonthName(sale.month)
              );
              this.createChart(
                'profitsChart',
                'Comparación de Ganancias Mensuales',
                'Ganancia',
                labels,
                profitsData,
                Math.max(...profitsData.map(Math.abs))
              );
            });
        });
    }
  }

  createChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    data: number[],
    maxVal: number
  ): void {
    const backgroundColors = data.map((value) =>
      value < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'
    );
    const borderColors = data.map((value) =>
      value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
    );

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
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
      if (chartId === 'salesChart') {
        if (this.salesChart) this.salesChart.destroy();
        this.salesChart = new Chart(chartElement, config);
      }
      if (chartId === 'purchasesChart') {
        if (this.purchasesChart) this.purchasesChart.destroy();
        this.purchasesChart = new Chart(chartElement, config);
      }
      if (chartId === 'profitsChart') {
        if (this.profitsChart) this.profitsChart.destroy();
        this.profitsChart = new Chart(chartElement, config);
      }
    }
  }

  getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('es', { month: 'short' });
  }
}
