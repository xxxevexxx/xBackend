import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "rank", type: "int", default: 1})
    rank: number;

    @Column({name: "limit", type: "int", default: 1})
    limit: number;

    @Column({name: "login", type: "varchar"})
    login: string;

    @Column({name: "password", type: "varchar"})
    password: string;

    @Column({name: "balance", type: "int", default: 0})
    balance: number;

    @Column({name: "nickname", type: "varchar", default: "NickName"})
    nickname: string;

    @Column({name: "first_name", type: "varchar", default: "First"})
    firstName: string;

    @Column({name: "last_name", type: "varchar", default: "Last"})
    lastName: string;

    @Column({name: "avatar", type: "varchar", default: "https://i.imgur.com/RlbzGWj.png"})
    avatar: string;

    @Column({name: "telegram", type: "int", default: 0})
    telegram: number;

    @Column({name: "vkontakte", type: "int", default: 0})
    vkontakte: number;

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date;
}
