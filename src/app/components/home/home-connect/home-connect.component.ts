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
  readonly statusName: string[] = [
    'None',
    'Waiting for participants',
    'Start training',
    'Training completed'
  ];

  @Input() hospitals: Hospital[] | null = []; 
  @Input() currentStatus!: RoundStatus | null;

  @Output() onGetStatus = new EventEmitter<void>();
  @Output() onUpdateStatus = new EventEmitter<RoundStatus>();
  @Output() onInitializeRound = new EventEmitter<void>();
  @Output() onStartTraining = new EventEmitter<void>();

  selectedStatus: RoundStatus = RoundStatus.NONE;

  statusOptions = Object.keys(RoundStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ 
      label: this.statusName[RoundStatus[key as keyof typeof RoundStatus]], 
      value: RoundStatus[key as keyof typeof RoundStatus] 
    }));

  get isStartTrainingButtonEnabled(): boolean {
    return !!this.hospitals?.length && this.hospitals?.length >= 5 && this.currentStatus === RoundStatus.WAITING_FOR_PARTICPANTS;
  }

  get isRoundStatusNone(): boolean {
    return this.currentStatus === RoundStatus.NONE;
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

  onStartTrainingButtonClick(): void {
    this.onStartTraining.emit();
  }
}
