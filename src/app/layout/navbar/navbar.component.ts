import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../pages/auth/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  isLoggedIn = false;
  userRole: string | null = null;
  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.authService.getRole().subscribe((role) => {
        this.userRole = role;
        this.isLoggedIn = !!role;
      })
    );
  }

  logOut() {
    this.authService.logout();
    this.userRole = null;
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {}
}
