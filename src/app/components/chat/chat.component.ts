import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from '../../models/message';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatMessages$: Observable<IMessage[]>;
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // get messages on component init
    this.chatMessages$ = this.chatService.getMessages();
  }

  /**
   * @author Ahsan Ayaz
   * Handler for a new message creation. Pushes the new message to the message list
   * @param message {IMessage}
   */
  newMessageSent(message: IMessage) {
    this.chatService.addMessage(message).subscribe(() => {
      console.log('Message added');
    });
  }

  deleteMessage(message: IMessage) {
    this.chatService.removeMessage(message).subscribe(() => {
      console.log('Message removed');
    });
  }
}
