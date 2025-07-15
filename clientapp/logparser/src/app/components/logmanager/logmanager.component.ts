import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-logmanager',
  templateUrl: './logmanager.component.html',
  styleUrls: ['./logmanager.component.css']
})
export class LogmanagerComponent {
  logUploaded = false;
  showAnalyse = false;

  onLogUploaded() {
    alert("as");
    this.logUploaded = true;
  }

  onAnalyseClick() {
    this.showAnalyse = true;
  }
}
