import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Do import modules that should be instantiated once in the app
// Do place services in the module but do not provide them
// Do not declare components, pipes, directives
// Do not import this module into any module other than the AppModule

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule { }
