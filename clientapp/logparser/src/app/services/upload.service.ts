import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = 'https://8001-user-2.cluster-ef7hhz6pifddiqhqwdxcaxcaao.cloudworkstations.dev/docs#/default/upload_log_upload__post';
  private analyzeUrl = 'http://localhost:8000/analyze-log/';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return this.http.post(this.uploadUrl, formData);
  }

  getLogAnalysis(): Observable<any> {
    return this.http.get<any>(this.analyzeUrl);
  }
 
}
