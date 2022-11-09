import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
    bSubject = new BehaviorSubject({});
    url: any;
    httpOptions: any;
    constructor(private http : HttpClient) {
    //  this.url  = 'http://nehasshahi-001-site1.htempurl.com/'; //local server
        this.url = 'http://nber.niepvdlib.co.in/';
        // this.url = 'http://103.224.23.58/';
        // this.httpOptions = {
        //     headers: new HttpHeaders({ 
        //       'Access-Control-Allow-Origin':'*',
        //       'Authorization':'authkey',
        //       'userid':'1'
        //     })
        // };
    }

  
    loginUser(userForm: any, userRoleId: number){
        const header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'POST'
          }
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(header), 
          };
        const data = {username: userForm.value.name, password: userForm.value.password, userRoleId: userRoleId}
        return this.http.post(this.url+"users/login", data, requestOptions ).pipe(map((response: any) => {
            return response;
        }));
    }

    getLoginData() {
        return JSON.parse(localStorage.getItem('loginStatus') || '{}');
    }

    candidateRegistrationForm(candidateRegForm: any) {
        const data = {
            FirstName: candidateRegForm.value.name, 
            RCI_application: candidateRegForm.value.rciApplication,
            CentreCode: candidateRegForm.value.centerCode,
            StateCode: candidateRegForm.value.stateCode,
            Annual_year: candidateRegForm.value.enrolmentYear,
            CourseFor: candidateRegForm.value.courseName
        }
        return this.http.post(this.url+"candidate/register-candidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    coordinatorRegistrationForm(candidateRegForm: any) {
        const data = {
            FirstName: candidateRegForm.value.name, 
            Password: candidateRegForm.value.password,
            CentreCode: candidateRegForm.value.centerCode,
            StateCode: candidateRegForm.value.stateCode,
            UserRoleId: candidateRegForm.value.role,
            Email: candidateRegForm.value.email,
            UserName: candidateRegForm.value.userName,
            ContactNumber: candidateRegForm.value.contactNumber
        }
        return this.http.post(this.url+"users/create-user", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCandidateList(data: {}) {
        return this.http.post(this.url+"candidate/listCandidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCoordinatorList(data: {}) {
        return this.http.post(this.url+"users/listAdmins", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCandidateDetails(data: {}) {
        return this.http.post(this.url+"candidate/listCandidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getSelectedCoordinatorDetails(id: number) {
        return this.http.get(this.url+"users/getAdmin/"+id).pipe(map((response: any)=> {
            return response;
        }))
    }

    getSelectedCandidateDetails(id: number) {
        return this.http.get(this.url+"candidate/getCandidate/"+id).pipe(map((response: any)=> {
            return response;
        }))
    }

    updateCoordinatorRegistration(coordinatorRegistrationForm: any, id: number) {
        const data = {
            StateCode: coordinatorRegistrationForm.value.stateCode,
            CentreCode: coordinatorRegistrationForm.value.centerCode,
            Name: coordinatorRegistrationForm.value.name, 
            Email: coordinatorRegistrationForm.value.email,
            UserName: coordinatorRegistrationForm.value.userName,
            UserId: id,
            UserRoleId: 2,
            ContactNumber: coordinatorRegistrationForm.value.contactNumber
        }
        return this.http.post(this.url+"users/update-user", data).pipe(map((response: any) => {
            return response;
        }));
    }

    updateCandidateRegistration(candidateRegistrationForm: any, id: number) {
        const data = {
            EnrollmentNo: candidateRegistrationForm.value.enrollmentNumber,
            Annual_Year: candidateRegistrationForm.value.enrollmentYear,
            FirstName: candidateRegistrationForm.value.name, 
            Dob: candidateRegistrationForm.value.dob,
            FatherName: candidateRegistrationForm.value.fatherName, 
            MotherName: candidateRegistrationForm.value.motherName,
            Gender: candidateRegistrationForm.value.gender,
            Caste: candidateRegistrationForm.value.casteCat,
            Disability: candidateRegistrationForm.value.disabilityInput === ' ' ? candidateRegistrationForm.value.disability : candidateRegistrationForm.value.disabilityInput, 
            Mobile: candidateRegistrationForm.value.mobileNo,
            Email: candidateRegistrationForm.value.emailId,
            RCI_application: candidateRegistrationForm.value.rciApplication, 
            AdharNumber: candidateRegistrationForm.value.adharCardNo,
            CandidateId: id,
            Address: candidateRegistrationForm.value.address,
            Photo: candidateRegistrationForm.value.photo,
            Signature: candidateRegistrationForm.value.signature
        }
        return this.http.post(this.url+"candidate/update-registration", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getAllCourses() {
        return this.http.get(this.url+"users/getCourses").pipe(map((response: any)=> {
            return response;
        }))
    }

    updateImage(imgSrc: any, id: number) {
        const data = {
            CandidateId: id,
            Photo: imgSrc
        }
        return this.http.post(this.url+"candidate/update-registration", data).pipe(map((response: any) => {
            return response;
        }));
    }

    deleteRecord(id: any, deleteSource: string) {
        if(deleteSource) {
            return this.http.delete(this.url+"users/deleteAdmin/"+id).pipe(map((response: any) => {
                return response;
            }));
        } else {
            return this.http.delete(this.url+"candidate/deleteCandidate/"+id).pipe(map((response: any) => {
                return response;
            }));
        }
    }

    openErrorDialog(message: any) {
        Swal.fire({
            title: message,
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    }

    openSuccessDialog(message: any) {
        Swal.fire({
            title: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    openDeleteDialog() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result: any) => {
            if(result.value) {
                this.bSubject.next(result)
            }
          })
    }

    openSaveDialog() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
          }).then((result: any) => {
              if(result.value) {
                this.bSubject.next(result)
            }
          })
    }

    getStateCode() {
        return this.http.get(this.url+"users/getCentreStates").pipe(map((response: any) => {
            return response;
        }));
    }

    getCenterCode(stateCode: any) {
        return this.http.get(this.url+"users/getCentreCodeById/"+stateCode).pipe(map((response: any) => {
            return response;
        }));
    }

    centerForm(centerForm: any) {
        const data = {
            CenterName: centerForm.value.centerName,
            StateCode: centerForm.value.stateCode,
            CenterState: centerForm.value.centerState, 
            CenterCode: centerForm.value.centerCode,
            CentreAddress: centerForm.value.cAddress,
            CourseId: centerForm.value.centerBranch
        }
        return this.http.post(this.url+"centre/add-centre", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCenterList(centerData: any) {
        return this.http.post(this.url+"centre/listCentres", centerData).pipe(map((response: any) => {
            return response;
        }));
    }

    getSelectedCenterDetails(id: any) {
        return this.http.get(this.url+"centre/getCentre/"+id).pipe(map((response: any)=> {
            return response;
        }))
    }

    getCandidateById(id: any) {
        return this.http.get(this.url+"candidate/getCandidateByCenter/"+id).pipe(map((response: any)=> {
            return response;
        }))
    }

    getExaminationpaperByCourse(data: any) {
        return this.http.get(this.url+"examination/getExaminationpaperByCourse/"+data.course+"/"+data.academicSession+"/"+data.year+"/"+data.theoryPractical+"/"+data.centerId).pipe(map((response: any)=> {
            return response;
        }))
    }

    saveCandidateMarks(data: any) {
        return this.http.post(this.url+"examination/saveExaminationMarksByPaper", data).pipe(map((response: any) => {
            return response;
        }));
    }

    saveExaminationCenterForm(formData: any) {
        const data = {
            CentreId: formData.value.center,
            ExaminationCenter: formData.value.examCenter,
        }
        return this.http.post(this.url+"centre/add-examinationcentre", data).pipe(map((response: any) => {
            return response;
        }));
    }

    updateCenterForm(centerForm: any, id: any) {
        console.log(centerForm)
        const data = {
            CenterName: centerForm.value.centerName,
            StateCode: centerForm.value.stateCode,
            CenterState: centerForm.value.centerState, 
            CenterCode: centerForm.value.centerCode,
            CentreAddress: centerForm.value.cAddress,
            CentreId: id
        }
        return this.http.post(this.url+"centre/add-centre", data).pipe(map((response: any) => {
            return response;
        }));
    }

    deleteCenterRecord(id: any) {
        const data = {
            CentreId: id,
            IsDeleted: true
        }
        return this.http.post(this.url+"centre/add-centre", data).pipe(map((response: any) => {
            return response;
        }));
    }

    examinationForm(res: any, canidateId: any, cooridnator: boolean) {
        let data;
        if(!cooridnator) {
            data = {
                AcademicYearId: res.value.academicYear,
                IsReappear: res.value.status,
                PaperId: 'all',
                IsSubmitted: 1,
                YearOf: res.value.year,
                CandidateId: canidateId
            }
        } else {
            data = {
                ExaminationFormId: canidateId,
                IsVerified: true,  
            }
        }
        return this.http.post(this.url+"examination/saveExaminationForm", data).pipe(map((response: any) => {
            return response;
        }));
    }

    verifyCandidateDetails(id: any) {
        const data = {
            CandidateId: id,
            IsVerified: true
        }
        return this.http.post(this.url+"candidate/update-verification", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getCourseList(type: any) {
        const course = type ? 'theory' : 'practical';
        return this.http.get(this.url+"examination/getExaminationPaper/"+course+"/first year").pipe(map((response: any)=> {
            return response;
        }))
    }

    getExaminationCandidateList(data: any) {
        return this.http.post(this.url+"examination/listExaminationCandidate", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getAdmitCardByIdDetails(id: any) {
        return this.http.get(this.url+"examination/getAdmitCardById/"+id).pipe(map((response: any) => {
            return response;
        }));
    }

    addTimesheet(formData: any) {
        const data = {
            PaperName: formData.value.paperId ,
            DateTime: formData.value.dateTime,
            Timings: formData.value.timing,
            CourseId: formData.value.course
        }
        return this.http.post(this.url+"examination/add-datelist", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getTimesheetList(val: any) {
        return this.http.get(this.url+"examination/getDatesheet/"+val).pipe(map((response: any) => {
            return response;
        }));       
    }

    deleteTimesheetRecord(id: any) {
        const data = {
            DateListId: id,
            IsDeleted: true
        }
        return this.http.post(this.url+"examination/add-datelist", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getVerificationList(data: any) {
        return this.http.post(this.url+"examination/verificationByCenter", data).pipe(map((response: any) => {
            return response;
        }));
    }

    getExaminationFormDetails(id: any) {
        return this.http.get(this.url+"examination/getExaminationFormById/"+id).pipe(map((response: any)=> {
            return response;
        }))
    }

}