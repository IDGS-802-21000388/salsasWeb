import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../services/provider.service';
import { Proveedor } from '../../../interfaces/proveedor';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  providerForm: FormGroup;
  isEditMode = false;
  providerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.providerForm = this.fb.group({
      idProveedor: [null],
      nombreProveedor: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreAtiende: ['', Validators.required],
      estatus: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.providerId = +id;
        this.providerService.getProvider(this.providerId).subscribe(provider => {
          this.providerForm.patchValue(provider);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.providerForm.valid) {
      const provider: Proveedor = this.providerForm.value;
      if (this.isEditMode && this.providerId !== null) {
        this.providerService.updateProvider(this.providerId, provider).subscribe(() => {
          this.router.navigate(['/proveedores/list']);
        }, error => {
          console.error('Update error:', error);
        });
      } else {
        this.providerService.createProvider(provider).subscribe(() => {
          this.router.navigate(['/proveedores/list']);
        }, error => {
          console.error('Create error:', error);
        });
      }
    }
  }
  
}
