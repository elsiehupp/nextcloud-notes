

// Make sure bigInteger values are numbers and not strings
//
// https://github.com/brianc/node-pg-types
//
// In our case, all bigInteger are timestamps, which JavaScript can handle
// fine as numbers.
require('pg').types.setTypeParser(20, function(val: any) {
	return parseInt(val, 10);
});

export type Uuid = string;

export enum ItemType {
    File = 1,
    User,
}

export enum ChangeType {
	Create = 1,
	Update = 2,
	Delete = 3,
}

export enum ShareType {
	Link = 1, // When a note is shared via a public link
	App = 2, // When a note is shared with another user on the same server instance
}

export interface WithDates {
	updated_time?: number;
	created_time?: number;
}

export interface WithUuid {
	id?: string;
}

// AUTO-GENERATED-TYPES
// Auto-generated using `npm run generate-types`
export interface User extends WithDates, WithUuid {
	email?: string;
	password?: string;
	full_name?: string;
	is_admin?: number;
}

export interface Session extends WithDates, WithUuid {
	user_id?: Uuid;
	auth_code?: string;
}

export interface Permission extends WithDates, WithUuid {
	user_id?: Uuid;
	item_type?: ItemType;
	item_id?: Uuid;
	can_read?: number;
	can_write?: number;
}

export interface File extends WithDates, WithUuid {
	owner_id?: Uuid;
	name?: string;
	content?: Buffer;
	mime_type?: string;
	size?: number;
	is_directory?: number;
	is_root?: number;
	parent_id?: Uuid;
}

export interface Change extends WithDates, WithUuid {
	counter?: number;
	owner_id?: Uuid;
	item_type?: ItemType;
	parent_id?: Uuid;
	item_id?: Uuid;
	item_name?: string;
	type?: ChangeType;
}

export interface ApiClient extends WithDates, WithUuid {
	name?: string;
	secret?: string;
}

export interface Share extends WithDates, WithUuid {
	owner_id?: Uuid;
	file_id?: Uuid;
	type?: ShareType;
}

export const databaseSchema/*: DatabaseTables*/ = {
	users: {
		id: { type: 'string' },
		email: { type: 'string' },
		password: { type: 'string' },
		full_name: { type: 'string' },
		is_admin: { type: 'number' },
		updated_time: { type: 'string' },
		created_time: { type: 'string' },
	},
	sessions: {
		id: { type: 'string' },
		user_id: { type: 'string' },
		auth_code: { type: 'string' },
		updated_time: { type: 'string' },
		created_time: { type: 'string' },
	},
	permissions: {
		id: { type: 'string' },
		user_id: { type: 'string' },
		item_type: { type: 'number' },
		item_id: { type: 'string' },
		can_read: { type: 'number' },
		can_write: { type: 'number' },
		updated_time: { type: 'string' },
		created_time: { type: 'string' },
	},
	files: {
		id: { type: 'string' },
		owner_id: { type: 'string' },
		name: { type: 'string' },
		content: { type: 'any' },
		mime_type: { type: 'string' },
		size: { type: 'number' },
		is_directory: { type: 'number' },
		is_root: { type: 'number' },
		parent_id: { type: 'string' },
		updated_time: { type: 'string' },
		created_time: { type: 'string' },
	},
	changes: {
		counter: { type: 'number' },
		id: { type: 'string' },
		owner_id: { type: 'string' },
		item_type: { type: 'number' },
		parent_id: { type: 'string' },
		item_id: { type: 'string' },
		item_name: { type: 'string' },
		type: { type: 'number' },
		updated_time: { type: 'string' },
		created_time: { type: 'string' },
	},
};
