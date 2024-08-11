import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { VentasService } from '../../../services/etl.service';
import { RankingClientes } from '../../../interfaces/RankingClientes'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-clientes-ranking',
  templateUrl: './clientes-ranking.component.html',
  styleUrls: ['./clientes-ranking.component.css']
})
export class ClientesRankingComponent implements OnInit {

  ranking: RankingClientes[] = [];
  rankingChart: Chart | undefined;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.loadRankingClientes();
  }

  loadRankingClientes(): void {
    this.ventasService.getRankingClientes().subscribe((data) => {
      this.ranking = data;
      this.generateVentasChart();
    }, error => {
      console.error('Error al obtener datos:', error);
    });
  }

  generateVentasChart(): void {
    const chartData = this.calculateVentasChartData();
    this.createVentasChart('ventasChart', 'Número de Compras', chartData.labels, chartData.comprasTotales);
  }

  calculateVentasChartData(): { labels: string[], comprasTotales: number[] } {
    return {
      labels: this.ranking.map(v => v.nombreUsuario),
      comprasTotales: this.ranking.map(v => v.comprasTotales),
    };
  }

  createVentasChart(
    chartId: string,
    title: string,
    labels: string[],
    comprasTotales: number[]
  ): void {
    const backgroundColors = comprasTotales.map(value => {
      if (value <= 400) {
        return 'red';
      } else if (value <= 1000) {
        return 'orange';
      } else {
        return 'green';
      }
    });

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Compras Totales',
            data: comprasTotales,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
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
      plugins: [
        {
          id: 'custom-legend',
          beforeDraw(chart) {
            const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;

            ctx.save();

            const textConfigs = [
              { color: 'red', text: '0-400' },
              { color: 'orange', text: '401-1000' },
              { color: 'green', text: '1001+' }
            ];

            textConfigs.forEach((config, index) => {
              ctx.fillStyle = config.color;
              ctx.fillRect(right - 100, top + (index * 20), 12, 12);

              ctx.font = '12px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText(config.text, right - 80, top + 10 + (index * 20));
            });

            ctx.restore();
          }
        }
      ]
    };

    const chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {
      if (this.rankingChart) {
        this.rankingChart.destroy();
      }
      this.rankingChart = new Chart(chartElement, config);
    }
  }
}
