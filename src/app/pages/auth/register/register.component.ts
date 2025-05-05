import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      fullName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      PhoneNumber: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required],
    });
  }

  form: FormGroup;

  onSubmit() {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        role: "Client",
      };
      delete data.confirmPassword;
      console.log("Form data:", data);
      this.authService.register(data).subscribe(
        (res: { message: string }) => {
          console.log("Registration successful", res);
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error("Registration failed", error);
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert("Registration failed. Please try again later.");
          }
        }
      );
    }
  }
}
