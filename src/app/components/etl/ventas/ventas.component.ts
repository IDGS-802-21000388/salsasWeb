import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { VentasService } from '../../../services/etl.service'; // Asegúrate de que la ruta sea correcta
import { VentasPorProductoPeriodo } from '../../../interfaces/VentasPorProductoPeriodo'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: VentasPorProductoPeriodo[] = [];
  ventasChart: Chart | undefined;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    this.ventasService.getVentasPorProductoPeriodos().subscribe((data) => {
      this.ventas = data;
      this.generateVentasChart();
    }, error => {
      console.error('Error al obtener datos:', error);
    });
  }

  generateVentasChart(): void {
    const chartData = this.calculateVentasChartData();
    this.createVentasChart('ventasChart', 'Ventas por Producto', 'Número de Ventas', chartData.labels, chartData.numeroVentas, chartData.totalRecaudado);
  }

  calculateVentasChartData(): { labels: string[], numeroVentas: number[], totalRecaudado: number[] } {
    return {
      labels: this.ventas.map(v => v.nombreProducto),
      numeroVentas: this.ventas.map(v => v.numeroVentas),
      totalRecaudado: this.ventas.map(v => v.totalRecaudado),
    };
  }

  createVentasChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    numeroVentas: number[],
    totalRecaudado: number[]
  ): void {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Número de Ventas',
            data: numeroVentas,
            backgroundColor: '#c31a23',
            borderColor: '#c31a23',
            borderWidth: 1,
          },
          {
            label: 'Total Recaudado',
            data: totalRecaudado,
            backgroundColor: '#66b2ff',
            borderColor: '#66b2ff',
            borderWidth: 1,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  // Formato del número sin símbolo de moneda
                  label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    const chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {
      if (this.ventasChart) {
        this.ventasChart.destroy();
      }
      this.ventasChart = new Chart(chartElement, config);
    }
  }
}
