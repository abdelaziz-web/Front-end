import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { TransaComponent } from './transa/transa.component';

export const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  { path: 'acquirer', component: AcquirerComponent },
  { path: 'transa', component: TransaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }