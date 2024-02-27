import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.scss',
})
export class LoginTemplateComponent {}
