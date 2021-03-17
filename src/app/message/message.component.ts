import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../core/services/chat.service';
import { IMessage } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message$: Observable<IMessage> = null;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const messageId = this.route.snapshot.paramMap.get('id');
    this.message$ = this.chatService.getMessageById(Number(messageId));
  }

  removeMessage(message: IMessage, $event) {
    if ($event) {
      $event.stopImmediatePropagation();
    }
    this.chatService.removeMessage(message).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
