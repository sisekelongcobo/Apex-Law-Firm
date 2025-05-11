import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LawyerProfile } from "../../../interface";

@Injectable({
  providedIn: "root",
})
export class LawyerListService {
  private API_URL = `${import.meta.env.NG_APP_API_URL}`;
  private LAWYER_URL = `${this.API_URL}/lawyers`;
  private lawyerProfiles = new BehaviorSubject<LawyerProfile[]>([]);
  private lawyerProfile$ = new BehaviorSubject<LawyerProfile>({} as LawyerProfile);

  constructor(private http: HttpClient) {}

  getLawyerProfiles(): Observable<any> {
    return this.http.get<{ message: string; data: LawyerProfile[] }>(this.LAWYER_URL).pipe(
      tap((res: any) => {
        if (res.message !== "Lawyers retrieved successfully.") {
          throw new Error("Failed to fetch lawyers");
        }
        this.setLawyerProfiles(res.data);
      })
    );
  }

  getLawyerProfile(id: number): Observable<any> {
    return this.http.get<{ message: string; data: LawyerProfile }>(`${this.LAWYER_URL}/${id}`).pipe(
      tap((res: any) => {
        if (res.message !== "Lawyer retrieved successfully.") {
          throw new Error("Failed to fetch lawyer");
        }
        this.setLawyerProfile(res.data);
      })
    );
  }

  setLawyerProfiles(lawyerProfiles: LawyerProfile[]) {
    this.lawyerProfiles.next(lawyerProfiles);
  }

  getLawyerProfiles$(): Observable<LawyerProfile[]> {
    return this.lawyerProfiles.asObservable();
  }

  setLawyerProfile(lawyerProfile: LawyerProfile) {
    this.lawyerProfile$.next(lawyerProfile);
  }

  getLawyerProfile$(): Observable<LawyerProfile> {
    return this.lawyerProfile$.asObservable();
  }
}
