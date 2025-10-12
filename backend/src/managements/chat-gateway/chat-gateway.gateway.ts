import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatGatewayService } from './chat-gateway.service';
import { Server,Socket } from 'socket.io'

@WebSocketGateway(3002, {
  // cors: {
  //   origin: process.env.FRONTEND_URL,
  //   methods:['GET','POST']
  // }
})
export class ChatGatewayGateway implements OnGatewayConnection,OnGatewayDisconnect {
@WebSocketServer()
  server:Server  
    
  constructor(private readonly chatGatewayService: ChatGatewayService) { }
  

  handleConnection(client: Socket, ...args: any[]) {
      console.log("ayzooooooo")
      this.server.emit('user-joined','Co 1 ng moi vao')
  }

  handleDisconnect(client: any) {
      console.log('Someone disconected')
  }


  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() data: string,
                   @ConnectedSocket() client:Socket):void {
    console.log(data)
    this.server.emit('reply',data)
  }

  


}
