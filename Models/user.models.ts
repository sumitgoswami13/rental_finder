import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
  } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  userName!: string | null;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true, default: null })
  email!: string | null;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNo!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  isProfileAllowed!: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  lastLogin!: Date | null;
}

export default User;
