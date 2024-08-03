import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { CompraService } from '../../../services/compra.service';
import { UsuariosService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  private materiasPrimas: any[] = [];
  private mermas: any[] = [];
  private lossChart: Chart | undefined;
  private expenseChart: Chart | undefined;
  private mostPurchasedChart: Chart | undefined;
  private mostWastedChart: Chart | undefined;
  public rol: string = '';

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private mermaInventarioService: MermaInventarioService,
    private compraService: CompraService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('loggedUser') || '{}').rol;
    this.loadMateriasPrimas();
    this.loadMermas();
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe((materias) => {
      this.materiasPrimas = materias;
      this.generateCharts();
    });
  }

  loadMermas(): void {
    this.mermaInventarioService.getMermas().subscribe((mermas) => {
      this.mermas = mermas;
      this.generateCharts();
    });
  }

  generateCharts(): void {
    if (this.materiasPrimas.length === 0 || this.mermas.length === 0) return;

    if (['cliente', 'restaurante', 'hotel'].includes(this.rol)) {
      this.generateMostPurchasedChart();
    } else if (this.rol === 'empleado') {
      this.generateMostPurchasedChart();
      this.generateMostWastedChart();
    } else if (['Gerente', 'Administrador'].includes(this.rol)) {
      this.generateLossChart();
      this.generateExpenseChart();
      this.generateMostPurchasedChart();
      this.generateMostWastedChart();
    }
  }

  generateLossChart(): void {
    const losses = this.calculateLosses();
    this.createChart('lossChart', 'Pérdidas por Mermas', 'Pérdidas', losses.labels, losses.data);
  }

  generateExpenseChart(): void {
    const expenses = this.calculateExpenses();
    this.createChart('expenseChart', 'Gastos por Compra', 'Gasto', expenses.labels, expenses.data);
  }

  generateMostPurchasedChart(): void {
    const mostPurchased = this.calculateMostPurchased();
    this.createChart('mostPurchasedChart', 'Ingrediente Más Comprado', 'Cantidad Comprada', mostPurchased.labels, mostPurchased.data);
  }

  generateMostWastedChart(): void {
    const mostWasted = this.calculateMostWasted();
    this.createChart('mostWastedChart', 'Ingrediente con Más Merma', 'Cantidad de Merma', mostWasted.labels, mostWasted.data);
  }

  calculateLosses(): { labels: string[], data: number[] } {
    const lossMap: { [key: string]: number } = {};
    this.mermas.forEach(merma => {
      const materia = this.materiasPrimas.find(m => m.idMateriaPrima === merma.idMateriaPrima);
      if (materia) {
        const loss = merma.cantidadMerma * materia.precioCompra;
        lossMap[materia.nombreMateria] = (lossMap[materia.nombreMateria] || 0) + loss;
      }
    });
    return { labels: Object.keys(lossMap), data: Object.values(lossMap) };
  }

  calculateExpenses(): { labels: string[], data: number[] } {
    const expenseMap: { [key: string]: number } = {};
    this.materiasPrimas.forEach(materia => {
      const totalExpense = materia.cantidad * materia.precioCompra;
      expenseMap[materia.nombreMateria] = (expenseMap[materia.nombreMateria] || 0) + totalExpense;
    });
    return { labels: Object.keys(expenseMap), data: Object.values(expenseMap) };
  }

  calculateMostPurchased(): { labels: string[], data: number[] } {
    const purchaseMap: { [key: string]: number } = {};
    return { labels: Object.keys(purchaseMap), data: Object.values(purchaseMap) };
  }

  calculateMostWasted(): { labels: string[], data: number[] } {
    const wasteMap: { [key: string]: number } = {};
    this.mermas.forEach(merma => {
      const materia = this.materiasPrimas.find(m => m.idMateriaPrima === merma.idMateriaPrima);
      if (materia) {
        wasteMap[materia.nombreMateria] = (wasteMap[materia.nombreMateria] || 0) + merma.cantidadMerma;
      }
    });
    return { labels: Object.keys(wasteMap), data: Object.values(wasteMap) };
  }

  createChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    data: number[]
  ): void {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: data.map(value => value < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'),
            borderColor: data.map(value => value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'),
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
      if (chartId === 'lossChart') {
        if (this.lossChart) this.lossChart.destroy();
        this.lossChart = new Chart(chartElement, config);
      }
      if (chartId === 'expenseChart') {
        if (this.expenseChart) this.expenseChart.destroy();
        this.expenseChart = new Chart(chartElement, config);
      }
      if (chartId === 'mostPurchasedChart') {
        if (this.mostPurchasedChart) this.mostPurchasedChart.destroy();
        this.mostPurchasedChart = new Chart(chartElement, config);
      }
      if (chartId === 'mostWastedChart') {
        if (this.mostWastedChart) this.mostWastedChart.destroy();
        this.mostWastedChart = new Chart(chartElement, config);
      }
    }
  }
}
