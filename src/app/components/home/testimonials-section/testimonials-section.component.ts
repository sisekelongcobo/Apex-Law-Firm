import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-testimonials-section",
  imports: [CommonModule],
  templateUrl: "./testimonials-section.component.html",
  styleUrl: "./testimonials-section.component.css",
})
export class TestimonialsSectionComponent {
  testimonials = [
    { message: "Apex Law Firm helped me win my case!", name: "John Doe" },
    {
      message: "Professional and reliable legal services.",
      name: "Jane Smith",
    },
    {
      message: "Highly recommend their team of experts.",
      name: "Michael Brown",
    },
  ];
}
