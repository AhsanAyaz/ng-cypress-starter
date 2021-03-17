import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { IMessage } from 'src/app/models/message';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit, OnChanges {
  @ViewChild('messagesList') private messagesList: ElementRef;
  @Input('messages') public messages: IMessage[];
  @Output() messageDeleted = new EventEmitter<IMessage>();
  constructor(private router: Router) {}

  ngOnInit() {
    this.scrollToBottom(); // scroll to bottom on component init
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.messages || changes.messages.isFirstChange()) {
      return;
    }
    if (!(changes.messages.previousValue && changes.messages.currentValue)) {
      return;
    }
    if (
      changes.messages.previousValue.length ===
      changes.messages.currentValue.length
    ) {
      return;
    }
    this.scrollToBottom(); // whenever the change detection happens. I.e. messages are changed.
  }

  goToMessage(message: IMessage) {
    this.router.navigate([`/message/${message.id}`]);
  }

  removeMessage(message: IMessage, $event) {
    if ($event) {
      $event.stopImmediatePropagation();
    }
    this.messageDeleted.emit(message);
  }

  /**
   * @author Ahsan Ayaz
   * Scrolls to bottom
   */
  scrollToBottom() {
    try {
      setTimeout(() => {
        this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
      console.log(err);
    }
  }
}
