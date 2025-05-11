import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
    });
    // Get email from query params
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"] || "";
    });
  }

  email: string = "";
  form: FormGroup;

  onSubmit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      const password = this.form.value.password!;
      // TODO: Call API to update password
      console.log("Password reset for:", this.email);
      this.router.navigate(["/login"]);
    } else {
      alert("Passwords do not match.");
    }
  }
}
