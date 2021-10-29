import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

export class Friend {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public department: string,
    public email: string,
    public country: string
  ) {
  }
}

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friends: Friend[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  countries: string[];

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getFriends();
    this.countries = ['Nigeria', 'USA', 'Hungary', 'Ghana', 'Canada', 'India'];
    this.editForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      department: [''],
      email: [''],
      country: ['']
    });
  }

  getFriends(){
    this.httpClient.get<any>('http://localhost:9001/friends').subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value);
    const url = 'http://localhost:9001/friends/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
  }

  openDetails(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('fname').setAttribute('value', friend.firstname);
    document.getElementById('lname').setAttribute('value', friend.lastname);
    document.getElementById('dept').setAttribute('value', friend.department);
    document.getElementById('email2').setAttribute('value', friend.email);
    document.getElementById('cntry').setAttribute('value', friend.country);
  }

  openEdit(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: friend.id,
      firstname: friend.firstname,
      lastname: friend.lastname,
      department: friend.department,
      email: friend.email,
      country: friend.country
    });
   }


  onSave() {
    const editURL = 'http://localhost:9001/friends/' + this.editForm.value.id + '/edit';
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, friend: Friend) {
    this.deleteId = friend.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:9001/friends/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
