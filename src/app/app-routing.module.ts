import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './guards/auth.service';
import { LoginService } from './guards/login.service';



const routes: Routes = [
  {path: '', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), canActivate: [LoginService]},
  {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate: [AuthService]},
  {path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
