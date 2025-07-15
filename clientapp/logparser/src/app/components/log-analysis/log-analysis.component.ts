import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-log-analysis',
  templateUrl: './log-analysis.component.html',
  styleUrls: ['./log-analysis.component.css']
})
export class LogAnalysisComponent implements OnInit  {

  logAnalysis: any[] = [];
  loading: boolean = false;
  error: string = '';
  uploadedFiles: any;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.fetchLogAnalysis();
  }

  fetchLogAnalysis() {

    this.uploadService.getLogAnalysis().subscribe({
      next: (res) => {
        console.log("res");
        console.log(res);
        this.logAnalysis = res.log_analysis;
        
      },
      error: (err) => {
        alert('Upload failed.');
        console.error(err);
      }
    });
    
  }

}
