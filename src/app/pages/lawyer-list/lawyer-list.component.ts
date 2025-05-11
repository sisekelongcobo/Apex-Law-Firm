import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { LawyerProfile, Specialization } from "../../interface";
import { HomePageService } from "../home-page/service/home-page.service";
import { LawyerListService } from "./service/lawyer-list.service";

@Component({
  selector: "app-lawyer-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: "./lawyer-list.component.html",
  styleUrls: ["./lawyer-list.component.css"],
})
export class LawyerListComponent implements OnInit, OnDestroy {
  specializations: Specialization[] = [];
  allLawyers: LawyerProfile[] = [];
  selectedSpecializations: string[] = [];
  sortBy = "rating";
  showAllLawyers = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private homeService: HomePageService,
    private lawyerService: LawyerListService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSpecializations();
    this.getLawyerProfiles();
    this.activatedRoute.queryParams.subscribe((params) => {
      const specializationId = params["specializationId"];
      if (specializationId) {
        this.showAllLawyers = false;
        this.getLawyerProfilesBySpecialization(Number(specializationId));
      } else {
        this.showAllLawyers = true;
        this.getLawyerProfiles();
      }
    });
    // const urlParams = new URLSearchParams(window.location.search);
    // const specializationId = urlParams.get("specializationId");
    // if (specializationId) {
    //   this.showAllLawyers = false;
    //   this.getLawyerProfilesBySpecialization(Number(specializationId));
    // }
  }

  get filteredLawyers(): LawyerProfile[] {
    let filtered = [...this.allLawyers];

    if (this.selectedSpecializations.length) {
      filtered = filtered.filter((lawyer) =>
        lawyer.specializations.some((spec) => this.selectedSpecializations.includes(spec))
      );
    }

    switch (this.sortBy) {
      case "experience":
        return filtered.sort((a, b) => b.yearOfExperience - a.yearOfExperience);
      case "rating":
        return filtered.sort((a, b) => b.averageRating - a.averageRating);
      case "alphabetical":
        return filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
      default:
        return filtered;
    }
  }

  getSpecializations() {
    this.homeService.getSpecializations().subscribe({
      next: () => {
        this.subscription.add(
          this.homeService.getSpecializations$().subscribe((specializations) => {
            this.specializations = specializations;
          })
        );
      },
      error: (err) => console.error("Fetch failed:", err),
    });
  }

  getLawyerProfilesBySpecialization(specializationId: number) {
    this.lawyerService.getLawyerProfilesBySpecialization(specializationId).subscribe({
      next: () => {
        this.subscription.add(
          this.lawyerService.getLawyerProfiles$().subscribe((lawyers) => {
            console.log("Lawyers fetched:", lawyers);
            this.allLawyers = lawyers;
          })
        );
      },
      error: (err) => console.error("Fetch failed:", err),
    });
  }

  getLawyerProfiles() {
    this.lawyerService.getLawyerProfiles().subscribe({
      next: () => {
        this.subscription.add(
          this.lawyerService.getLawyerProfiles$().subscribe((lawyers) => {
            this.allLawyers = lawyers;
          })
        );
      },
      error: (err) => console.error("Fetch failed:", err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
