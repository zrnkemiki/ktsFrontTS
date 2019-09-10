import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehicleSEDComponent } from './vehicle-sed/vehicle-sed.component';
import { AddStopComponent } from './add-stop/add-stop.component';
import { StopSEDComponent } from './stop-sed/stop-sed.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'add-vehicle', component: AddVehicleComponent},
  { path: 'edit-vehicle/:id', component: AddVehicleComponent},
  { path: 'vehicleSED', component: VehicleSEDComponent},
  { path: 'add-stop', component: AddStopComponent},
  { path: 'edit-stop/:id', component: AddStopComponent},
  { path: 'stopSED', component: StopSEDComponent},
  { path: 'register-employee', component: RegisterEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
