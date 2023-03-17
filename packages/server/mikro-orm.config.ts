import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { User, BaseEntity, Token } from './entities';

const options: Options = {
	type: 'sqlite',
	entities: [User, BaseEntity, Token],
	dbName: 'test.db',
	highlighter: new SqlHighlighter(),
	debug: true,
	migrations: {
		path: 'dist/migrations',
		pathTs: 'migrations',
	},
};

export default options;
