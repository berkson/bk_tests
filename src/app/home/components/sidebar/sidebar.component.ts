import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { User } from '../../../shared';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatProgressSpinner,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input('user') user: User;
  private _panelOpenState: boolean = true;
  private _opened: boolean = false;
  isDownloading: boolean;

  constructor() {
    this.user = new User().full(
      1,
      'TT01162',
      'Berkson',
      'berksonx@yahoo.com.br'
    );
    this.isDownloading = false;
  }

  isAdmin(): boolean {
    return true;
  }

  public get panelOpenState(): boolean {
    return this._panelOpenState;
  }

  public set panelOpenState(value: boolean) {
    this._panelOpenState = value;
  }

  public set opened(value: boolean) {
    this._opened = value;
  }
}
