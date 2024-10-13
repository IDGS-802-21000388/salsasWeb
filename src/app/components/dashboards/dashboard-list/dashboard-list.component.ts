import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { CompraService } from '../../../services/compra.service';
import { UsuariosService } from '../../../services/user.service';
import { VentumService } from '../../../services/ventum.service';
import { DetalleVentumService } from '../../../services/detalle-ventum.service';
import { ProductoService } from '../../../services/producto.service';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  private materiasPrimas: any[] = [];
  private mermas: any[] = [];
  private ventas: any[] = [];
  private detalleVentas : any[] = [];
  private productos: any[] = [];
  private compras: any[] = [];
  private proveedores: any[] = [];
  private lossChart: Chart | undefined;
  private expenseChart: Chart | undefined;
  private mostPurchasedChart: Chart | undefined;
  private mostWastedChart: Chart | undefined;
  public rol: string = '';

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private mermaInventarioService: MermaInventarioService,
    private compraService: CompraService,
    private usuariosService: UsuariosService,
    private ventaService: VentumService,
    private detalleVenta: DetalleVentumService,
    private productoService: ProductoService,
    private proveedorService: ProviderService,
    
  ) {}

  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('loggedUser') || '{}').rol;
    this.loadMateriasPrimas();
    this.loadMermas();
    this.loadVentasDetalle();
    this.loadVentas();
    this.loadProductos();
    this.loadProveedores();
    this.loadCompras();
  }

  loadProveedores(): void {
    this.proveedorService.getProviders().subscribe((proveedor) => {
      this.proveedores = proveedor;
      this.generateCharts();
    });
  }

  loadCompras(): void {
    this.compraService.getCompras().subscribe((comprasD) => {
      this.compras = comprasD;
      this.generateCharts();
    });
  }

  loadVentas(): void {
    this.ventaService.getVentas().subscribe((ventas) => {
      this.ventas = ventas;
      this.generateCharts();
    });
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe((producto) => {
      this.productos = producto;
      this.generateCharts();
    });
  }

  loadVentasDetalle(): void {
    this.detalleVenta.getDetallesVenta().subscribe((detalleVenta) => {
      this.detalleVentas = detalleVenta;
      this.generateCharts();
    });
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe((materias) => {
      this.materiasPrimas = materias;
      this.generateCharts();
      this.generateInventoryStatus();
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
    } else if (['Gerente', 'admin'].includes(this.rol)) {
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
    const salesMap: { [key: string]: number } = {};

    this.ventas.forEach(venta => {
        // Filtra los detalles de venta que correspondan a esta venta específica
        const detalles = this.detalleVentas.filter(detalle => detalle.idVenta === venta.idVenta);

        detalles.forEach(detalle => {
            // Busca el producto correspondiente al detalle de venta
            const producto = this.productos.find(p => p.idProducto === detalle.idProducto);
            if (producto) {
                if (salesMap[producto.nombreProducto]) {
                    salesMap[producto.nombreProducto] += detalle.cantidad;
                } else {
                    salesMap[producto.nombreProducto] = detalle.cantidad;
                }
            }
        });
    });

    return { labels: Object.keys(salesMap), data: Object.values(salesMap) };
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

  calculateMostPurchased(): { labels: string[], data: number[] } {
    const suppliersMap: { [key: string]: number } = {};

  this.proveedores.forEach(proveedor => {
      const materiasDelProveedor = this.materiasPrimas.filter(mp => mp.idProveedor === proveedor.idProveedor);

      let totalProveedor = 0;
      materiasDelProveedor.forEach(materia => {
          const comprasRelacionadas = this.compras.filter(compra => compra.idMateriaPrima === materia.idMateriaPrima);

          comprasRelacionadas.forEach(compra => {
              totalProveedor += compra.cantidadComprada;
          });
      });

      if (suppliersMap[proveedor.nombreProveedor]) {
          suppliersMap[proveedor.nombreProveedor] += totalProveedor;
      } else {
          suppliersMap[proveedor.nombreProveedor] = totalProveedor;
      }
  });

  return {
      labels: Object.keys(suppliersMap),
      data: Object.values(suppliersMap)
  };
  }

  generateInventoryStatus(): void {
    const status = this.calculateInventoryStatus();
    this.createInventoryChart('inventoryStatusChart', 'Estado de Inventarios', 'Cantidad', status.labels, status.data, status.colors);
  }

  calculateInventoryStatus(): { labels: string[], data: number[], colors: string[] } {
    const inventoryMap: { [key: string]: { cantidad: number, color: string } } = {};
    this.materiasPrimas.forEach(materia => {
      const cantidad = materia.cantidad;
      const color = cantidad > 100 ? 'green' : cantidad > 50 ? 'yellow' : 'red';
      inventoryMap[materia.nombreMateria] = { cantidad, color };
    });
    return {
      labels: Object.keys(inventoryMap),
      data: Object.values(inventoryMap).map(item => item.cantidad),
      colors: Object.values(inventoryMap).map(item => item.color)
    };
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
      new Chart(chartElement, config);
    }
  }
}