import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAccessModule } from '@myorg/data-access';

@NgModule({
  imports: [CommonModule, DataAccessModule],
})
export class FeatureModule {}
