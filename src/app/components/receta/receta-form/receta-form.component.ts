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
      idMateriaPrima: ['', Validators.required],
      cantidadMateriaPrima: ['', Validators.required],
      medidaIngrediente: ['', Validators.required]
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
    this.loadIngredientes();
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
  
    // Obtener el texto del option seleccionado
    const materiaPrimaElement = document.getElementById('idMateriaPrima') as HTMLSelectElement;
    const selectedMateriaPrimaText = materiaPrimaElement.options[materiaPrimaElement.selectedIndex].text;
  
    const medidaElement = document.getElementById('medidaIngrediente') as HTMLSelectElement;
    const selectedMedidaText = medidaElement.options[medidaElement.selectedIndex].text;
  
    const ingrediente = {
      cantidad: cantidad,
      idMedida: idMedida,
      idMateriaPrima: idMateriaPrima,
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
  
  eliminarIngrediente(index: number): void {
    this.ingredientes.splice(index, 1);
    this.updateLocalStorage();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `assets/images/${file.name}`;
      this.recetaForm.patchValue({ fotografia: filePath });
      this.imageUrl = filePath;
    }
  }

  onSubmit(): void {
    if (this.recetaForm.valid) {
      // Retrieve ingredients from local storage
      const ingredientesLocalStorage = JSON.parse(localStorage.getItem('ingredientes') || '[]');
  
      // Transform the ingredients to the desired format
      const ingredientesTransformados = ingredientesLocalStorage.map((ingrediente: any) => ({
        cantidadMateriaPrima: ingrediente.cantidad,
        medidaIngrediente: ingrediente.idMedida,
        idMateriaPrima: ingrediente.idMateriaPrima
      }));
  
      // Create the product object
      const producto = {
        nombreProducto: this.recetaForm.get('nombreProducto')?.value,
        precioVenta: this.recetaForm.get('precioVenta')?.value,
        precioProduccion: this.recetaForm.get('precioProduccion')?.value,
        cantidad: this.recetaForm.get('cantidad')?.value,
        medida: this.recetaForm.get('medida')?.value,
        fotografia: this.recetaForm.get('fotografia')?.value
      };
  
      // Log the data as it will be sent to the API
      const dataToSend = { producto, ingredientes: ingredientesTransformados };
      console.log('Data to be sent to API:', JSON.stringify(dataToSend, null, 2));
  
      // Send the product and ingredients to the API
      this.recetaService.insertProductoConIngredientes(dataToSend).subscribe(
        response => {
          console.log('Response from API:', response);
          // Clear only the specific ingredients data from local storage
          localStorage.removeItem('ingredientes');
          this.dialogRef.close({ producto, ingredientes: ingredientesTransformados });
        },
        error => {
          console.error('Error from API:', error);
        }
      );
    } else {
      console.log('Formulario no es válido');
    }
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
