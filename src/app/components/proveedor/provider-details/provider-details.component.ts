import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proveedor } from '../../../interfaces/proveedor';
import { ProviderService } from '../../../services/provider.service';
@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {
  provider: Proveedor | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.providerService.getProvider(+id).subscribe(provider => {
        this.provider = provider;
      });
    }
  }
}
