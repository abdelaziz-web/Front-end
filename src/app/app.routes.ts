import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { TransaComponent } from './transa/transa.component';
import { Can0400Component } from './can0400/can0400.component';

export const routes: Routes = [
  { path: 'cancellation', component: Can0400Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }