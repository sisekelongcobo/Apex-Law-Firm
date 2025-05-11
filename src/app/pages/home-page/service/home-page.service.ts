import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Specialization } from "../../../interface";

@Injectable({
  providedIn: "root",
})
export class HomePageService {
  private API_URL = `${import.meta.env.NG_APP_API_URL}`;
  private SPECIALIZATION_URL = `${this.API_URL}/specializations`;
  private specializations$ = new BehaviorSubject<Specialization[]>([]);

  constructor(private http: HttpClient) {}

  getSpecializations(): Observable<any> {
    return this.http.get<{ message: string; data: Specialization[] }>(this.SPECIALIZATION_URL).pipe(
      tap((res: any) => {
        if (res.message !== "Specializations retrieved successfully.") {
          throw new Error("Failed to fetch specializations");
        }
        this.setSpecializations(res.data);
      })
    );
  }

  setSpecializations(specializations: Specialization[]) {
    this.specializations$.next(specializations);
  }

  getSpecializations$(): Observable<Specialization[]> {
    return this.specializations$.asObservable();
  }
}
