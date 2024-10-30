import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { CompraService } from '../../../services/compra.service';
import { UsuariosService } from '../../../services/user.service';
import { VentumService } from '../../../services/ventum.service';
import { DetalleVentumService } from '../../../services/detalle-ventum.service';
import { ProductoService } from '../../../services/producto.service';
import { ProviderService } from '../../../services/provider.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  private materiasPrimas: any[] = [];
  private mermas: any[] = [];
  private ventas: any[] = [];
  private detalleVentas: any[] = [];
  private productos: any[] = [];
  private compras: any[] = [];
  private proveedores: any[] = [];
  private detalleMateriaPrima: any[] = [];
  private inventario: any[] = [];
  public rol: string = '';
  private charts: { [key: string]: Chart | undefined } = {};

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private mermaInventarioService: MermaInventarioService,
    private compraService: CompraService,
    private usuariosService: UsuariosService,
    private ventaService: VentumService,
    private detalleVenta: DetalleVentumService,
    private productoService: ProductoService,
    private proveedorService: ProviderService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService
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
    this.loadDetalleMateriasPrimas();
  }

  loadProveedores(): void {
    this.proveedorService.getProviders().subscribe((proveedores) => {
      this.proveedores = proveedores;
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
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.generateCharts();
    });
  }

  loadVentasDetalle(): void {
    this.detalleVenta.getDetallesVenta().subscribe((detallesVenta) => {
      this.detalleVentas = detallesVenta;
      this.generateCharts();
    });
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe((materias) => {
      this.materiasPrimas = materias;
      this.generateCharts();
    });
  }

  loadDetalleMateriasPrimas(): void {
    this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((detalles) => {
      this.detalleMateriaPrima = detalles;
      this.inventario = detalles; // Asumimos que 'inventario' refiere a detalles de materias primas
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
    if (
      this.materiasPrimas.length === 0 || 
      this.mermas.length === 0 || 
      this.ventas.length === 0 || 
      this.inventario.length === 0
    ) return;

    if (['Gerente', 'admin'].includes(this.rol)) {
      this.generateSalesByProductChart();
      this.generateMonthlySalesChart();
      this.generateInventoryStatusChart();
      this.generateSuppliersSalesChart();
      this.generateMostPurchasedIngredientsChart();
      this.generateMostWastedChart();
      this.generateDeliveryTimesChart();
    }
  }

  generateSalesByProductChart(): void {
    const { labels, data } = this.calculateSalesByProduct();
    this.createChart('salesByProductChart', 'Ventas por Producto', 'Ventas', labels, data);
  }

  generateMonthlySalesChart(): void {
    const { labels, data } = this.calculateMonthlySales();
    this.createChart('monthlySalesChart', 'Ventas Mensuales', 'Ventas', labels, data);
  }

  generateInventoryStatusChart(): void {
    const { labels, data } = this.calculateInventoryStatus();
    this.createChart('inventoryStatusChart', 'Estado del Inventario', 'Cantidad', labels, data);
  }

  generateSuppliersSalesChart(): void {
    const { labels, data } = this.calculateSuppliersSales();
    this.createChart('suppliersSalesChart', 'Proveedores y Calidad de Suministros', 'Calidad', labels, data);
  }

  generateDeliveryTimesChart(): void {
    const { labels, data } = this.calculateDeliveryTimes();
    this.createChart('deliveryTimesChart', 'Tiempos de Entrega', 'Días', labels, data);
  }

  generateMostPurchasedIngredientsChart(): void {
    const { labels, data } = this.calculateMostPurchasedIngredients();
    this.createChart('mostPurchasedChart', 'Ingredientes Más Comprados', 'Cantidad', labels, data);
  }

  generateMostWastedChart(): void {
    const { labels, data } = this.calculateMostWastedIngredients();
    this.createChart('mostWastedChart', 'Ingredientes con Más Merma', 'Cantidad', labels, data);
  }

  // Métodos de cálculo de datos
  calculateSalesByProduct(): { labels: string[], data: number[] } {
    const salesMap: { [key: string]: number } = {};

    this.ventas.forEach(venta => {
      const detalles = this.detalleVentas.filter(detalle => detalle.idVenta === venta.idVenta);
      detalles.forEach(detalle => {
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

  calculateMonthlySales(): { labels: string[], data: number[] } {
    // Lógica para calcular ventas mensuales
    return { labels: ['Enero', 'Febrero', 'Marzo'], data: [30, 50, 70] };
  }

  calculateInventoryStatus(): { labels: string[], data: number[] } {
    // Lógica para calcular el estado del inventario
    return { labels: ['Producto 1', 'Producto 2'], data: [100, 200] };
  }

  calculateSuppliersSales(): { labels: string[], data: number[] } {
    // Lógica para calcular ventas por proveedor
    return { labels: ['Proveedor 1', 'Proveedor 2'], data: [20, 50] };
  }

  calculateDeliveryTimes(): { labels: string[], data: number[] } {
    // Lógica para calcular tiempos de entrega
    return { labels: ['Proveedor 1', 'Proveedor 2'], data: [5, 3] };
  }

  calculateMostPurchasedIngredients(): { labels: string[], data: number[] } {
    // Lógica para calcular los ingredientes más comprados
    return { labels: ['Ingrediente 1', 'Ingrediente 2'], data: [300, 400] };
  }

  calculateMostWastedIngredients(): { labels: string[], data: number[] } {
    // Lógica para calcular ingredientes con más merma
    return { labels: ['Ingrediente 1', 'Ingrediente 2'], data: [50, 70] };
  }

  // Método genérico para crear gráficos
  createChart(elementId: string, title: string, label: string, labels: string[], data: number[]): void {
    if (this.charts[elementId]) {
      this.charts[elementId]?.destroy();
    }
    this.charts[elementId] = new Chart(elementId, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          title: { display: true, text: title }
        }
      }
    });
  }
}
