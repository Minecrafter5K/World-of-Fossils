import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextFieldType } from 'src/app/models/text-field-type';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() name?: string;
  // @Input() type?: TextFieldType;
  @Output() outputEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  change(value: string) {
    this.outputEvent.emit(value);
  }
}
