import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { VoteValue } from '../../../enums/vote-value.enum';
import { Role } from '../../../enums/role.enum';

@Component({
  selector: 'app-vote-view',
  imports: [CommonModule],
  templateUrl: './vote-view.component.html'
})
export class VoteViewComponent {
  readonly VoteValue = VoteValue;

  @Input() hospitals: Hospital[] | null = [];
  @Input() hospital: Hospital | null = null;

  @Output() onVote = new EventEmitter<VoteValue>();

  get isVoteButtonEnabled(): boolean {
    console.log(this.hospital);
    return this.hospital?.role === Role.Miner && !this.hasHospitalVoted(this.hospital);
  }

  totalVotes(): number {
    let totalVotes = 0;

    this.hospitals?.forEach(hospital => {
      if(this.hasHospitalVoted(hospital)) {
        totalVotes++;
      }
    });

    return totalVotes;
  }

  hasHospitalVoted(hospital: Hospital | null): boolean {
    return !!hospital?.hasVoted;
  }

  onVoteButtonClick(vote: VoteValue): void {
    this.onVote.emit(vote);
  }
}
