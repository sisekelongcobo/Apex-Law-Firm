import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-verify-otp",
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./verify-otp.component.html",
  styleUrl: "./verify-otp.component.css",
})
export class VerifyOtpComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      otp: ["", [Validators.required, Validators.minLength(6)]],
    });
    // Get email from query params
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"] || "";
    });
  }
  email = "";
  form: FormGroup;

  onSubmit() {
    if (this.form.valid) {
      const otp = this.form.value.otp!;
      // TODO: Call API to verify OTP
      console.log("Verifying OTP:", otp);
      this.router.navigate(["/reset-password"], {
        queryParams: { email: this.email },
      });
    }
  }
}
