import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailParameters } from 'src/app/models/parameters/EmailParameters';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TextMaterialService } from 'src/app/services/text-material.service';

@Component({
  selector: 'app-email-pdf',
  templateUrl: './email-pdf.component.html',
  styleUrls: ['./email-pdf.component.css']
})
export class EmailPdfComponent implements OnInit {
  textMaterialId: number;
  paramsForm: UntypedFormGroup;

  constructor(private dialogRef: MatDialogRef<EmailPdfComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private textMaterialService: TextMaterialService,
    private fb: UntypedFormBuilder,
    private notifier: NotifierService) {}

  ngOnInit(): void {
    this.textMaterialId = this.data.textMaterialId;

    this.createParamsForm();
  }

  createParamsForm(){
    this.paramsForm = this.fb.group({
      title: [false],
      category: [false],
      author: [false],
      datePublished: [false]
    })
  };

  sendTextMaterialAsPdf(){
    const emailParams = this.paramsForm.value;

    this.textMaterialService.sendTextMaterialAsPdf(this.textMaterialId,emailParams).subscribe(tm => {
      this.dialogRef.close();
      this.notifier.showNotification("Pdf file has been sent to your email","OK","SUCCESS")
    }, err => {
      console.log(err);
      this.dialogRef.close();
      this.notifier.showNotification("Something went wrong","OK","ERROR");
    })
  }
}
