```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm-indexed';
@Entity()
export class App {
  @PrimaryGeneratedColumn()
  appId: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  keyword: string;

  @Column()
  pages: any;
}
```

使用

```ts
import Manager, { createConnection, select } from 'typeorm-indexed';

import Tables from './entity';
createConnection({
  name: 'design',
  version: 2,
  entities: [...Tables],
}).subscribe();

Manager.ready().subscribe(res => {
  if (res) {
    select('Handler')
      .save({ name: 'test', body: 'body2' })
      .subscribe();
  }
});
```
