import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  contractFrom: FormGroup;

  result = {
    contractVersion: ContractVersion.NotSpecial,
    addPatch: AddPatch.Need,
    cooperate: Cooperate.NoMarkup,
    planName: PlanName.Dash
  }

  ui = {
    showResult: false
  }

  get HonorType() { return HonorType; }
  get ActivityType() { return ActivityType; }

  constructor(
    private fb: FormBuilder
  ) {
    this.contractFrom = this.fb.group({
      honor: [HonorType.Honor],
      activityType: [ActivityType.NoMarkup]
    }),
      this.contractFrom.valueChanges.subscribe(() => {
        this.ui.showResult = false;
      })
  }

  onHonorSelect() {
    if (this.contractFrom.value.honor === HonorType.Honor) {
      this.contractFrom.patchValue({
        activityType: ActivityType.NoMarkup
      })
    }
  }

  search() {
    this.ui.showResult = true;
    const value: {
      honor: HonorType,
      activityType: ActivityType
    } = this.contractFrom.value;

    console.error(this.contractFrom.value)
    console.error(value)
    this.result.contractVersion = (value.activityType === ActivityType.LH2 || value.activityType === ActivityType.TaipeiUE) ?
      ContractVersion.Special : ContractVersion.NotSpecial;
    this.result.addPatch = value.honor === HonorType.Honor ? AddPatch.Need : AddPatch.NoNeed;
    switch (value.activityType) {
      case ActivityType.NoMarkup:
        this.result.cooperate = Cooperate.NoMarkup;
        this.result.planName = PlanName.Dash;
        break;
      case ActivityType.MarkUpDeal:
        this.result.cooperate = Cooperate.MarkupDeal
        this.result.planName = PlanName.Example;
        break;
      case ActivityType.MarkUp:
        this.result.cooperate = Cooperate.None;
        this.result.planName = PlanName.None;
        break;
      case ActivityType.LH2:
        this.result.cooperate = Cooperate.Project;
        this.result.planName = PlanName.LH2;
        break;
      case ActivityType.NoMarkUpDeal:
        this.result.cooperate = Cooperate.All;
        this.result.planName = PlanName.ToBeConfirmed;
        break;
      case ActivityType.TaipeiUE:
        this.result.cooperate = Cooperate.Project;
        this.result.planName = PlanName.TaipeiOp;
        break;
    }
  }

}

enum HonorType {
  Honor = '0',
  NotHonor = '1'
}

enum ActivityType {
  /** 店內價 */
  NoMarkup = '0',
  /** 抬價 + Deal */
  MarkUpDeal = '1',
  /** 抬價 */
  MarkUp = '2',
  LH2 = '3',
  TaipeiUE = '4',
  /** 店內價 & 抬價 + deal */
  NoMarkUpDeal = '5'
}

enum ContractVersion {
  NotSpecial = '_OD_202110',
  Special = '特殊_OD_202110'
}

enum AddPatch {
  Need = '打勾+填%數',
  NoNeed = '不打勾 + %數欄位打X',
}

enum Cooperate {
  NoMarkup = '勾店內價',
  MarkupDeal = '勾抬價+Deal',
  None = '整張不用填',
  All = '都勾',
  LH2 = '城市 + LH2',
  Project = '勾專案'
}

enum PlanName {
  Dash = '-',
  Example = '例：Deal 滿 250 折 40',
  None = '整張不用填',
  ToBeConfirmed = '待確認',
  LH2 = '城市 + LH2',
  TaipeiOp = '台北OP專案',
}
