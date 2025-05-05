import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { LawyerProfile } from "../../../interface";

@Component({
  selector: "app-featured-lawyers",
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./featured-lawyers.component.html",
  styleUrl: "./featured-lawyers.component.css",
})
export class FeaturedLawyersComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private LAWYER_URL = `${import.meta.env.NG_APP_API_URL}/lawyers`;

  lawyers: LawyerProfile[] = [];

  ngOnInit() {
    this.getLawyers();
  }

  viewProfile(lawyer: LawyerProfile) {
    // Navigate to filtered lawyer list
    console.log("Selected lawyer:", lawyer.user.fullName);
  }

  getLawyers() {
    this.http.get<{ message: string; data: LawyerProfile[] }>(this.LAWYER_URL).subscribe({
      next: (res) => {
        this.lawyers = res.data;
      },
      error: (error) => {
        console.error("Error fetching lawyers:", error);
      },
    });
  }
}
