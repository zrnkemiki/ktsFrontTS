import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GenericService } from './service/generic.service';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleSEDComponent } from './vehicle-sed/vehicle-sed.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { StopSEDComponent } from './stop-sed/stop-sed.component';
import { AddStopComponent } from './add-stop/add-stop.component';
import { AddDepartureComponent } from './add-departure/add-departure.component';
import { DepartureSEDComponent } from './departure-sed/departure-sed.component';
import { AddPriceListComponent } from './add-price-list/add-price-list.component';
import { PriceListSEDComponent } from './price-list-sed/price-list-sed.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddLineComponent } from './add-line/add-line.component';
import { LineSEDComponent } from './line-sed/line-sed.component';
import { TicketSedComponent} from './ticket-sed/ticket-sed.component'
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    AddVehicleComponent,
    VehicleSEDComponent,
    RegisterEmployeeComponent,
    StopSEDComponent,
    AddStopComponent,
    AddDepartureComponent,
    DepartureSEDComponent,
    AddPriceListComponent,
    PriceListSEDComponent,
    AddTicketComponent,
    AddLineComponent,
    LineSEDComponent,
    UserListComponent,
    UserProfileComponent,
    LineSEDComponent,
    TicketSedComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({preventDuplicates: true})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    GenericService,
    { provide: 'BASE_API_URL', useValue: 'http://localhost:8080/api' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }