import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Validate from '../../../assets/common/validate';

interface Categories {
  category_id: number,
  category_name: string
}

interface Contact {
  name: string,
  company_name: string,
  email: string,
  phone: string,
  category_id: number,
  message: string
}

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, HttpClientModule, CommonModule],
  providers: [ApiService],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.less'
})
export class RegisterUserComponent {
  send = faPaperPlane;
  categories: Categories[] = []
  message = ''
  errors = {
    name: '',
    company_name: '',
    email: '',
    phone: '',
    category_id: '',
    message: ''
  }

  constructor(private apiService: ApiService) { }

  onSubmit(form: NgForm) {
    let validateCount = 0
    let isCategory = 0
    const validateDTO = form.value as Contact


    //Validate category
    this.apiService.getCategories(validateDTO.category_id)
      .subscribe(res => {
        if ((res as Categories).category_id == validateDTO.category_id) isCategory = 1
        this.errors = {
          name: Validate.validateString(validateDTO.name, 100) ? '' : 'El nombre contiene caracteres especiales o no esta en el intervalo entre 1 - 100 caracteres',
          company_name: Validate.validateString(validateDTO.company_name, 150) ? '' : 'La empresa contiene caracteres especiales o no esta en el intervalo entre 1 - 100 caracteres',
          email: Validate.validateEmail(validateDTO.email) ? '' : 'El correo no tiene un formato valido (xxxx@domain.xxx)',
          phone: Validate.validatePhone(validateDTO.phone) ? '' : 'El telefono no tiene un formato valido (Ej: +3112345678)',
          category_id: isCategory === 1 ? '' : 'La categoria ingresada no existe',
          message: validateDTO.message.length <= 200 && validateDTO.message.length > 20 ? '' : 'El mensaje debe tener entre 20 y 200 caracteres'
        }

        Object.values(this.errors).forEach(value => {
          if (value.length === 0) validateCount++;
        })

        if (validateCount == Object.keys(validateDTO).length)
          this.apiService.submitContact(form.value).subscribe((res: any) => {
            this.message = res.message
            form.resetForm()
          });
      })
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe((res) => { this.categories = res as Categories[] })
  }
}
