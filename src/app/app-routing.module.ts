import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },

	{
      	path: '',
      	component: FullLayoutComponent,
      	children: [{
        	path: 'dashboard',
          	loadChildren: () => import('./views/private/dashboard/dashboard.module').then(m => m.DashboardModule)
     	}]
    },
	
	{
        path: '',
        component: FullLayoutComponent,
        children: [{
        	path: 'profile',
            loadChildren: () => import('./views/private/profile/profile.module').then(m => m.ProfileModule)
        }]
    },    
    {
      path: '',
      component: SimpleLayoutComponent,
      children: [{
       	 path: 'auth',
          loadChildren: () => import('./views/public/auth/auth.module').then(m => m.AuthModule)
      }]
  	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }