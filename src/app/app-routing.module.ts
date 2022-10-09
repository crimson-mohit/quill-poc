import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { EditorComponent } from '@/components/editor/editor.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
