import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginPayload, RegisterPayload } from "../../interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private API_URL = `${import.meta.env.NG_APP_API_URL}/auth`;
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private role$ = new BehaviorSubject<string | null>(localStorage.getItem("role"));

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    if (token) {
      this.loggedIn$.next(true);
      this.role$.next(localStorage.getItem("role"));
    }
  }

  login(data: LoginPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        this.loggedIn$.next(true);
        this.setRole(res.role);
      })
    );
  }

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.API_URL}/verify-otp`, { email, otp });
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.loggedIn$.next(false);
    this.role$.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  setRole(role: string) {
    this.role$.next(role);
    localStorage.setItem("role", role);
  }

  getRole(): Observable<string | null> {
    return this.role$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
