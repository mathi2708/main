import { Component, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() logUploaded = new EventEmitter<void>();
  selectedFiles: File[] = [];
  uploadedFiles: string[] = [];
  logAnalysis: any[] = [];

  fullText: string = '';       // Full text to display (one message for simplicity)
  displayedText: string = '';  // Text displayed so far
  typing: boolean = false;     // Controls cursor visibility
  typingSpeed: number = 40;    // ms per character
  isLoading = false; 
  constructor(private uploadService: UploadService) {}

  ngOnInit() {
    this.startTyping("Summary", 'bold')
      .then(() => new Promise(resolve => setTimeout(resolve, 500)))
      .then(() => this.startTyping(" Hello! This is a ChatGPT-style typing effect in Angular."));
  }
  
  startTyping(text: string, format: 'bold' | null = null): Promise<void> {
    return new Promise((resolve) => {
      let charIndex = 0;
      let currentText = '';
  
      const interval = setInterval(() => {
        currentText += text.charAt(charIndex);
        charIndex++;
  
        // Apply formatting if needed
        if (format === 'bold') {
          this.displayedText = `<strong>${currentText}</strong>`;
        } else {
          this.displayedText += text.charAt(charIndex - 1);
        }
  
        if (charIndex === text.length) {
          clearInterval(interval);
          this.typing = false;
  
          // If bold, append a line break to continue normally
          if (format === 'bold') {
            this.displayedText += '<br>'; // or '\n'
          }
  
          resolve();
        }
      }, this.typingSpeed);
    });
  }
  
  
  

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedFiles = Array.from(target.files);
    }
  }

  uploadFiles() {
    if (this.selectedFiles.length) {
      this.uploadService.uploadFiles(this.selectedFiles).subscribe({
        next: (res) => {
          this.uploadedFiles = res.filenames;
          this.logUploaded.emit();
          alert('File uploaded successfully!');
        },
        error: (err) => {
          alert('Upload failed.');
          console.error(err);
        }
      });
    }
  }

  
}
