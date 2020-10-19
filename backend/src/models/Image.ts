import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn }  from 'typeorm';
import Orphanages from './Orphanage';

import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanages, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage;
}