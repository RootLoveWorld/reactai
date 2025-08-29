import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { ChatRoom } from './chat-room.entity';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

@Entity('messages')
@Index(['chatRoomId', 'createdAt'])
@Index(['userId'])
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type: MessageType;

  @Column({ name: 'chat_room_id' })
  chatRoomId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'reply_to_id', nullable: true })
  replyToId: string;

  @Column({ name: 'is_edited', default: false })
  isEdited: boolean;

  @Column({ name: 'edited_at', type: 'timestamp', nullable: true })
  editedAt: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  @JoinColumn({ name: 'chat_room_id' })
  chatRoom: ChatRoom;

  @ManyToOne(() => Message, { nullable: true })
  @JoinColumn({ name: 'reply_to_id' })
  replyTo: Message;

  // Methods
  markAsEdited(): void {
    this.isEdited = true;
    this.editedAt = new Date();
  }

  markAsDeleted(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.content = '[This message was deleted]';
  }

  toJSON() {
    if (this.isDeleted) {
      return {
        id: this.id,
        content: '[This message was deleted]',
        type: this.type,
        chatRoomId: this.chatRoomId,
        userId: this.userId,
        isDeleted: this.isDeleted,
        deletedAt: this.deletedAt,
        createdAt: this.createdAt,
      };
    }
    return this;
  }
}
