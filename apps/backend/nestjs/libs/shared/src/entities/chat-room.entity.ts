import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';
import { UserChatRoom } from './user-chat-room.entity';

@Entity('chat_rooms')
@Index(['name'])
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_private', default: false })
  isPrivate: boolean;

  @Column({ name: 'max_members', default: 100 })
  maxMembers: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'created_by_id' })
  createdById: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.createdRooms)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];

  @OneToMany(() => UserChatRoom, (userChatRoom) => userChatRoom.chatRoom)
  members: UserChatRoom[];

  // Virtual properties
  get memberCount(): number {
    return this.members ? this.members.length : 0;
  }

  get lastMessage(): Message | null {
    if (!this.messages || this.messages.length === 0) return null;
    return this.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  }
}