import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    AddVehicleComponent,
    VehicleSEDComponent,
    RegisterEmployeeComponent
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
    GenericService,
    { provide: 'BASE_API_URL', useValue: 'http://localhost:8080/api' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
