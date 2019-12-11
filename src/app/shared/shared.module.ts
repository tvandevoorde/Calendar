import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as SharedComponents from './components';

// DO declare components, pips, directives and export them
// Do import FomsModule, ReactiveFormsModule and other third party modules
// Do import the SharedModule into the Feature Modules
// Do not provide app-wide singleton services in this module
// Do not import this module in the AppModule

@NgModule({
  declarations: [...SharedComponents.components],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    ...SharedComponents.components
  ]
})
export class SharedModule { }
