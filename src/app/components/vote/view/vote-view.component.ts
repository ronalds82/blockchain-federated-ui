import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { VoteValue } from '../../../enums/vote-value.enum';
import { Role } from '../../../enums/role.enum';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-vote-view',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './vote-view.component.html'
})
export class VoteViewComponent {
  readonly VoteValue = VoteValue;

  @Input() hospitals: Hospital[] | null = [];
  @Input() hospital: Hospital | null = null;
  @Input() voteInProgress: boolean = false;

  @Output() onVote = new EventEmitter<VoteValue>();

  get isVoteButtonEnabled(): boolean {
    return this.hospital?.role === Role.MINER && !this.hasHospitalVoted(this.hospital);
  }

  totalVotes(): number {
    let totalVotes = 0;

    this.hospitals?.forEach(hospital => {
      if (this.hasHospitalVoted(hospital)) {
        totalVotes++;
      }
    });

    return totalVotes;
  }

  hasHospitalVoted(hospital: Hospital | null): boolean {
    return hospital?.vote !== VoteValue.NULL;
  }

  onVoteButtonClick(vote: VoteValue): void {
    this.onVote.emit(vote);
  }
}
