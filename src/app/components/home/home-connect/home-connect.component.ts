import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { RoundStatus } from '../../../enums/round-status.enum';

@Component({
  selector: 'app-home-connect',
  imports: [CommonModule, FormsModule],
  templateUrl: './home-connect.component.html'
})
export class HomeConnectComponent {
  @Input() hospitals: Hospital[] | null = []; 
  @Input() connectButtonLabel!: string;
  @Input() currentStatus!: string;

  @Output() onConnect = new EventEmitter<void>();
  @Output() onGetStatus = new EventEmitter<void>();
  @Output() onUpdateStatus = new EventEmitter<RoundStatus>();
  @Output() onInitializeRound = new EventEmitter<void>();

  selectedStatus: RoundStatus = RoundStatus.NONE;

  statusOptions = Object.keys(RoundStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ label: key, value: RoundStatus[key as keyof typeof RoundStatus] }));

  get areFiveHospitalsPresent(): boolean {
    return !!this.hospitals?.length && this.hospitals?.length > 5;
  }

  onConnectButtonClick(): void {
    this.onConnect.emit();
  }

  onGetStatusButtonClick(): void {
    this.onGetStatus.emit();
  }

  onUpdateStatusButtonClick(): void {
    this.onUpdateStatus.emit(this.selectedStatus);
  }

  onInitializeRoundButtonClick(): void {
    this.onInitializeRound.emit();
  }
}
