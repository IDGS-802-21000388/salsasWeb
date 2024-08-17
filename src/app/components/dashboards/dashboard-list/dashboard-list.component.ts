import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { CompraService } from '../../../services/compra.service';
import { UsuariosService } from '../../../services/user.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
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
  private detalleMateriaPrima : any[] = [];
  private inventario: any[] = [];
  private productos: any[] = [];
  private proveedores: any[] = [];
  private compras: any[] = [];
  public rol: string = '';

  private charts: { [key: string]: Chart | undefined } = {};

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private mermaInventarioService: MermaInventarioService,
    private compraService: CompraService,
    private usuariosService: UsuariosService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private ventaService: VentumService,
    private detalleVenta: DetalleVentumService,
    private productoService: ProductoService,
    private proveedorService: ProviderService
  ) {}

  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('loggedUser') || '{}').rol;
    this.loadMateriasPrimas();
    this.loadMermas();
    this.loadVentas();
    this.loadInventario();
    this.loadProductos();
    this.loadVentasDetalle();
    this.loadDetalleMateriasPrimas();
    this.loadProveedores();
    this.loadCompras();
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe((materias) => {
      this.materiasPrimas = materias;
      this.generateCharts();
    });
  }

  loadCompras(): void {
    this.compraService.getCompras().subscribe((comprasD) => {
      this.compras = comprasD;
      this.generateCharts();
    });
  }

  loadProveedores(): void {
    this.proveedorService.getProviders().subscribe((proveedor) => {
      this.proveedores = proveedor;
      this.generateCharts();
    });
  }

  loadDetalleMateriasPrimas(): void {
    this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((Dematerias) => {
      this.detalleMateriaPrima = Dematerias;
      this.generateCharts();
    });
  }

  loadMermas(): void {
    this.mermaInventarioService.getMermas().subscribe((mermas) => {
      this.mermas = mermas;
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

  loadInventario(): void {
    this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((inventario) => {
      this.inventario = inventario;
      this.generateCharts();
    });
  }

  generateCharts(): void {
    if (this.materiasPrimas.length === 0 || this.mermas.length === 0 || this.ventas.length === 0 || this.inventario.length === 0) return;

    if (['Gerente', 'admin'].includes(this.rol)) {
      this.generateSalesByProductChart();
      this.generateWasteByProductChart();
      this.generateInventoryStatusChart();
      this.generateSuppliersSalesChart();
      this.generateMostPurchasedIngredientsChart();
      this.generateDeliveryTimesChart();
    }
  }

  // Generar gráfica de Ventas por Producto
  generateSalesByProductChart(): void {
    const { labels, data } = this.calculateSalesByProduct();
    this.createChart('salesByProductChart', 'Ventas por Producto', 'Ventas', labels, data);
  }

  // Generar gráfica de Mermas por Producto
  generateWasteByProductChart(): void {
    const { labels, data } = this.calculateWasteByProduct();
    this.createChart('wasteByProductChart', 'Mermas por Producto', 'Cantidad de Merma', labels, data);
  }

  // Generar gráfica de Estado del Inventario
  generateInventoryStatusChart(): void {
    const { labels, data, colors } = this.calculateInventoryStatus();
    this.createInventoryChart('inventoryStatusChart', 'Estado del Inventario', 'Cantidad', labels, data, colors);
  }

  // Generar gráfica de Ventas por Proveedor
  generateSuppliersSalesChart(): void {
    const { labels, data } = this.calculateSuppliersSales();
    this.createChart('suppliersSalesChart', 'Ventas por Proveedor', 'Ventas', labels, data);
  }

  // Generar gráfica de Ingredientes Más Comprados
  generateMostPurchasedIngredientsChart(): void {
    const { labels, data } = this.calculateMostPurchasedIngredients();
    this.createChart('mostPurchasedIngredientsChart', 'Ingredientes Más Comprados', 'Cantidad Comprada', labels, data);
  }

  // Generar gráfica de Tiempos de Entrega
  generateDeliveryTimesChart(): void {
    const { labels, data } = this.calculateDeliveryTimes();
    this.createChart('deliveryTimesChart', 'Tiempos de Entrega', 'Cantidad de Entregas', labels, data);
  }

  calculateSalesByProduct(): { labels: string[], data: number[] } {
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

  // Lógica para calcular las mermas por producto
  calculateWasteByProduct(): { labels: string[], data: number[] } {
    const wasteMap: { [key: string]: number } = {};
    this.mermas.forEach(merma => {
      if (wasteMap[merma.nombreMateria]) {
        wasteMap[merma.nombreMateria] += merma.cantidadMerma;
      } else {
        wasteMap[merma.nombreMateria] = merma.cantidadMerma;
      }
    });
    return { labels: Object.keys(wasteMap), data: Object.values(wasteMap) };
  }

  // Lógica para calcular el estado del inventario
  calculateInventoryStatus(): { labels: string[], data: number[], colors: string[] } {
    const inventoryMap: { [key: string]: { cantidad: number, color: string } } = {};

    this.materiasPrimas.forEach(materia => {
        const detalles = this.detalleMateriaPrima.filter(detalle => detalle.idMateriaPrima === materia.idMateriaPrima);

        const cantidadTotal = detalles.reduce((total, detalle) => total + detalle.cantidadExistentes , 0);

        const color = cantidadTotal > 100 ? 'green' : cantidadTotal > 50 ? 'yellow' : 'red';

        inventoryMap[materia.nombreMateria] = { cantidad: cantidadTotal, color };
    });

    return {
        labels: Object.keys(inventoryMap),
        data: Object.values(inventoryMap).map(item => item.cantidad),
        colors: Object.values(inventoryMap).map(item => item.color) 
    };
}

calculateSuppliersSales(): { labels: string[], data: number[] } {
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


  // Lógica para calcular los ingredientes más comprados
  calculateMostPurchasedIngredients(): { labels: string[], data: number[] } {
    const ingredientsMap: { [key: string]: number } = {};
    this.inventario.forEach(item => {
      if (ingredientsMap[item.nombreMateria]) {
        ingredientsMap[item.nombreMateria] += item.cantidadComprada;
      } else {
        ingredientsMap[item.nombreMateria] = item.cantidadComprada;
      }
    });
    return { labels: Object.keys(ingredientsMap), data: Object.values(ingredientsMap) };
  }

  // Lógica para calcular los tiempos de entrega
  calculateDeliveryTimes(): { labels: string[], data: number[] } {
    const deliveryTimesMap: { [key: string]: number } = {};
    this.ventas.forEach(venta => {
      const monthYear = new Date(venta.fechaEntrega).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (deliveryTimesMap[monthYear]) {
        deliveryTimesMap[monthYear] += 1;
      } else {
        deliveryTimesMap[monthYear] = 1;
      }
    });
    return { labels: Object.keys(deliveryTimesMap), data: Object.values(deliveryTimesMap) };
  }

  // Función genérica para crear una gráfica
  createChart(elementId: string, title: string, label: string, labels: string[], data: number[]): void {
    if (this.charts[elementId]) this.charts[elementId]?.destroy();
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
  createInventoryChart(
    chartId: string,
    title: string,
    label: string,
    labels: string[],
    data: number[],
    colors: string[]
  ): void {
    const config: ChartConfiguration<'bar', number[], string> = {
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
        plugins: {
          title: { display: true, text: title },
        },
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
