import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";
import { VerifyOtpComponent } from "./pages/auth/verify-otp/verify-otp.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LawyerDetailComponent } from "./pages/lawyer-detail/lawyer-detail.component";
import { LawyerListComponent } from "./pages/lawyer-list/lawyer-list.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    pathMatch: "full",
  },
  { path: "verify-email", component: VerifyOtpComponent, pathMatch: "full" },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    pathMatch: "full",
  },
  { path: "lawyer-list", component: LawyerListComponent, pathMatch: "full" },
  { path: "lawyer-details", component: LawyerDetailComponent, pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
