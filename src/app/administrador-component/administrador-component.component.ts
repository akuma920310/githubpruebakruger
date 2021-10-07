import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Empleyeemodel } from './administrador-dashboard.model';

@Component({
  selector: 'app-administrador-component',
  templateUrl: './administrador-component.component.html',
  styleUrls: ['./administrador-component.component.css']
})
export class AdministradorComponentComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : Empleyeemodel = new Empleyeemodel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      cedula : [''],
      firsName : [''],
      lastName : [''],
      email : [''],
      user : [''],
      pass : [''],
      tipo : [''],
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.cedula = this.formValue.value.cedula;
    this.employeeModelObj.firsName = this.formValue.value.firsName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.user = this.formValue.value.user;
    this.employeeModelObj.pass = this.formValue.value.pass;
    this.employeeModelObj.tipo = this.formValue.value.tipo;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Se ha agreado el emplado con exito");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Ocurrio un error al agregar el empleado");
    })
  }

  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert('Empleado eliminado');
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id
    this.formValue.controls['cedula'].setValue(row.cedula)
    this.formValue.controls['firsName'].setValue(row.firsName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['user'].setValue(row.user)
    this.formValue.controls['pass'].setValue(row.pass)
    this.formValue.controls['tipo'].setValue(row.tipo)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.cedula = this.formValue.value.cedula;
    this.employeeModelObj.firsName = this.formValue.value.firsName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.user = this.formValue.value.user;
    this.employeeModelObj.pass = this.formValue.value.pass;
    this.employeeModelObj.tipo = this.formValue.value.tipo;

    this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert('Informacion editada');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
