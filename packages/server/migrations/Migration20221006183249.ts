import { Migration } from '@mikro-orm/migrations';

export class Migration20221006183249 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table `user` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `email` text not null, `password` text not null);',
		);
		this.addSql('create unique index `user_email_unique` on `user` (`email`);');

		this.addSql(
			'create table `token` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `refresh_token` text not null, `user_id` integer not null, constraint `token_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade);',
		);
		this.addSql('create index `token_user_id_index` on `token` (`user_id`);');
	}
}
