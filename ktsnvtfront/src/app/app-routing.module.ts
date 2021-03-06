import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehicleSEDComponent } from './vehicle-sed/vehicle-sed.component';
import { AddStopComponent } from './add-stop/add-stop.component';
import { StopSEDComponent } from './stop-sed/stop-sed.component';
import { AddDepartureComponent } from './add-departure/add-departure.component';
import { DepartureSEDComponent } from './departure-sed/departure-sed.component';
import { AddLineComponent } from './add-line/add-line.component';
import { LineSEDComponent } from './line-sed/line-sed.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { AddPriceListComponent } from './add-price-list/add-price-list.component';
import { PriceListSEDComponent } from './price-list-sed/price-list-sed.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketSedComponent } from './ticket-sed/ticket-sed.component';
import { TicketControlComponent } from './ticket-control/ticket-control.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'timetable', component: TimetableComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'edit-vehicle/:id', component: AddVehicleComponent },
  { path: 'vehicleSED', component: VehicleSEDComponent },
  { path: 'add-stop', component: AddStopComponent },
  { path: 'edit-stop/:id', component: AddStopComponent },
  { path: 'stopSED', component: StopSEDComponent },
  { path: 'add-departure', component: AddDepartureComponent },
  { path: 'edit-departure/:id', component: AddDepartureComponent },
  { path: 'departureSED', component: DepartureSEDComponent },
  { path: 'add-line', component: AddLineComponent },
  { path: 'edit-line/:id', component: AddLineComponent },
  { path: 'lineSED', component: LineSEDComponent },
  { path: 'register-employee', component: RegisterEmployeeComponent },
  { path: 'add-priceList', component: AddPriceListComponent },
  { path: 'priceListSED', component: PriceListSEDComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'add-ticket', component: AddTicketComponent},
  { path: 'activate-ticket/:id', component: AddTicketComponent },
  { path: 'ticketSED', component: TicketSedComponent},
  { path: 'userTicketsSED', component: TicketSedComponent},
  { path: 'userTicketControl/:username', component: TicketSedComponent},
  { path: 'ticketControl', component: TicketControlComponent},
  { path: 'imgupload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
