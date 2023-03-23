import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesPageModule)
      },
      {
        path: 'produccion',
        loadChildren: () => import('./produccion/produccion.module').then(m => m.ProduccionPageModule)
      },
      {
        path: 'standards',
        loadChildren: () => import('./standards/standards.module').then(m => m.StandardsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/clientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
