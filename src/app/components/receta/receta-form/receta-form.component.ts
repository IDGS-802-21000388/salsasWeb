import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecetaService } from '../../../services/receta.service';
import { AlertService } from '../../../services/alert.service';
import { Medida, MateriaPrimaDetalle } from '../../../interfaces/receta';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.css']
})
export class RecetaFormComponent implements OnInit {

  recetaForm: FormGroup;
  medidas: Medida[] = [];
  MateriaPrimaDetalle: MateriaPrimaDetalle[] = [];
  ingredientes: any[] = [];
  isEditMode = false;
  isSeeMode = false;
  idProducto: number | null = null;
  recetaId: number | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  dataSource = new MatTableDataSource<Medida>();
  
  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private dialogRef: MatDialogRef<RecetaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ){
    this.recetaForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      precioVenta: ['', Validators.required],
      precioProduccion: ['', Validators.required],
      cantidad: ['', Validators.required],
      medida: ['', Validators.required],
      fotografia: [''],
      idMateriaPrima: [''],
      cantidadMateriaPrima: [''],
      medidaIngrediente: ['']
    });

    if (data && data.receta) {
      this.isEditMode = true;
      this.idProducto = data.receta.idProveedor;
      this.recetaForm.patchValue(data.receta);
    }
  }

  ngOnInit(): void {
    this.loadMedidas();
    this.loadMateriaPrimaDetalle();
  
    // Verificar si el modal se abrió en modo de ver y si hay datos disponibles
    if (this.data && this.data.isSeeMode) {
      console.log('Entro a vista');
      
      this.isSeeMode = true;
      this.recetaForm.disable();
      this.loadIngredientes();
    }
    if (this.data && this.data.isEditMode) {
      // Configurar los valores iniciales para el formulario con los datos del producto
      this.recetaForm.patchValue({
        nombreProducto: this.data.producto.nombreProducto,
        precioVenta: this.data.producto.precioVenta,
        precioProduccion: this.data.producto.precioProduccion,
        cantidad: this.data.producto.cantidad, // Asegúrate de que 'cantidad' es el campo correcto
        medida: this.data.producto.idMedida, // Asumiendo que hay un campo 'medida'
        fotografia: this.data.producto.fotografia, // Y cualquier otro campo relevante
      });
  
      // Cargar ingredientes desde localStorage si existen
      this.recetaForm.enable();
      this.isEditMode = true;
      this.loadIngredientes();
    } else {
      // Si no es modo de edición, asegúrate de que se cargue con datos limpios
      this.ingredientes = [];
    }
  }

  loadMedidas(): void {
    this.recetaService.getMedida().subscribe((data: Medida[]) => {
      this.medidas = data;
    });
  }

  loadMateriaPrimaDetalle(): void {
    this.recetaService.getMaPrDetalle().subscribe((data: MateriaPrimaDetalle[]) => {
      this.MateriaPrimaDetalle = data;
    });
  }

  loadIngredientes(): void {
    const ingredientes = localStorage.getItem('ingredientes');
    if (ingredientes) {
      this.ingredientes = JSON.parse(ingredientes);
    }
  }
  
  agregarIngrediente(): void {
    const idMateriaPrima = this.recetaForm.get('idMateriaPrima')?.value;
    const cantidad = this.recetaForm.get('cantidadMateriaPrima')?.value;
    const idMedida = this.recetaForm.get('medidaIngrediente')?.value;

    // Convertir valores a cadenas y aplicar trim
    const idMateriaPrimaStr = idMateriaPrima ? String(idMateriaPrima).trim() : '';
    const cantidadStr = cantidad ? String(cantidad).trim() : '';
    const idMedidaStr = idMedida ? String(idMedida).trim() : '';

    // Validaciones para evitar valores nulos, vacíos o solo espacios
    if (!idMateriaPrimaStr || !cantidadStr || !idMedidaStr) {
        this.alertService.error('Todos los campos son obligatorios y no pueden estar vacíos.');
        return;
    }

    // Obtener el texto del option seleccionado
    const materiaPrimaElement = document.getElementById('idMateriaPrima') as HTMLSelectElement;
    const selectedMateriaPrimaText = materiaPrimaElement.options[materiaPrimaElement.selectedIndex].text.trim();

    const medidaElement = document.getElementById('medidaIngrediente') as HTMLSelectElement;
    const selectedMedidaText = medidaElement.options[medidaElement.selectedIndex].text.trim();

    // Validación adicional por si el texto seleccionado es vacío o solo espacios
    if (!selectedMateriaPrimaText || !selectedMedidaText) {
        this.alertService.error('Selecciona una materia prima y una medida válidas.');
        return;
    }

    const ingrediente = {
        cantidad: cantidadStr,
        idMedida: idMedidaStr,
        idMateriaPrima: idMateriaPrimaStr,
        tipoMedida: selectedMedidaText,
        nombreMateria: selectedMateriaPrimaText
    };

    this.ingredientes.push(ingrediente);
    this.updateLocalStorage();
  }


  
  updateLocalStorage(): void {
    localStorage.setItem('ingredientes', JSON.stringify(this.ingredientes));
    this.loadIngredientes();
  }
  
  eliminarIngrediente(index: number, event: Event): void {
    event.preventDefault(); 
    this.ingredientes.splice(index, 1);
    this.updateLocalStorage();
}

  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${file.name}`;
      this.recetaForm.patchValue({ fotografia: filePath });
      this.imageUrl = filePath;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      if (this.recetaForm.valid && this.ingredientes.length > 0) {

        const ingredientesLocalStorage = JSON.parse(localStorage.getItem('ingredientes') || '[]');
    
        const ingredientesTransformados = ingredientesLocalStorage.map((ingrediente: any) => ({
          cantidadMateriaPrima: ingrediente.cantidad,
          medidaIngrediente: ingrediente.idMedida,
          idMateriaPrima: ingrediente.idMateriaPrima
        }));

        const idProducto = ingredientesLocalStorage[0].idProducto;

        const producto = {
          nombreProducto: this.recetaForm.get('nombreProducto')?.value,
          precioVenta: this.recetaForm.get('precioVenta')?.value,
          precioProduccion: this.recetaForm.get('precioProduccion')?.value,
          cantidad: this.recetaForm.get('cantidad')?.value,
          medida: this.recetaForm.get('medida')?.value,
          fotografia: this.recetaForm.get('fotografia')?.value
        };
        // Crear el objeto completo a enviar
        const dataToSend = {
          idProducto: idProducto,
          producto: producto,
          ingredientes: ingredientesTransformados
        };
  
        this.recetaService.updateProductoAndReceta(dataToSend).subscribe(
          response => {
            localStorage.removeItem('ingredientes');
            this.dialogRef.close({ producto, ingredientes: ingredientesTransformados });
          },
          error => {
            console.error('Error from API:', error);
          }
        );
      } else {
        this.alertService.error('Formulario inválido o faltan ingredientes.');
      }
    }else{
      if (this.recetaForm.valid && this.ingredientes.length > 0) {

        const ingredientesLocalStorage = JSON.parse(localStorage.getItem('ingredientes') || '[]');
    
        const ingredientesTransformados = ingredientesLocalStorage.map((ingrediente: any) => ({
          cantidadMateriaPrima: ingrediente.cantidad,
          medidaIngrediente: ingrediente.idMedida,
          idMateriaPrima: ingrediente.idMateriaPrima
        }));
    
        const producto = {
          nombreProducto: this.recetaForm.get('nombreProducto')?.value,
          precioVenta: this.recetaForm.get('precioVenta')?.value,
          precioProduccion: this.recetaForm.get('precioProduccion')?.value,
          cantidad: this.recetaForm.get('cantidad')?.value,
          medida: this.recetaForm.get('medida')?.value,
          fotografia: this.recetaForm.get('fotografia')?.value
        };
        const dataToSend = { producto, ingredientes: ingredientesTransformados };

        this.recetaService.insertProductoConIngredientes(dataToSend).subscribe(
          response => {
            localStorage.removeItem('ingredientes');
            this.dialogRef.close({ producto, ingredientes: ingredientesTransformados });
          },
          error => {
            console.error('Error from API:', error);
          }
        );
      } else {
        this.alertService.error('Formulario inválido o faltan ingredientes.');
      }
    }
  }
  
  onCancel(event?: Event): void {
    if (event) {
        event.preventDefault();
    }
    this.dialogRef.close(false);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }



}
