import { Component } from "@angular/core";
import { AboutUsSectionComponent } from "../../components/home/about-us-section/about-us-section.component";
import { FeaturedLawyersComponent } from "../../components/home/featured-lawyers/featured-lawyers.component";
import { HeroSectionComponent } from "../../components/home/hero-section/hero-section.component";
import { HowItWorksComponent } from "../../components/home/how-it-works/how-it-works.component";
import { ServicesSectionComponent } from "../../components/home/services-section/services-section.component";
import { TestimonialsSectionComponent } from "../../components/home/testimonials-section/testimonials-section.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutUsSectionComponent,
    ServicesSectionComponent,
    FeaturedLawyersComponent,
    HowItWorksComponent,
    TestimonialsSectionComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent {}
