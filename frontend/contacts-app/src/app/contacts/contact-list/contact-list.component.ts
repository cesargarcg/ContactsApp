import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  standalone: false,
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  newContact: Contact = { name: '', email: '', phone: '' };
  selectedContact: Contact | null = null;
  @ViewChild('createForm') createForm: any;
  isLoading = true;
  errorMsg: string = '';

  constructor(private contactService: ContactService) {}

  //Se cargan los contactos al iniciar el componente
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.contacts = [];
        this.errorMsg = 'No se pudieron cargar los contactos. Intenta más tarde.';
      }
    });
  }

  //Se abre el modal para crear un nuevo contacto
  openCreateModal(): void {
    this.newContact = { name: '', email: '', phone: '' };
    const modal = new bootstrap.Modal(document.getElementById('createModal')!);
    modal.show();
  }

  createContact(): void {
    this.errorMsg = '';
    this.contactService.createContact(this.newContact).subscribe({
      next: () => {
        this.loadContacts();
        const modal = bootstrap.Modal.getInstance(document.getElementById('createModal')!);
        if (modal) {
          modal.hide();
        }
        if (this.createForm) {
          this.createForm.resetForm();
        }
      },
      error: (error) => {
        if (error.status === 400 && error.error?.errors) {
          this.errorMsg = error.error.errors.map((e: any) => e.msg).join(' ');
        } else {
          this.errorMsg = 'No se pudo crear el contacto. Intenta más tarde.';
        }
      }
    });
  }

  //Se abre el modal para ver los detalles de un contacto
  openViewModal(id: string): void {
    this.contactService.getContactById(id).subscribe((contact) => {
      this.selectedContact = contact;
      const modal = new bootstrap.Modal(document.getElementById('viewModal')!);
      modal.show();
    });
  }

  deleteContact(id: string): void {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts();
      });
    }
  }
}