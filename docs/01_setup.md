# Setting up initial environment for Angular App

## Requirements
- [Node.js](https://nodejs.org/) (v13.12.0)
- [Angular](https://angular.io/start) (v9.1.1)

## Update npm
```sh
npm install -g npm 
```

## Install and Run default setup:
```sh
npm uninstall -g @angular/cli
npm cache clean
```
- if npm version is > 5 then use `npm cache verify` to avoid errors (or to avoid using --force)
```sh
npm install -g @angular/cli@latest
```

## To create deployable build for production
```sh
ng build -prod
```


## Adding Stylesheets
Download and add bootstrap.min.css to assets/css
then add it to : angular.json

```json
	"styles": [
        "src/assets/css/bootstrap.min.css"
    ],
```


## Update index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>DigiMarketing</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="assets/img/favicon.png">
</head>
<body>
  <app-root>
    <style>
  img {
     height: 100px;
     left: 50%;
     margin-top: -50px;
     margin-left: -50px;
     position: absolute;
     top: 50%;
     width: 100px;
  }
    </style>
    <img src="assets/img/loading.gif" >
  </app-root>
</body>
</html>
```


# Routing

## Create routing
```sh
cd /src
ng generate module app-routing --flat --module=app
```


## base href
File index.html
```html
<head>
	<base href="/">
```

## Router outlet
```javascript
//# src/app/app.component.ts 

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
```





## Layouts
Create necessary layouts
```sh
ng g component layouts/simple-layout
ng g component layouts/full-layout
```

update layout html files to load router-outlet 
so the file looks like:
```html
<!-- src/app/layouts/simple-layout/simple-layout.component.html -->
<p>simple-layout works!</p>
<router-outlet></router-outlet>
```

```html
<!-- src/app/layouts/full-layout/full-layout.component.html -->
<p>full-layout works!</p>
<router-outlet></router-outlet>
```




## Adding basic views
´´´sh
ng generate module views/private/dashboard --routing
ng g component views/private/dashboard --module dashboard

ng generate module views/private/profile --routing
ng g component views/private/profile --module profile

ng generate module views/public/auth --routing
ng g component views/public/auth/login --flat --module auth
ng g component views/public/auth/logout --flat --module auth
ng g component views/public/auth/register --flat --module auth
´´´




## Auth Module Routing

´´´javascript
// views/public/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';
const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
```


## Dashboard Module Routing

´´´javascript
// views/private/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
```


## Profile Module Routing

´´´javascript
// views/private/profile/profile-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
```



## App Module Routing

´´´javascript
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

```