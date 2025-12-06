import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonCardTitle,
  IonList,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonAlert,
    IonButton,
    IonInput,
    IonList,
    IonCardTitle,
    IonItem,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule, //to use ngModel
  ],
})
export class HomePage implements AfterViewInit {
  http = inject(HttpClient); //
  api = 'http://localhost/backend/index.php'; //link kung nasaan yung rest api mo
  list: any = []; //container of data fetched from rest api
  
  name: any;
  email: any;

  message: any; //for ion alert
  isOpen: boolean = false; //for ionalert
  isDisabled:boolean = true; 
  editingId:any;
  constructor() {}

  getData() {
    this.http.get(this.api).subscribe(res=>{
      this.list = res;
    })
  }

  postData() {
    const data = {
      name: this.name,
      email: this.email,
    }; //OBJECT

    this.http.post(this.api, data).subscribe((fetchedData) => {
      this.getData(); //list refresh
      this.message = fetchedData; //message in ion-alert
      this.isOpen = true; // ion-alert
    });
  }

  // alert lang to 
  close() {
    this.isOpen = false;
    this.name = '';
    this.email = '';
  }

  deleteData(id: any) {
    const data = {
      id: id,
    };

    this.http
      .delete(this.api, {
        body: data,
      })
      .subscribe((res) => {
        this.getData();
        this.message = res;
        this.isOpen = true;
      });
  }

  putData() {
    if (!this.editingId) return; 
    const data = { id: this.editingId, name: this.name, email: this.email };
    this.http.put(this.api, data).subscribe((res) => {
      this.getData();
      this.message = res;
      this.isOpen = true;
      this.name = "";
      this.email = "";
      this.isDisabled = true; 
      this.editingId = null;
    });
  }

  editData(item: any) {
    this.name = item.name;
    this.email = item.email;
    this.editingId = item.id;
    this.isDisabled = false;
  }

  ngAfterViewInit(): void {
    this.getData();
  }
}
