import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";
import { Specialization } from "../../../interface";
import { HomePageService } from "../../../pages/home-page/home-page.service";

@Component({
  selector: "app-services-section",
  imports: [MatIconModule, CommonModule],
  templateUrl: "./services-section.component.html",
  styleUrl: "./services-section.component.css",
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  services: Specialization[] = [];
  selectedService: Specialization | null = null;
  selectedServiceId: number | null = null;
  private sub: Subscription = new Subscription();

  constructor(private http: HttpClient, private homeService: HomePageService) {}

  ngOnInit() {
    this.getservices();
    this.sub.add(
      this.homeService.getSpecializations$().subscribe((services) => {
        this.services = services;
        console.log("Services:", this.services);
      })
    );
  }

  navigateTo(service: string) {
    // Navigate to filtered lawyer list
  }

  onServiceSelect(service: Specialization) {
    this.selectedService = service;
    this.selectedServiceId = service.id;
    console.log("Selected service:", service);
  }

  getservices() {
    this.homeService.getSpecializations().subscribe({
      next: () => console.log("Specializations fetched."),
      error: (err) => console.error("Fetch failed:", err),
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
