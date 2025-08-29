import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { ChatRoom } from './chat-room.entity';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

@Entity('user_chat_rooms')
@Unique(['userId', 'chatRoomId'])
@Index(['userId'])
@Index(['chatRoomId'])
export class UserChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'chat_room_id' })
  chatRoomId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ name: 'is_muted', default: false })
  isMuted: boolean;

  @Column({ name: 'muted_until', type: 'timestamp', nullable: true })
  mutedUntil: Date;

  @Column({ name: 'last_read_at', type: 'timestamp', nullable: true })
  lastReadAt: Date;

  @Column({ name: 'notification_enabled', default: true })
  notificationEnabled: boolean;

  @Column({ name: 'joined_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @Column({ name: 'left_at', type: 'timestamp', nullable: true })
  leftAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.chatRooms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.members)
  @JoinColumn({ name: 'chat_room_id' })
  chatRoom: ChatRoom;

  // Methods
  hasPermission(requiredRole: UserRole): boolean {
    const roleHierarchy = {
      [UserRole.MEMBER]: 0,
      [UserRole.MODERATOR]: 1,
      [UserRole.ADMIN]: 2,
      [UserRole.OWNER]: 3,
    };

    return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
  }

  mute(duration?: number): void {
    this.isMuted = true;
    if (duration) {
      this.mutedUntil = new Date(Date.now() + duration * 1000);
    }
  }

  unmute(): void {
    this.isMuted = false;
    this.mutedUntil = null;
  }

  leave(): void {
    this.isActive = false;
    this.leftAt = new Date();
  }

  updateLastRead(): void {
    this.lastReadAt = new Date();
  }
}