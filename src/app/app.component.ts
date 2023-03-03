import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pipe Delimited File Reader';
  fileToUpload: File | null = null;
  fileContent = Array<any>();
  fileColumns: string[] = [];
  showLoader = true;

  constructor() {}

  ngOnInit(): void {}

  handleFileInput(event: Event) {
    this.showLoader = false;
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = [];
      this.fileColumns = [];
      this.readDataFromFile(fileReader.result as string);
    }
    fileReader.readAsText(this.fileToUpload);
  }

  readDataFromFile(fileresult: string)
  {
    let rows = fileresult.split(/\r?\n/);
    this.fileColumns = rows.shift()?.split("|") as string[];

    rows?.forEach((row) =>{
      if(row!="")
      {
        var jsonObj: { [key: string]: any } = {};
        this.fileColumns?.forEach((column, coli) =>
        {
          jsonObj[column] = row.split("|")[coli];
        });
        this.fileContent.push(jsonObj);
      }
    })
    this.showLoader = true;
  }

  logdata(){
    console.log(this.fileContent);
  }
}
