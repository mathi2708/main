import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = ' http://127.0.0.1:8001/upload/';
  private analyzeUrl = 'http://localhost:8000/analyze-log/';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    alert(this.uploadUrl)
    return this.http.post(this.uploadUrl, formData);
  }

  getLogAnalysis(): Observable<any> {
    return this.http.get<any>(this.analyzeUrl);
  }
 
}
