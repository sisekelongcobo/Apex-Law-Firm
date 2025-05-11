import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Specialization } from "../../../interface";
import { HomePageService } from "../../../pages/home-page/service/home-page.service";

@Component({
  selector: "app-services-section",
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: "./services-section.component.html",
  styleUrl: "./services-section.component.css",
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  services: Specialization[] = [];
  selectedService: Specialization | null = null;
  selectedServiceId: number | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private homeService: HomePageService, private router: Router) {}

  ngOnInit() {
    this.getservices();
    this.subscription.add(
      this.homeService.getSpecializations$().subscribe((services) => {
        this.services = services;
      })
    );
  }

  onServiceSelect(service: Specialization) {
    this.selectedService = service;
    this.selectedServiceId = service.id;
    this.router.navigate(["/lawyer-list"], { queryParams: { specializationId: service.id } });
  }

  getservices() {
    this.homeService.getSpecializations().subscribe({
      next: () => console.log("Specializations fetched."),
      error: (err) => console.error("Fetch failed:", err),
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
