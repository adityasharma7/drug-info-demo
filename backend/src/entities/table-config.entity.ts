import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('table_config')
export class TableConfig {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  tableName: string;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  columnKey: string;

  @Column({ type: 'varchar', length: 200 })
  label: string;

  @Column({ type: 'boolean', default: true })
  visible: boolean;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 50 })
  dataType: string;
}

