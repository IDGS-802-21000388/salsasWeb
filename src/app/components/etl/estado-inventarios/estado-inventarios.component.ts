// src/app/components/estado-inventarios/estado-inventarios.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { EstadoInventariosService } from '../../../services/estado-inventarios.service';
import { InventarioReporte } from '../../../interfaces/InventarioReporte';

@Component({
  selector: 'app-estado-inventarios',
  templateUrl: './estado-inventarios.component.html',
  styleUrls: ['./estado-inventarios.component.css']
})
export class EstadoInventariosComponent implements OnInit {
  inventarioReportes: InventarioReporte[] = [];
  inventoryStatusChart: Chart | undefined;
  rol: string = '';

  constructor(private estadoInventariosService: EstadoInventariosService) {}

  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('loggedUser') || '{}').rol;
    this.loadInventarioReportes();
  }

  loadInventarioReportes(): void {
    this.estadoInventariosService.getInventarioReportes().subscribe((data) => {
      this.inventarioReportes = data;
      this.generateInventoryStatus();
    });
  }

  generateInventoryStatus(): void {
    const status = this.calculateInventoryStatus();
    this.createInventoryChart('inventoryStatusChart', 'Estado de Inventarios', 'Cantidad', status.labels, status.data, status.colors);
  }

  calculateInventoryStatus(): { labels: string[], data: number[], colors: string[] } {
    const inventoryMap: { [key: string]: { cantidad: number, color: string } } = {};
    this.inventarioReportes.forEach(report => {
      const cantidad = report.cantidad;
      const color = cantidad > 100 ? 'green' : cantidad > 50 ? 'yellow' : 'red';
      inventoryMap[report.nombre] = { cantidad, color };
    });
    return {
      labels: Object.keys(inventoryMap),
      data: Object.values(inventoryMap).map(item => item.cantidad),
      colors: Object.values(inventoryMap).map(item => item.color)
    };
  }

  createInventoryChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    data: number[],
    colors: string[]
  ): void {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: colors,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    const chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {
      if (this.inventoryStatusChart) {
        this.inventoryStatusChart.destroy();
      }
      this.inventoryStatusChart = new Chart(chartElement, config);
    }
  }
}
