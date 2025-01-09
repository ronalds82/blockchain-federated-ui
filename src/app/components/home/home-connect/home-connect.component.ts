import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { RoundStatus } from '../../../enums/round-status.enum';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-home-connect',
  imports: [CommonModule, FormsModule, SpinnerComponent],
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
  @Input() actionInProgress: boolean = false;

  @Output() onGetStatus = new EventEmitter<void>();
  @Output() onUpdateStatus = new EventEmitter<RoundStatus>();
  @Output() onInitializeRound = new EventEmitter<void>();
  @Output() onStartTraining = new EventEmitter<string[]>();

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
    this.onStartTraining.emit(this.allAddresses);
  }

  private get allAddresses(): string[] {
    return this.hospitals?.map(hospital => hospital.hospitalWalletAddress) || [];
  }
}
