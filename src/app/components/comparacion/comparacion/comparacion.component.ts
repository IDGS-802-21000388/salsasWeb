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
    this.year = 2024;
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

            // Verificar si hay datos
          if (totalSales === 0 && totalPurchases === 0) {
            this.alertService.error('No se encontraron registros para el rango de fechas proporcionado.', 'Sin Datos');
            return;
          }
            console.log(totalSales);
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
            const salesData = this.fillData(monthlySales, 'month', 'total');
            const purchasesData = this.fillData(monthlyPurchases, 'month', 'total');

            if (salesData.every(sale => sale === 0) && purchasesData.every(purchase => purchase === 0)) {
              this.alertService.error(`No se encontraron registros para el año ${this.year}.`, 'Sin Datos');
              return;
            }
            
            const labels = salesData.map((_, index) => this.getMonthName(index + 1));
            const maxVal = Math.max(...salesData, ...purchasesData);
            this.createChart(
              'salesChart',
              'Comparación de Ventas Mensuales',
              'Ventas',
              labels,
              salesData,
              maxVal
            );
            this.createChart(
              'purchasesChart',
              'Comparación de Compras Mensuales',
              'Compras',
              labels,
              purchasesData,
              maxVal
            );

            const profitsData = salesData.map((sales, index) => sales - purchasesData[index]);
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
          const salesData = this.fillData(monthlySales, 'month', 'total');
          this.comparacionService
            .getMonthlyPurchases(this.year)
            .subscribe((monthlyPurchases) => {
              const purchasesData = this.fillData(monthlyPurchases, 'month', 'total');
              const profitsData = salesData.map(
                (sales: number, index: number) => sales - purchasesData[index]
              );
              const labels = salesData.map((_, index) => this.getMonthName(index + 1));
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

  fillData(data: any[], key: string, value: string): number[] {
    const filledData = Array(12).fill(0);
    data.forEach(item => {
      filledData[item[key] - 1] = item[value];
    });
    return filledData;
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

  clearInputs(): void {
    this.year = 0;
    this.startDate = undefined;
    this.endDate = undefined;
  
    if (this.salesChart) this.salesChart.destroy();
    if (this.purchasesChart) this.purchasesChart.destroy();
    if (this.profitsChart) this.profitsChart.destroy();
  }
  
}
