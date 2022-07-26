import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

    url;
    constructor(private http : HttpClient) {
      this.url  = 'http://nehasshahi-001-site1.htempurl.com/';
    }

  
    loginUser(userForm: any){
        const data = {username: userForm.value.name, password: userForm.value.password}
        return this.http.post(this.url+"users/login", data).pipe(map((response: any) => {
            return response;
        }));
    }

    candidateRegistrationForm(candidateRegForm: any) {
        const data = {
            FirstName: candidateRegForm.value.name, 
            Dob: candidateRegForm.value.dob,
            EnrollmentNo: candidateRegForm.value.enrolmentNumber,
            Annual_year: candidateRegForm.value.enrolmentYear,
        }
        return this.http.post(this.url+"candidate/register-candidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCandidateList(data: {}) {
        return this.http.post(this.url+"candidate/listCandidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCandidateDetails(data: {}) {
        return this.http.post(this.url+"candidate/listCandidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    updateCandidateRegistration(candidateRegistrationForm: any) {
        console.log(candidateRegistrationForm)
        const data = {
            EnrollmentNo: candidateRegistrationForm.value.enrollmentNumber,
            Annual_Year: candidateRegistrationForm.value.enrollmentYear,
            FirstName: candidateRegistrationForm.value.name, 
            Dob: candidateRegistrationForm.value.dob,
            FatherName: candidateRegistrationForm.value.fatherName, 
            MotherName: candidateRegistrationForm.value.motherName,
            Gender: candidateRegistrationForm.value.gender,
            Caste: candidateRegistrationForm.value.casteCat,
            Disability: candidateRegistrationForm.value.disability, 
            Mobile: candidateRegistrationForm.value.mobileNo,
            Email: candidateRegistrationForm.value.emailId,
            Photo: candidateRegistrationForm.value.photo,
            RCI_application: candidateRegistrationForm.value.rciApplication, 
            AdharNumber: candidateRegistrationForm.value.adharCardNo,
            CandidateId: 1,
            Address: candidateRegistrationForm.value.address
        }
        return this.http.post(this.url+"candidate/update-registration", data).pipe(map((response: any) => {
            return response;
        }));
    }

    openErrorDialog(message: any) {
        Swal.fire({
            title: message,
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    }

    // changepasswordSubmit(userForm, linkCode) {
    //     var userForm = userForm.value;
    //     var abc = [{
    //         "newPassword": userForm.password,
    //         "link": linkCode
    //     }];
    //     return this.http.post(this.url+"users/changePassword", abc).pipe(map((response: any) => {
    //         return response;
    //     }));
    // }
}